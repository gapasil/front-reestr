import React, { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './mainSideMenu.module.scss';
import { useAppSelector } from '@/hooks/ReduxHooks';
import { useCheckAdmin } from '@/hooks/userHooks';

export const MainSideMenu: FC = () => {
  const pathname = usePathname();

  const { isOpen } = useAppSelector((state) => state.authAndRegForm);
  const admin = useCheckAdmin(isOpen);

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
      </ul>
    </nav>
  );
};
