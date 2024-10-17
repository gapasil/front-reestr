import React, { useEffect, useRef } from 'react';
import styles from './textArea.module.scss'; // Импортируем SCSS модуль

interface AutoExpandingTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const AutoExpandingTextarea: React.FC<AutoExpandingTextareaProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Используем useEffect для авторасширения текстового поля
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Сброс высоты
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Установка высоты
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.textarea} // Применяем стили из SCSS модуля
    />
  );
};

export default AutoExpandingTextarea;
