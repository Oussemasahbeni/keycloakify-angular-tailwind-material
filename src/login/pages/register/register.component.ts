import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
  type TemplateRef,
  Type,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { KcSanitizePipe } from '@keycloakify/angular/lib/pipes/kc-sanitize';
import { USE_DEFAULT_CSS } from '@keycloakify/angular/lib/tokens/use-default-css';
import { ComponentReference } from '@keycloakify/angular/login/classes/component-reference';
import { KcClassDirective } from '@keycloakify/angular/login/directives/kc-class';
import { UserProfileFormService } from '@keycloakify/angular/login/services/user-profile-form';
import { LOGIN_CLASSES } from '@keycloakify/angular/login/tokens/classes';
import { LOGIN_I18N } from '@keycloakify/angular/login/tokens/i18n';
import { KC_LOGIN_CONTEXT } from '@keycloakify/angular/login/tokens/kc-context';
import type { ClassKey } from 'keycloakify/login/lib/kcClsx';
import { map } from 'rxjs';
import { UserProfileFormFieldsComponent } from '../../components/register/user-profile-form-fields/user-profile-form-fields.component';
import type { I18n } from '../../i18n';
import type { KcContext } from '../../KcContext';

@Component({
  selector: 'kc-register',
  templateUrl: 'register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KcClassDirective, KcSanitizePipe, NgComponentOutlet, MatButtonModule, MatIconModule, MatCheckboxModule],
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => RegisterComponent),
    },
  ],
})
export class RegisterComponent extends ComponentReference implements OnInit, OnDestroy {
  #userProfileFormService = inject(UserProfileFormService);
  kcContext = inject<Extract<KcContext, { pageId: 'register.ftl' }>>(KC_LOGIN_CONTEXT);
  i18n = inject<I18n>(LOGIN_I18N);

  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(LOGIN_CLASSES);

  documentTitle: string | undefined;
  bodyClassName: string | undefined;

  displayRequiredFields = true;
  displayInfo = false;
  displayMessage = !this.kcContext?.messagesPerField?.existsError('global');

  headerNode = viewChild<TemplateRef<HTMLElement>>('headerNode');
  infoNode = viewChild<TemplateRef<HTMLElement>>('infoNode');
  socialProvidersNode = viewChild<TemplateRef<HTMLElement>>('socialProvidersNode');

  isFormSubmittable = toSignal(this.#userProfileFormService.formState$.pipe(map((s) => s.isFormSubmittable)), {
    initialValue: false,
  });
  areTermsAccepted = signal(false);
  userProfileFormFields = input<Type<UserProfileFormFieldsComponent>>();

  ngOnInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)['onSubmitRecaptcha'] = () => {
      // @ts-expect-error
      document.getElementById('kc-register-form').requestSubmit();
    };
  }
  ngOnDestroy(): void {
    // eslint-disable-next-line
    delete (window as any)['onSubmitRecaptcha'];
  }
}
