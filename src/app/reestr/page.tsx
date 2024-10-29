'use client';

import styles from './reestr.module.scss';
import React, { Suspense } from 'react';
import CrudList from '@/components/containers/crudList/crudList';

const Reestr: React.FC = () => {
  return (
    <main>
      <h1 className="header-page">Реестр русофобов</h1>
      <div className={styles.containerCart}>
        <Suspense fallback={<div>Загрузка...</div>}>
          <CrudList />
        </Suspense>
      </div>
    </main>
  );
};

export default Reestr;
