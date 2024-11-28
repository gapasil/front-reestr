import React, { useEffect, useState } from 'react';
import styles from './userEdit.module.scss';
import { adminUser } from '@/services/userService'; // Импортируем функцию adminUser
import axios from 'axios';
import { API } from '@/variable/Api';
import { getItem } from '@/utils/localStorageUtils';

const UserEdit: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [backEndError, setBackendError] = useState<string>('');
  const [notification, setNotification] = useState<string>('');
  const [user, setUser] = useState<{
    totalUsers: number;
    emails: Array<string>;
  } | null>();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Проверка на пустой ввод
    if (!userId) {
      setBackendError('ID пользователя не может быть пустым');
      return; // Выход из функции, если ID пустой
    }

    try {
      const response = await adminUser(userId);
      if (response) {
        setNotification(response.message);
        setBackendError(''); // Очистка ошибок, если запрос успешен
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setBackendError(error.response?.data?.message || 'Ошибка сервера');
      } else {
        setBackendError('Неизвестная ошибка');
      }
      console.error('Ошибка при обновлении пользователя:', error); // Логирование ошибки
    }
  };

  useEffect(() => {
    const token = getItem('user');
    const fetchData = async () => {
      try {
        const url = `${API}api/user/usersSummary`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token?.token}`,
          },
        });
        setUser(response.data); // Сохраняем данные в состояние
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.userEditContainer}>
      <h2>Редактировать пользователя</h2>
      <form onSubmit={handleSubmit} className={styles.blockRed}>
        <h3>Сделать администратором:</h3>
        <div>
          <label htmlFor="userId">ID пользователя:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div>
          <h2>Все юзеры</h2>
          <h2>{user?.totalUsers}</h2>
          <div>
            {user?.emails.map((value) => (
              <p key={value} style={{ margin: '10px' }}>
                {value}
              </p>
            ))}
          </div>
        </div>
        {backEndError && <p className="errorP">{backEndError}</p>}
        {notification && <p className="highlightP">{notification}</p>}
        <button type="submit" className={styles.submitButton}>
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default UserEdit;
