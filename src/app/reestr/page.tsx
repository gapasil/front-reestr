import styles from './reestr.module.scss';
import React from 'react';
import CrudList from '@/components/crudList/crudList';

const Reestr: React.FC = () => {
  return (
    <main>
      <h1>Реестр нежелательных лиц</h1>
      <div className={styles.containerCart}>
        <CrudList />
      </div>
    </main>
  );
};

export default Reestr;
