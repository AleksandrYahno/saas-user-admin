import { FC, ReactElement } from 'react';

export interface IExampleButtonProps {
  label: string;
  disabled?: boolean;
}

const ExampleButton: FC<IExampleButtonProps> = (props): ReactElement => {
  const {
    label,
    disabled = false,
  } = props;

  return (
    <button
      type="button"
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export { ExampleButton };

