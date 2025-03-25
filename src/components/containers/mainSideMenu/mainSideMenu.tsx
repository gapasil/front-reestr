'use client';

import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './mainSideMenu.module.scss';
import { useAppSelector } from '@/hooks/ReduxHooks';
import { useCheckAdmin } from '@/hooks/userHooks';
import Image from 'next/image';
import axios from 'axios';
import { API } from '@/variable/Api';

export const MainSideMenu: FC = () => {
  const pathname = usePathname();

  const { isOpen } = useAppSelector((state) => state.authAndRegForm);
  const admin = useCheckAdmin(isOpen);

  const [countCrud, setCountCrud] = useState<number>(0);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${API}api/cruds/count`;
        const response = await axios.get(url);
        setCountCrud(response.data.totalItems); // Сохраняем данные в состояние
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };
    // Функция для отслеживания изменения размера окна
    const handleResize = () => {
      setIsMobile(window.innerWidth < 780);
    };

    // Устанавливаем начальное значение
    handleResize();
    fetchData();
    // Подписываемся на изменение размера окна
    window.addEventListener('resize', handleResize);

    // Убираем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isMobile)
    return (
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          {admin && (
            <li
              className={`${styles.menuItem} ${pathname === '/userEdit' ? styles.active : ''}`}
            >
              <Link href="/userEdit" className={styles.link}>
                Юзеры
              </Link>
            </li>
          )}
          {admin && (
            <li
              className={`${styles.menuItem} ${pathname === '/candidate' ? styles.active : ''}`}
            >
              <Link href="/candidate" className={styles.link}>
                Кандидаты
              </Link>
            </li>
          )}
          {admin && (
            <li
              className={`${styles.menuItem} ${pathname === '/moderate' ? styles.active : ''}`}
            >
              <Link href="/moderate" className={styles.link}>
                Модерация
              </Link>
            </li>
          )}
          {admin && (
            <li
              className={`${styles.menuItem} ${pathname === '/dispute' ? styles.active : ''}`}
            >
              <Link href="/dispute" className={styles.link}>
                Прошения
              </Link>
            </li>
          )}
          <li
            className={`${styles.menuItem} ${pathname === '/' ? styles.active : ''}`}
          >
            <Link href="/" className={styles.link}>
              Главная
            </Link>
          </li>
          <li
            className={`${styles.menuItem} ${pathname === '/reestr' ? styles.active : ''}`}
          >
            <Link href="/reestr" className={styles.link}>
              Реестр
            </Link>
          </li>
          <li
            className={`${styles.menuItem} ${pathname === '/sendData' ? styles.active : ''}`}
          >
            <Link href="/sendData" className={styles.link}>
              Отправить данные
            </Link>
          </li>
          <li
            className={`${styles.menuItem} ${pathname === '/removeData' ? styles.active : ''}`}
          >
            <Link href="/removeData" className={styles.link}>
              Убрать из реестра
            </Link>
          </li>
          <li
            className={`${styles.menuItem} ${pathname === '/about' ? styles.active : ''}`}
          >
            <Link href="/about" className={styles.link}>
              О нас
            </Link>
          </li>
          <Link href="/support" className={'buttonSupport'}>
            Поддержать
            <Image
              src="/support.png"
              alt="Logo"
              width={20} // Укажите нужную ширину
              height={20} // Укажите нужную высоту
            />
          </Link>
          <span>
            <h1
              style={{ marginTop: '20px', marginBottom: '5px' }}
              className={styles.countCrud}
            >
              {countCrud}
            </h1>
            <p>всего в базе</p>
          </span>
        </ul>
      </nav>
    );
};
