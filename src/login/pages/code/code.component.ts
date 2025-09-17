import { ChangeDetectionStrategy, Component, forwardRef, inject, type TemplateRef, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KcSanitizePipe } from '@keycloakify/angular/lib/pipes/kc-sanitize';
import { USE_DEFAULT_CSS } from '@keycloakify/angular/lib/tokens/use-default-css';
import { ComponentReference } from '@keycloakify/angular/login/classes/component-reference';
import { LOGIN_CLASSES } from '@keycloakify/angular/login/tokens/classes';
import { LOGIN_I18N } from '@keycloakify/angular/login/tokens/i18n';
import { KC_LOGIN_CONTEXT } from '@keycloakify/angular/login/tokens/kc-context';
import type { ClassKey } from 'keycloakify/login/lib/kcClsx';
import { AlertComponent } from '../../components/alert/alert.component';
import type { I18n } from '../../i18n';
import type { KcContext } from '../../KcContext';

@Component({
  imports: [KcSanitizePipe, AlertComponent, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule],
  selector: 'kc-code',
  templateUrl: 'code.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => CodeComponent),
    },
  ],
})
export class CodeComponent extends ComponentReference {
  kcContext = inject<Extract<KcContext, { pageId: 'code.ftl' }>>(KC_LOGIN_CONTEXT);
  i18n = inject<I18n>(LOGIN_I18N);

  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(LOGIN_CLASSES);

  private _snackBar = inject(MatSnackBar);

  documentTitle: string | undefined;
  bodyClassName: string | undefined;

  displayRequiredFields = false;
  displayInfo = false;
  displayMessage = false;

  headerNode = viewChild<TemplateRef<HTMLElement>>('headerNode');
  infoNode = viewChild<TemplateRef<HTMLElement>>('infoNode');
  socialProvidersNode = viewChild<TemplateRef<HTMLElement>>('socialProvidersNode');

  copyToClipboard(text: string) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        this._snackBar.open(this.i18n.msgStr('codeCopyToClipboardSuccess'), this.i18n.msgStr('close'), {
          duration: 3000,
          horizontalPosition: this.i18n.currentLanguage.languageTag === 'ar' ? 'end' : 'start',
        });
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  }
}
