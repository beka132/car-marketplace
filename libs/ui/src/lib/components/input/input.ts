import {
  Component,
  input,
  output,
  model,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  InputType,
  InputSize,
  InputRadius,
  InputIconPosition,
  SelectOption,
} from './types/input.types';

@Component({
  selector: 'cm-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Input {
  public type = input<InputType>('text');
  public placeholder = input<string>('');
  public label = input<string | null>(null);
  public inputId = input<string | null>(null);
  public size = input<InputSize>('md');
  public radius = input<InputRadius>('md');
  public icon = input<string | null>(null);
  public iconPosition = input<InputIconPosition>('left');
  public chevronIcon = input<string>('assets/icons/chevron-down.svg');
  public disabled = input<boolean>(false);
  public options = input<SelectOption[]>([]);
  public rows = input<number>(4);

  public value = model<string>('');

  protected wrapperClass = computed(() =>
    [
      'cm-input',
      `cm-input--${this.size()}`,
      `cm-input--radius-${this.radius()}`,
      `cm-input--${this.type()}`,
      this.icon() ? 'cm-input--with-icon' : '',
      this.icon() ? `cm-input--icon-${this.iconPosition()}` : '',
      this.disabled() ? 'cm-input--disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected fieldClass = computed(() =>
    [
      'cm-input__field',
      `cm-input__field--${this.size()}`,
      `cm-input__field--radius-${this.radius()}`,
    ].join(' '),
  );

  protected iconClass = computed(() =>
    [
      'cm-input__icon',
      `cm-input__icon--${this.iconPosition()}`,
      `cm-input__icon--${this.size()}`,
    ].join(' '),
  );

  public onInput(event: Event): void {
    const val = (event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value;
    this.value.set(val);
  }
}
