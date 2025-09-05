import { DOCUMENT, effect, inject, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'theme-preference';
  private readonly document = inject(DOCUMENT);

  theme = signal<Theme>(this.getInitialTheme());

  appliedTheme = signal<'light' | 'dark'>('light');

  constructor() {
    effect(() => {
      this.applyTheme(this.theme());
    });

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

    this.document.documentElement.classList.remove('light', 'dark');
    this.document.documentElement.classList.add(actualTheme);

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
