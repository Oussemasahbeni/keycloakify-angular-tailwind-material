/// <reference types="vitest" />

import angular from '@analogjs/vite-plugin-angular';
import { angularEsbuildPlugin } from '@keycloakify/angular-email/esbuild';
import { buildEmailTheme } from 'keycloakify-emails';
import { keycloakify } from 'keycloakify/vite-plugin';
import { join } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2022'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    angular(),
    keycloakify({
      accountThemeImplementation: 'none',
      themeName: 'planingo-theme',

      postBuild: async (buildContext) => {
        await buildEmailTheme({
          templatesSrcDirPath: join(import.meta.dirname, '/emails/templates'),
          filterTemplate: (filePath: string) => !filePath.endsWith('.html'),
          themeNames: buildContext.themeNames,
          keycloakifyBuildDirPath: buildContext.keycloakifyBuildDirPath,
          // i18nSourceFile: import.meta.dirname + '/emails/i18n.ts',
          locales: ['en', 'fr', 'ar'],
          cwd: import.meta.dirname,
          esbuild: {
            packages: 'bundle',
            external: ['juice', 'postcss', 'tailwindcss', '@tailwindcss/postcss'],
            format: 'esm',
            outExtension: { '.js': '.mjs' },
            plugins: [angularEsbuildPlugin(join(import.meta.dirname, '/emails'))],
          },
        });
      },
    }),
  ],
}));
