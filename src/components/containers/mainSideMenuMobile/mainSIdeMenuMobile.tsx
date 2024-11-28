import React, { FC, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './mainSideMenuMobile.module.scss';
import { useAppSelector } from '@/hooks/ReduxHooks';
import { useCheckAdmin } from '@/hooks/userHooks';
import Image from 'next/image';

export const MainSideMenuMobile: FC = () => {
  const pathname = usePathname();
  const { isOpen } = useAppSelector((state) => state.authAndRegForm);
  const admin = useCheckAdmin(isOpen);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.nav}>
      <button className={styles.hamburger} onClick={toggleMenu}>
        ☰
      </button>
      <ul
        className={`${styles.menu} ${menuOpen ? styles.open : ''}`}
        onClick={toggleMenu}
      >
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
      </ul>
    </nav>
  );
};
