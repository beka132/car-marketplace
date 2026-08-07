export type InputType = 'text' | 'email' | 'password' | 'search' | 'tel' | 'textarea' | 'select';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputRadius = 'none' | 'sm' | 'md' | 'lg' | 'pill';
export type InputIconPosition = 'left' | 'right';
export type InputVariant = 'default' | 'ghost';

export interface SelectOption {
  label: string;
  value: string;
}
