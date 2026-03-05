import { ChangeEvent, FC, ReactElement } from 'react';

import { ISelectProps } from '@shared/UIkit/select/select.interface';

import './Select.css';

const Select: FC<ISelectProps> = (props): ReactElement => {
  const {
    label,
    value,
    onChange,
    options,
    name,
    placeholder,
    error,
    required = false,
    disabled = false,
    fullWidth = true,
    onBlur,
  } = props;

  const selectId = name ?? `select-${label.replace(/\s/g, '-').toLowerCase()}`;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    onChange(event.target.value);
  };

  const rootClassName = [
    'ui-select',
    fullWidth ? 'ui-select--full-width' : '',
    error ? 'ui-select--error' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClassName}>
      <label
        htmlFor={selectId}
        className="ui-select__label"
      >
        {label}
      </label>

      <select
        id={selectId}
        name={name}
        value={value}
        required={required}
        disabled={disabled}
        className="ui-select__select"
        onChange={handleChange}
        onBlur={onBlur}
      >
        {placeholder !== undefined && (
          <option value="">
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      <p className="ui-select__error">
        {error ?? ''}
      </p>
    </div>
  );
};

export { Select };
