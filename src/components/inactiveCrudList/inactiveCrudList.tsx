'use client';

import { CartCrud } from '@/components/cardCrud/cartCrud';
import styles from './inactiveCrudList.module.scss';
import React, { useEffect } from 'react';
import { fetchInactiveCruds } from '@/store/api/getCruds';
import { useAppDispatch, useAppSelector } from '@/hooks/ReduxHooks';
import { autoReload } from '@/utils/autoReload';

const InactiveCrudList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(
    (state) => state.inactiveCrud,
  );

  useEffect(() => {
    dispatch(fetchInactiveCruds());
  }, [dispatch]);

  if (loading) return <div>Загрузка...</div>;
  if (error) {
    autoReload();
    return <div className="errorP">Ошибка: {error}</div>;
  }

  return (
    <div className={styles.containerCart}>
      {items.map((value) => (
        <CartCrud {...value} key={value.id} />
      ))}
    </div>
  );
};

export default InactiveCrudList;
