export interface ITextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;

  name?: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;

  error?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;

  autoComplete?: string;

  onBlur?: () => void;
}
