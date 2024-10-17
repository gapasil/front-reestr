'use client';

import { CartCrud } from '@/components/cardCrud/cartCrud';
import styles from './crudList.module.scss';
import React, { useEffect } from 'react';
import { fetchCruds } from '@/store/api/getCruds';
import { useAppDispatch, useAppSelector } from '@/hooks/ReduxHooks';

const CrudList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.crud);

  useEffect(() => {
    dispatch(fetchCruds());
  }, [dispatch]);

  if (loading) return <div>Загрузка...</div>;
  if (error) {
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

export default CrudList;
