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
      registerAccountSubtitle: 'Créez votre compte en remplissant le formulaire ci-dessous !',
      backToLogin: 'Vous avez déjà un compte ?',
      welcomeMessage: 'Bienvenue sur Planingo Votre passerelle vers une planification et une organisation sans faille.',
      dark: 'Sombre',
      light: 'Lumière',
      system: 'Système',
      codeCopyToClipboardSuccess: 'Code copié dans le presse-papiers',
      close: 'Fermer',
      codeLabel: 'Code de vérification',
      loggingOut: 'Déconnexion...',
      loggedOut: 'Déconnecté',
      copyToClipboard: 'Copier dans le presse-papiers',
    },
    en: {
      noAccount: "Don't have an account?",
      doRegister: 'Sign Up',
      loginAccountSubtitle: 'Enter your email and password to sign in!',
      registerAccountSubtitle: 'Create your account by filling out the form below!',
      backToLogin: 'Already have an account?',
      welcomeMessage: 'Welcome to Planingo - Your gateway to seamless planning and organization.',
      dark: 'Dark',
      light: 'Light',
      system: 'System',
      codeCopyToClipboardSuccess: 'Code copied to clipboard',
      close: 'Close',
      codeLabel: 'Verification Code',
      loggingOut: 'Logging out...',
      loggedOut: 'Logged out',
      copyToClipboard: 'Copy to clipboard',
    },
    ar: {
      noAccount: 'ليس لديك حساب؟',
      doRegister: 'سجل',
      loginAccountSubtitle: 'أدخل بريدك الإلكتروني وكلمة المرور لتسجيل الدخول!',
      registerAccountSubtitle: 'قم بإنشاء حسابك عن طريق ملء النموذج أدناه!',
      backToLogin: 'هل لديك حساب بالفعل؟',
      welcomeMessage: 'مرحبًا بك في Planingo - بوابتك إلى التخطيط والتنظيم السلس.',
      dark: 'داكن',
      light: 'فاتح',
      system: 'النظام',
      codeCopyToClipboardSuccess: 'تم نسخ الرمز إلى الحافظة',
      close: 'إغلاق',
      codeLabel: 'رمز التحقق',
      loggingOut: 'جاري تسجيل الخروج...',
      loggedOut: 'تم تسجيل الخروج',
      copyToClipboard: 'نسخ إلى الحافظة',
    },
  })
  .build();

type I18n = typeof ofTypeI18n;

export { getI18n, type I18n };
