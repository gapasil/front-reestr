import React, { FC, useEffect, useState } from 'react';
import styles from './header.module.scss';
import { removeItem } from '@/utils/localStorageUtils';
import { autoReload } from '@/utils/autoReload';
import { verifyToken } from '@/services/authService';
import { useAppDispatch, useAppSelector } from '@/hooks/ReduxHooks';
import { toggleForm } from '@/store/slices/authAndRegForm';

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.authAndRegForm);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // Состояние для отслеживания состояния меню
  const token = localStorage.getItem('user');

  useEffect(() => {
    const validateToken = async (): Promise<void> => {
      try {
        if (token) {
          const isValid = await verifyToken(JSON.parse(token).token);
          if (!isValid) {
            setIsMenuOpen(true); // Если токен не валиден, открываем меню
          } else {
            setIsMenuOpen(false); // Если токен валиден, оставляем меню закрытым
          }
        } else {
          setIsMenuOpen(true); // Если токен отсутствует, открываем меню
        }
      } catch (error) {
        console.error('Ошибка при проверке токена:', error);
        setIsMenuOpen(true); // В случае ошибки, открываем меню
      }
    };
    validateToken();
  }, [token, isOpen]);

  const authForm = () => {
    dispatch(toggleForm());
  };

  const exitA = () => {
    removeItem('user');
    autoReload(500);
  };
  return (
    <header className={styles.container_header}>
      <div className={styles.header_block}>
        <p>logo</p>
      </div>
      <div className={styles.header_block}>
        <p>input</p>
      </div>
      <div className={styles.header_block}>
        {isMenuOpen && (
          <button onClick={() => authForm()}>
            Авторизоватся или зарегистрироватся
          </button>
        )}
        {!isMenuOpen && (
          <button onClick={() => exitA()}>Выйти из аккаунта</button>
        )}
      </div>
    </header>
  );
};
