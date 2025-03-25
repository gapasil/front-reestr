'use client';

import React, { useState, useEffect, memo } from 'react';
import { AddCrud } from '@/components/containers/addCrud/addCrud';
import { getItem, setItem } from '@/utils/localStorageUtils';
import { AddCandidate } from '@/components/containers/addCandidate/addCandidate';
import style from './sendData.module.scss';

const SendData: React.FC = () => {
  const [showAddCrud, setShowAddCrud] = useState<boolean>(false);

  // Используем эффект для чтения значения из localStorage при монтировании компонента
  useEffect(() => {
    const storedShowAddCrud = getItem<boolean | undefined>('sendType');
    if (storedShowAddCrud !== undefined) {
      setShowAddCrud(storedShowAddCrud);
    }
  }, []);

  // Функция для изменения состояния и сохранения его в localStorage
  const toggleShowAddCrud = () => {
    const newValue = !showAddCrud;
    setShowAddCrud(newValue);
    setItem('sendType', newValue); // Сохраняем новое значение в localStorage
  };

  return (
    <main
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>Отправить данные</h1>
      <button onClick={toggleShowAddCrud} className={style.button}>
        {showAddCrud ? 'Обычная форма' : 'Полноценный редактор'}{' '}
        {/* Текст кнопки зависит от состояния */}
      </button>
      <p className={style.infoBlock}>
        {' '}
        Если вы стали свидетелем русофобии, укронацизма или предательства Родины
        мы призываем вас, сообщать о таких случаях. Ваши сообщения будут
        рассмотрены, и при необходимости направлены в правоохранительные органы.
      </p>
      {showAddCrud === true ? <AddCrud /> : <AddCandidate />}
    </main>
  );
};

const MemoizedSendData = memo(SendData);
MemoizedSendData.displayName = 'SendData';

export default MemoizedSendData;
