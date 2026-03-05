import { FC, ReactElement } from 'react';

import { IButtonProps } from '@shared/UIkit/button/button.interface';

import './Button.css';

const Button: FC<IButtonProps> = (props): ReactElement => {
  const {
    children,
    type = 'button',
    disabled = false,
    variant = 'primary',
    fullWidth = false,
    onClick,
  } = props;

  const className = [
    'ui-button',
    `ui-button--${variant}`,
    fullWidth ? 'ui-button--full-width' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };
