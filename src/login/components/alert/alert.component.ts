import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FuseAlertAppearance, FuseAlertType } from './alert.types';

@Component({
  selector: 'kc-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'fuseAlert',
  imports: [MatIconModule, MatButtonModule],
})
export class AlertComponent {
  readonly appearance = input<FuseAlertAppearance>('soft');
  readonly showIcon = input<boolean>(true);
  readonly type = input<FuseAlertType>('primary');
  readonly dismissedChanged = output<boolean>();

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Host binding for component classes
   */
  @HostBinding('class') get classList(): unknown {
    return {
      'fuse-alert-appearance-border': this.appearance() === 'border',
      'fuse-alert-appearance-fill': this.appearance() === 'fill',
      'fuse-alert-appearance-outline': this.appearance() === 'outline',
      'fuse-alert-appearance-soft': this.appearance() === 'soft',
      'fuse-alert-show-icon': this.showIcon(),
      'fuse-alert-type-primary': this.type() === 'primary',
      'fuse-alert-type-accent': this.type() === 'accent',
      'fuse-alert-type-warn': this.type() === 'warn',
      'fuse-alert-type-basic': this.type() === 'basic',
      'fuse-alert-type-info': this.type() === 'info',
      'fuse-alert-type-success': this.type() === 'success',
      'fuse-alert-type-warning': this.type() === 'warning',
      'fuse-alert-type-error': this.type() === 'error',
    };
  }
}
