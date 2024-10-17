import React, { FC } from 'react';
import styles from './textInput.module.scss';

interface TextInputProps {
  label: string | undefined;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  flex?: string;
}

const TextInput: FC<TextInputProps> = ({
  label,
  value,
  onChange,
  error,
  placeholder,
  flex,
}) => (
  <div className={styles.wrapper}>
    <div
      className={styles.container}
      style={flex ? { justifyContent: `${flex}` } : {}}
    >
      {label && <label htmlFor={label}>{label}:</label>}
      <input
        id={label}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
    {error && <span className="errorP">{error}</span>}
  </div>
);

export default TextInput;
