import React, { useState } from 'react';
import styles from './adminButton.module.scss';
import { useAppDispatch } from '@/hooks/ReduxHooks';
import {
  approveEdit,
  deleteStatusCrud,
  updateStatusCrud,
} from '@/services/crudServices';
import { removeCrudInactive } from '@/store/slices/inactiveCrudSlice';
import { removeCrud } from '@/store/slices/mainCrudSlice';
import { deleteDisput } from '@/services/disputService';
import { removeDisput } from '@/store/slices/disputSlice';

interface AdminButtonProps {
  id: string;
  type: 'crud' | 'dispute' | 'crud-edit';
  deleteB: boolean;
  confirm: boolean;
  admin: boolean;
}

const AdminButton: React.FC<AdminButtonProps> = ({
  id,
  type,
  deleteB,
  confirm,
  admin,
}) => {
  const dispatch = useAppDispatch();
  const [backEndError, setBackendError] = useState('');
  const [notification, setNotification] = useState('');

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
    } else if (type === 'crud-edit') {
      console.log('edit');
      try {
        await approveEdit(id);
        setNotification('Запись опубликованна');
        dispatch(removeCrudInactive(id));
      } catch (error) {
        setBackendError(error as string);
        console.error('Ошибка:', error); // Логирование ошибки
      }
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
      try {
        await deleteDisput(id);
        setNotification('Запись удалена');
        dispatch(removeDisput(id));
      } catch (error) {
        setBackendError(error as string);
        console.error('Ошибка:', error); // Логирование ошибки
      }
    } else if (type === 'crud-edit') {
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
