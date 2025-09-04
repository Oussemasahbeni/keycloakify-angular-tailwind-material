import { DOCUMENT, effect, inject, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'theme-preference';
  private readonly document = inject(DOCUMENT);

  // Signal for current theme
  theme = signal<Theme>(this.getInitialTheme());

  // Signal for actual applied theme (resolves 'system' to 'light'/'dark')
  appliedTheme = signal<'light' | 'dark'>('light');

  constructor() {
    // Effect to apply theme changes
    effect(() => {
      this.applyTheme(this.theme());
    });

    // Listen for system theme changes
    if (this.isClient()) {
      this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (this.theme() === 'system') {
          this.applyTheme('system');
        }
      });
    }
  }

  private isClient(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  private getInitialTheme(): Theme {
    if (!this.isClient()) return 'system';

    try {
      const stored = localStorage.getItem(this.storageKey) as Theme;
      return stored || 'system';
    } catch {
      return 'system';
    }
  }

  private applyTheme(theme: Theme): void {
    if (!this.isClient()) return;

    const actualTheme = this.resolveTheme(theme);

    // Always apply to document root (html element) for universal compatibility
    this.document.documentElement.classList.remove('light', 'dark');
    this.document.documentElement.classList.add(actualTheme);

    // Also set a CSS custom property for additional flexibility
    this.document.documentElement.style.setProperty('--theme', actualTheme);

    this.appliedTheme.set(actualTheme);

    try {
      localStorage.setItem(this.storageKey, theme);
    } catch {
      // Ignore storage errors
    }
  }

  private resolveTheme(theme: Theme): 'light' | 'dark' {
    if (theme === 'system') {
      try {
        const mediaQuery = this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)');
        return mediaQuery?.matches ? 'dark' : 'light';
      } catch {
        return 'light';
      }
    }
    return theme;
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  toggleTheme(): void {
    const current = this.appliedTheme();
    this.setTheme(current === 'light' ? 'dark' : 'light');
  }
}
