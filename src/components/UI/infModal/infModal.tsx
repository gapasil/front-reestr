'use client';

import React, { useEffect, useState } from 'react';
import { hideInfModal } from '@/store/UISlices/infModalSlice';
import styles from './modal.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/ReduxHooks';

const InfModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen, message } = useAppSelector((state) => state.infModal);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsActive(true);
      const timer = setTimeout(() => {
        setIsActive(false); // Убираем класс анимации перед закрытием
        setTimeout(() => {
          dispatch(hideInfModal());
        }, 300); // Даем время для завершения анимации
      }, 3000); // Модальное окно исчезает через 5 секунд

      return () => clearTimeout(timer);
    }
  }, [isOpen, dispatch]);

  if (!isOpen && !isActive) return null;

  return (
    <div className={`${styles.modal} ${isOpen ? styles.open : ''}`}>
      <div
        className={`${styles.modalContent} ${isActive ? styles.modalContent__active : ''}`}
      >
        <p>{message}</p>
        <div className={styles.progressBar}></div>
      </div>
    </div>
  );
};

export default InfModal;
