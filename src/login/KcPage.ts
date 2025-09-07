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
