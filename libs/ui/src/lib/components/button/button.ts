import {
  Component,
  input,
  output,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ButtonSize, IconPosition, ButtonVariant, ButtonRadius, ButtonGap } from './types/button.types';

@Component({
  selector: 'cm-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  public label = input.required<string>();
  public size = input<ButtonSize>('md');
  public variant = input<ButtonVariant>('primary');
  public radius = input<ButtonRadius>('md');
  public icon = input<string | null>(null);
  public iconPosition = input<IconPosition>('left');
  public iconGap = input<ButtonGap>('md');
  public disabled = input<boolean>(false);
  public fullWidth = input<boolean>(false);

  public clicked = output<void>();

  protected btnClass = computed(() =>
    [
      'cm-btn',
      `cm-btn--${this.size()}`,
      `cm-btn--${this.variant()}`,
      `cm-btn--radius-${this.radius()}`,
      this.fullWidth() ? 'cm-btn--full' : '',
      this.disabled() ? 'cm-btn--disabled' : '',
      this.icon() ? 'cm-btn--with-icon' : '',
      this.icon() ? `cm-btn--icon-${this.iconPosition()}` : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected innerClass = computed(() =>
    [
      'cm-btn__inner',
      `cm-btn__inner--gap-${this.iconGap()}`,
      this.icon() ? `cm-btn__inner--icon-${this.iconPosition()}` : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected iconClass = computed(() =>
    [
      'cm-btn__icon',
      `cm-btn__icon--${this.iconPosition()}`,
      `cm-btn__icon--${this.size()}`,
    ].join(' '),
  );

  public onClick(): void {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }
}
