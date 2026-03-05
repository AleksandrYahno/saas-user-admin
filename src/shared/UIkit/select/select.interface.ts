export interface ISelectOption {
  value: string;
  label: string;
}

export interface ISelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: ISelectOption[];

  name?: string;
  placeholder?: string;

  error?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;

  onBlur?: () => void;
}
