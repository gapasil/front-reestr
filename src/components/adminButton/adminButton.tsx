import React, { useState } from 'react';
import styles from './adminButton.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/ReduxHooks';
import { useCheckAdmin } from '@/hooks/userHooks';
import { deleteStatusCrud, updateStatusCrud } from '@/services/crudServices';
import { removeCrudInactive } from '@/store/slices/inactiveCrudSlice';
import { removeCrud } from '@/store/slices/mainCrudSlice';

interface AdminButtonProps {
  id: string;
  type: 'crud' | 'dispute';
  deleteB: boolean;
  confirm: boolean;
}

const AdminButton: React.FC<AdminButtonProps> = ({
  id,
  type,
  deleteB,
  confirm,
}) => {
  const dispatch = useAppDispatch();
  const [backEndError, setBackendError] = useState('');
  const [notification, setNotification] = useState('');
  const { isOpen } = useAppSelector((state) => state.authAndRegForm);

  const admin = useCheckAdmin(isOpen);

  if (!admin) return null;

  const handleConfirm = async () => {
    if (type === 'crud') {
      // Логика подтверждения для карточки crud
      console.log(`Подтверждение карточки crud с ID: ${id}`);
      try {
        await updateStatusCrud(id);
        setNotification('Запись опубликованна');
        dispatch(removeCrudInactive(id));
      } catch (error) {
        setBackendError(error as string);
        console.error('Ошибка:', error); // Логирование ошибки
      }
    } else if (type === 'dispute') {
      // Логика подтверждения для спора dispute
      console.log(`Подтверждение спора dispute с ID: ${id}`);
      // Здесь можно добавить вызов функции для API или другого действия
    }
  };

  const handleDelete = async () => {
    if (type === 'crud') {
      // Логика удаления для карточки crud
      console.log(`Удаление карточки crud с ID: ${id}`);
      try {
        await deleteStatusCrud(id);
        setNotification('Запись удалена');
        dispatch(removeCrudInactive(id));
        dispatch(removeCrud(id));
      } catch (error) {
        setBackendError(error as string);
        console.error('Ошибка:', error); // Логирование ошибки
      }
    } else if (type === 'dispute') {
      // Логика удаления для спора dispute
      console.log(`Удаление спора dispute с ID: ${id}`);
      // Здесь можно добавить вызов функции для API или другого действия
    }
  };

  return (
    <div className={styles.adminButtonContainer}>
      {notification && <p className="highlightP">{notification}</p>}
      {backEndError && <p className="errorP">{backEndError}</p>}
      <div style={{ display: 'flex', gap: '5px', width: 'fit-content' }}>
        {confirm && (
          <button className={styles.confirmButton} onClick={handleConfirm}>
            Подтвердить
          </button>
        )}
        {deleteB && (
          <button className={styles.deleteButton} onClick={handleDelete}>
            Удалить
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminButton;
