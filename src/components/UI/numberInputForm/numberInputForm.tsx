import React, { FC } from 'react';
import styles from './numberInput.module.scss';

interface NumberInputProps {
  label: string;
  value: number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const NumberInput: FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  error,
}) => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <label htmlFor={label}>{label}:</label>
      <input id={label} type="number" value={value} onChange={onChange} />
    </div>
    {error && <span className="errorP">{error}</span>}
  </div>
);

export default NumberInput;
