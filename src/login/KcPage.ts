import { getDefaultPageComponent, type KcPage } from '@keycloakify/angular/login';
import type { ClassKey } from 'keycloakify/login';
import { UserProfileFormFieldsComponent } from './components/register/user-profile-form-fields/user-profile-form-fields.component';
import type { KcContext } from './KcContext';
import { TemplateComponent } from './template/template.component';

import './styles/index.scss';

export const classes = {} satisfies Partial<Record<ClassKey, string>>;
export const doUseDefaultCss = false;
export const doMakeUserConfirmPassword = true;

export async function getKcPage(pageId: KcContext['pageId']): Promise<KcPage> {
  switch (pageId) {
    case 'login.ftl':
      return {
        PageComponent: (await import('./pages/login/login.component')).LoginComponent,
        TemplateComponent,
        UserProfileFormFieldsComponent,
        doMakeUserConfirmPassword,
        doUseDefaultCss,
        classes,
      };
    case 'login-username.ftl':
      return {
        PageComponent: (await import('./pages/login-username/login-username.component')).LoginUsernameComponent,
        TemplateComponent,
        UserProfileFormFieldsComponent,
        doMakeUserConfirmPassword,
        doUseDefaultCss,
        classes,
      };
    case 'login-password.ftl':
      return {
        PageComponent: (await import('./pages/login-password/login-password.component')).LoginPasswordComponent,
        TemplateComponent,
        UserProfileFormFieldsComponent,
        doMakeUserConfirmPassword,
        doUseDefaultCss,
        classes,
      };
    case 'webauthn-authenticate.ftl':
      return {
        PageComponent: (await import('./pages/webauthn-authenticate/webauthn-authenticate.component'))
          .WebauthnAuthenticateComponent,
        TemplateComponent,
        UserProfileFormFieldsComponent,
        doMakeUserConfirmPassword,
        doUseDefaultCss,
        classes,
      };
    case 'webauthn-register.ftl':
      return {
        PageComponent: (await import('./pages/webauthn-register/webauthn-register.component'))
          .WebauthnRegisterComponent,
        TemplateComponent,
        UserProfileFormFieldsComponent,
        doMakeUserConfirmPassword,
        doUseDefaultCss,
        classes,
      };

    case 'info.ftl':
      return {
        PageComponent: (await import('./pages/info/info.component')).InfoComponent,
        TemplateComponent,
        UserProfileFormFieldsComponent,
        doMakeUserConfirmPassword,
        doUseDefaultCss,
        classes,
      };
    case 'error.ftl':
      return {
        PageComponent: (await import('./pages/error/error.component')).ErrorComponent,
        TemplateComponent,
        UserProfileFormFieldsComponent,
        doMakeUserConfirmPassword,
        doUseDefaultCss,
        classes,
      };
    case 'login-reset-password.ftl':
      return {
        PageComponent: (await import('./pages/login-reset-password/login-reset-password.component'))
          .LoginResetPasswordComponent,
        TemplateComponent,
        UserProfileFormFieldsComponent,
        doMakeUserConfirmPassword,
        doUseDefaultCss,
        classes,
      };
    case 'login-verify-email.ftl':
      return {
        PageComponent: (await import('./pages/login-verify-email/login-verify-email.component'))
          .LoginVerifyEmailComponent,
        TemplateComponent,
        UserProfileFormFieldsComponent,
        doMakeUserConfirmPassword,
        doUseDefaultCss,
        classes,
      };
    case 'terms.ftl':
      return {
        PageComponent: (await import('./pages/terms/terms.component')).TermsComponent,
        TemplateComponent,
        UserProfileFormFieldsComponent,
        doMakeUserConfirmPassword,
        doUseDefaultCss,
        classes,
      };
    case 'login-oauth2-device-verify-user-code.ftl':
      return {
        PageComponent: (
          await import('./pages/login-oauth2-device-verify-user-code/login-oauth2-device-verify-user-code.component')
        ).LoginOauth2DeviceVerifyUserCodeComponent,
        TemplateComponent,
        UserProfileFormFieldsComponent,
        doMakeUserConfirmPassword,
        doUseDefaultCss,
        classes,
      };
    case 'register.ftl':
      return {
        PageComponent: (await import('./pages/register/register.component')).RegisterComponent,
        TemplateComponent,
        UserProfileFormFieldsComponent,
        doMakeUserConfirmPassword,
        doUseDefaultCss,
        classes,
      };
    default:
      return {
        PageComponent: await getDefaultPageComponent(pageId),
        TemplateComponent,
        UserProfileFormFieldsComponent,
        doMakeUserConfirmPassword,
        doUseDefaultCss,
        classes,
      };
  }
}
