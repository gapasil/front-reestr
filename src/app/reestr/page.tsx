'use client';

import styles from './reestr.module.scss';
import React, { Suspense } from 'react';
import CrudList from '@/components/containers/crudList/crudList';

const Reestr: React.FC = () => {
  const email = process.env.NEXT_PUBLIC_EMAIL; // Получаем email из переменной окружения
  const telegram = process.env.NEXT_PUBLIC_TELEGRAM; // Получаем Telegram из переменной окружения
  return (
    <main>
      <h1 className="header-page">Реестр русофобов</h1>
      <div className={styles.introText}>
        <p>
          <strong>
            Присоединяйтесь к набутыливанию русофобов и хохлолюбов:
          </strong>{' '}
          Мы обращаемся к неравнодушным гражданам, которые готовы объединить
          усилия, чтобы очистить наш тыл от врагов и защитить наше общество от
          ненависти и враждебности. Ваше участие в документировании фактов
          русофобии и предательства поможет укрепить наше единство и обеспечить
          справедливость.
        </p>
        <p>
          Каждое ваше действие — это шаг к созданию безопасного и сплоченного
          пространства для русских. Если вы разделяете наши цели и взгляды по
          поводу проведения СВО и отношению к врагам россии и русофобам, готовы
          внести вклад в это важное дело, присоединяйтесь к нам!
        </p>
        <p>
          Контакт: <a href={`mailto:${email}`}>{email}</a>
        </p>
        <p>
          Telegram:{' '}
          <a href={telegram} target="_blank" rel="noopener noreferrer">
            @reestr_rusofobov
          </a>
        </p>
      </div>
      <div className={styles.containerCart}>
        <Suspense fallback={<div>Загрузка...</div>}>
          <CrudList />
        </Suspense>
      </div>
    </main>
  );
};

export default Reestr;
