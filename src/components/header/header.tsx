'use client';

import React, { FC, useEffect, useState } from 'react';
import styles from './header.module.scss';
import { removeItem } from '@/utils/localStorageUtils';
import { autoReload } from '@/utils/autoReload';
import { verifyToken } from '@/services/authService';
import { useAppDispatch, useAppSelector } from '@/hooks/ReduxHooks';
import { toggleForm } from '@/store/slices/authAndRegForm';
import { MainSideMenuMobile } from '../mainSideMenuMobile/mainSIdeMenuMobile';
import Image from 'next/image';
import { API } from '@/variable/Api';
import Link from 'next/link';

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.authAndRegForm);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // Состояние для отслеживания состояния меню
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('user') : null;

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

  useEffect(() => {
    // Функция для отслеживания изменения размера окна
    const handleResize = () => {
      setIsMobile(window.innerWidth < 780);
    };

    // Устанавливаем начальное значение
    handleResize();

    // Подписываемся на изменение размера окна
    window.addEventListener('resize', handleResize);

    // Убираем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        <Link href="/">
          {' '}
          {/* Оборачиваем Image в Link */}
          <Image
            src={`${API}uploads/logo2.png`}
            alt="Logo"
            width={245} // Укажите нужную ширину
            height={50} // Укажите нужную высоту
          />
        </Link>
      </div>
      <div className={styles.central_block}>
        {isMobile && <MainSideMenuMobile />}
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
