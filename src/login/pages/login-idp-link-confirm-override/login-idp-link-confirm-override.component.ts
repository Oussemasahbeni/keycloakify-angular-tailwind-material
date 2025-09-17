import { ChangeDetectionStrategy, Component, forwardRef, inject, type TemplateRef, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ComponentReference } from '@keycloakify/angular/login/classes/component-reference';
import { KcClassDirective } from '@keycloakify/angular/login/directives/kc-class';
import { LOGIN_I18N } from '@keycloakify/angular/login/tokens/i18n';
import { KC_LOGIN_CONTEXT } from '@keycloakify/angular/login/tokens/kc-context';
import type { I18n } from '../../i18n';
import type { KcContext } from '../../KcContext';

@Component({
  imports: [KcClassDirective, MatButtonModule],
  selector: 'kc-login-idp-link-confirm-override',
  templateUrl: 'login-idp-link-confirm-override.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => LoginIdpLinkConfirmOverrideComponent),
    },
  ],
})
export class LoginIdpLinkConfirmOverrideComponent extends ComponentReference {
  kcContext = inject<Extract<KcContext, { pageId: 'login-idp-link-confirm-override.ftl' }>>(KC_LOGIN_CONTEXT);
  i18n = inject<I18n>(LOGIN_I18N);

  documentTitle: string | undefined;
  bodyClassName: string | undefined;

  displayRequiredFields = false;
  displayInfo = false;
  displayMessage = !this.kcContext.messagesPerField.existsError('totp', 'userLabel');

  headerNode = viewChild<TemplateRef<HTMLElement>>('headerNode');
  infoNode = viewChild<TemplateRef<HTMLElement>>('infoNode');
  socialProvidersNode = viewChild<TemplateRef<HTMLElement>>('socialProvidersNode');
}
