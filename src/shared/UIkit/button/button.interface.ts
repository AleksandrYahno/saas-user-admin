import { ReactNode } from 'react';

export interface IButtonProps {
  children: ReactNode;

  type?: 'button' | 'submit';
  disabled?: boolean;

  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;

  onClick?: () => void;
}
