import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AlertAppearance, AlertType } from './alert.types';

@Component({
  selector: 'kc-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.alert-appearance-border]': "appearance() === 'border'",
    '[class.alert-appearance-outline]': "appearance() === 'outline'",
    '[class.alert-show-icon]': 'showIcon()',
    '[class.alert-type-info]': "type() === 'info'",
    '[class.alert-type-success]': "type() === 'success'",
    '[class.alert-type-warning]': "type() === 'warning'",
    '[class.alert-type-error]': "type() === 'error'",
  },
  imports: [MatIconModule, MatButtonModule],
})
export class AlertComponent {
  readonly appearance = input<AlertAppearance>('outline');
  readonly showIcon = input<boolean>(true);
  readonly type = input<AlertType>('info');
}
