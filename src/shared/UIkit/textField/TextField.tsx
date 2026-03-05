import { ChangeEvent, FC, ReactElement } from 'react';

import { ITextFieldProps } from '@shared/UIkit/textField/textField.interface';

import './TextField.css';

const TextField: FC<ITextFieldProps> = (props): ReactElement => {
  const {
    label,
    value,
    onChange,
    name,
    type = 'text',
    placeholder,
    error,
    required = false,
    disabled = false,
    fullWidth = true,
    autoComplete,
    onBlur,
  } = props;

  const inputId = name ?? `textfield-${label.replace(/\s/g, '-').toLowerCase()}`;

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.value);
  };

  const rootClassName = [
    'ui-textfield',
    fullWidth ? 'ui-textfield--full-width' : '',
    error ? 'ui-textfield--error' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClassName}>
      <label
        htmlFor={inputId}
        className="ui-textfield__label"
      >
        {label}
      </label>

      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        className="ui-textfield__input"
        onChange={handleChange}
        onBlur={onBlur}
      />

      <p className="ui-textfield__error">
        {error ?? ''}
      </p>
    </div>
  );
};

export { TextField };
