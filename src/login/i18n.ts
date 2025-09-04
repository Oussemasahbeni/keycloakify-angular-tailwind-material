/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from '@keycloakify/angular/login';
import type { ThemeName } from '../kc.gen';

/** @see: https://docs.keycloakify.dev/features/i18n */
const { getI18n, ofTypeI18n } = i18nBuilder
  .withThemeName<ThemeName>()
  .withCustomTranslations({
    fr: {
      noAccount: "Vous n'avez pas de compte?",
      doRegister: "S'inscrire",
      loginAccountSubtitle: 'Entrez votre email et mot de passe pour vous connecter !',
      welcomeMessage: 'Bienvenue sur Planingo Votre passerelle vers une planification et une organisation sans faille.',
    },
    en: {
      noAccount: "Don't have an account?",
      doRegister: 'Sign Up',
      loginAccountSubtitle: 'Enter your email and password to sign in!',
      welcomeMessage: 'Welcome to Planingo - Your gateway to seamless planning and organization.',
    },
    ar: {
      noAccount: 'ليس لديك حساب؟',
      doRegister: 'سجل',
      loginAccountSubtitle: 'أدخل بريدك الإلكتروني وكلمة المرور لتسجيل الدخول!',
      welcomeMessage: 'مرحبًا بك في Planingo - بوابتك إلى التخطيط والتنظيم السلس.',
    },
  })
  .build();

type I18n = typeof ofTypeI18n;

export { getI18n, type I18n };
