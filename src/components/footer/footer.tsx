import React, { FC } from 'react';
import styles from './footer.module.scss';

export const Footer: FC = () => {
  const email = process.env.NEXT_PUBLIC_EMAIL; // Получаем email из переменной окружения
  const telegram = process.env.NEXT_PUBLIC_TELEGRAM; // Получаем Telegram из переменной окружения

  return (
    <footer className={styles.container_footer}>
      <p>2024 Реестр русофобов</p>
      <p>
        Контакт: <a href={`mailto:${email}`}>{email}</a>
      </p>
      <p>
        Telegram:{' '}
        <a
          href={`https://t.me/${telegram}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          @{telegram}
        </a>
      </p>
    </footer>
  );
};
