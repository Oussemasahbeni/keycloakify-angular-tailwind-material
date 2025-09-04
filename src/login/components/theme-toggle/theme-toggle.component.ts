import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Theme, ThemeService } from './theme.service';

@Component({
  selector: 'kc-theme-toggle',
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
  template: `
    <button
      matIconButton
      [matMenuTriggerFor]="themeMenu"
      [attr.aria-label]="'Toggle theme'"
    >
      @switch (themeService.appliedTheme()) {
        @case ('light') {
          <mat-icon>light_mode</mat-icon>
        }
        @case ('dark') {
          <mat-icon>dark_mode</mat-icon>
        }
      }
    </button>

    <mat-menu #themeMenu="matMenu">
      <button
        mat-menu-item
        (click)="setTheme('light')"
        [class.active]="themeService.theme() === 'light'"
      >
        <mat-icon>light_mode</mat-icon>
        <span>Light</span>
      </button>
      <button
        mat-menu-item
        (click)="setTheme('dark')"
        [class.active]="themeService.theme() === 'dark'"
      >
        <mat-icon>dark_mode</mat-icon>
        <span>Dark</span>
      </button>
      <button
        mat-menu-item
        (click)="setTheme('system')"
        [class.active]="themeService.theme() === 'system'"
      >
        <mat-icon>settings_suggest</mat-icon>
        <span>System</span>
      </button>
    </mat-menu>
  `,
  styles: [
    `
      .active {
        background-color: var(--mat-menu-item-hover-state-layer-color);
      }
    `,
  ],
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);

  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }
}
