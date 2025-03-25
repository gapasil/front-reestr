'use client';

import styles from './reestr.module.scss';
import React, { Suspense } from 'react';
import CrudList from '@/components/containers/crudList/crudList';
import Link from 'next/link';

const Reestr: React.FC = () => {
  const email = process.env.NEXT_PUBLIC_EMAIL; // Получаем email из переменной окружения
  const telegram = process.env.NEXT_PUBLIC_TELEGRAM; // Получаем Telegram из переменной окружения
  return (
    <main>
      <h1 className="header-page">
        Реестр русофобов 2025 – список предателей России
      </h1>

      <div className={styles.introText}>
        <p>
          <strong>Реестр врагов России – свежие данные 2025</strong>
        </p>
        <p>
          Здесь вы найдете актуальный список лиц, проявляющих антироссийские
          взгляды, участвующих в деструктивной деятельности и пропаганде
          ненависти.
        </p>
        <p>
          Наша цель – выявлять подобных людей, анализировать их заявления и
          поступки, а также документировать их активность. Присоединяйтесь и
          помогите нам в этом деле!
        </p>
      </div>

      <div className={styles.containerCart}>
        <Suspense fallback={<div>Загрузка...</div>}>
          <CrudList />
        </Suspense>
      </div>

      <div className={styles.introText}>
        <h2>Как попадают в реестр русофобов?</h2>
        <p>
          Попадание в реестр происходит на основе анализа публичных заявлений,
          поступков и зафиксированных случаев антироссийской деятельности.
        </p>

        <h2>Как бороться с русофобией?</h2>
        <p>
          Лучший способ борьбы – активное информирование общества, разоблачение
          лжи и поддержка тех, кто противостоит деструктивному влиянию.
        </p>

        <h2>Часто задаваемые вопросы о русофобах</h2>
        <p>
          Подробнее о критериях включения в реестр читайте в разделе{' '}
          <Link href="/about">"О проекте"</Link>. Хотите поддержать нас?
          Узнайте, как это сделать, на странице{' '}
          <Link href="/support">"Борьба с русофобами"</Link>.
        </p>

        <h2>Как вы можете помочь?</h2>
        <p>
          Если у вас есть информация о людях, активно распространяющих
          антироссийскую пропаганду, присылайте данные на{' '}
          <a href={`mailto:${email}`}>{email}</a> или через наш{' '}
          <a href={telegram} target="_blank" rel="noopener noreferrer">
            Telegram-канал
          </a>
          .
        </p>
        <p>
          Каждый случай проходит тщательную проверку. Наша миссия – защищать
          информационное пространство от враждебного влияния.
        </p>
        <Link href="/sendData" className={styles.link}>
          Отправить данные
        </Link>
      </div>
    </main>
  );
};

export default Reestr;
