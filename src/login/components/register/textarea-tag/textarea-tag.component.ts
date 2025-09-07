import { ChangeDetectionStrategy, Component, forwardRef, inject, input, output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToNumberPipe } from '@keycloakify/angular/lib/pipes/to-number';
import { USE_DEFAULT_CSS } from '@keycloakify/angular/lib/tokens/use-default-css';
import { ComponentReference } from '@keycloakify/angular/login/classes/component-reference';
import { KcClassDirective } from '@keycloakify/angular/login/directives/kc-class';
import { type FormAction, type FormFieldError } from '@keycloakify/angular/login/services/user-profile-form';
import { LOGIN_CLASSES } from '@keycloakify/angular/login/tokens/classes';
import { LOGIN_I18N } from '@keycloakify/angular/login/tokens/i18n';
import { I18n } from 'keycloakify/login/i18n';
import { type Attribute } from 'keycloakify/login/KcContext';
import type { ClassKey } from 'keycloakify/login/lib/kcClsx';

@Component({
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  imports: [KcClassDirective, ToNumberPipe, MatFormFieldModule, MatInputModule],
  selector: 'kc-textarea-tag',
  templateUrl: 'textarea-tag.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => TextareaTagComponent),
    },
  ],
})
export class TextareaTagComponent extends ComponentReference {
  attribute = input<Attribute>();
  i18n = inject<I18n>(LOGIN_I18N);

  value = input<string>();
  displayableErrors = input<FormFieldError[]>();
  dispatchFormAction = output<FormAction>();
  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(LOGIN_CLASSES);

  onChange(event: Event) {
    this.dispatchFormAction.emit({
      action: 'update',
      name: this.attribute()?.name ?? '',
      valueOrValues: (event.target as HTMLTextAreaElement).value,
    });
  }

  onBlur() {
    this.dispatchFormAction.emit({
      action: 'focus lost',
      name: this.attribute()?.name ?? '',
      fieldIndex: undefined,
    });
  }
}
