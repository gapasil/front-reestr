import React, { FC, useEffect, useRef } from 'react';
import styles from './textArea.module.scss';

interface TextAreaProps {
  label: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
}

const TextArea: FC<TextAreaProps> = ({
  label,
  value,
  onChange,
  error,
  placeholder,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <label htmlFor={label}>{label}:</label>
        <textarea
          id={label}
          ref={textareaRef}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={1}
        />
      </div>
      {error && <span className="errorP">{error}</span>}
    </div>
  );
};

export default TextArea;
