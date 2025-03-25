import { User } from '@/types/user';
import { handleApiError } from '@/utils/apiErrorHandler';
import { getItem } from '@/utils/localStorageUtils';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/';

interface AdminUserResponse {
  message: string;
}

export const adminUser = async (
  userId: string,
): Promise<AdminUserResponse | undefined> => {
  const token = getItem<User>('user');

  try {
    const response = await axios.post(
      `${API}api/user/adminUser`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
      },
    );
    return response.data; // Возврат данных ответа
  } catch (error) {
    console.error('Ошибка при работе с администратором пользователя:', error);
    handleApiError(error, 'Ошибка при работе с администратором пользователя:');
  }
};

export const getUser = async (): Promise<AdminUserResponse | undefined> => {
  const token = getItem<User>('user');

  try {
    const response = await axios.post(`${API}api/user/userId`, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
    });
    return response.data; // Возврат данных ответа
  } catch (error) {
    console.error('Ошибка при получений ID:', error);
    handleApiError(error, 'Ошибка при получений ID:');
  }
};
