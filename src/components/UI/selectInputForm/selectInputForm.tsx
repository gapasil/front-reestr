import React, { FC, memo } from 'react';
import styles from './selectInput.module.scss';

interface SelectInputProps {
  label: string | undefined;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  disabledOptions?: string[]; // Array of options that should be disabled
  error?: string;
}

const SelectInput: FC<SelectInputProps> = memo(
  ({
    label,
    value,
    onChange,
    options,
    disabledOptions = [], // Default to an empty array if not provided
    error,
  }) => (
    <div className={styles.container}>
      <div className={styles.content}>
        {label && <label htmlFor={label}>{label}:</label>}
        <select value={value} onChange={onChange} id={label}>
          <option value="">Выбрать</option>
          {options.map((option) => (
            <option
              key={option}
              value={option}
              disabled={disabledOptions.includes(option)} // Disable the option if it's in the disabledOptions array
            >
              {option}
            </option>
          ))}
        </select>
      </div>

      {error && <span className="errorP">{error}</span>}
    </div>
  ),
);
SelectInput.displayName = 'SelectInput';

export default SelectInput;
