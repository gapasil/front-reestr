import { Crud } from '@/types/Crud';
import { User } from '@/types/user';
import { handleApiError } from '@/utils/apiErrorHandler';
import { getItem } from '@/utils/localStorageUtils';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/';

export const createCrud = async (
  formData: FormData,
): Promise<Crud | undefined | string> => {
  const token = getItem<User>('user');
  try {
    const response = await axios.post(`${API}api/cruds`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Установите заголовок для FormData
        Authorization: `Bearer ${token?.token}`,
      },
    });
    return response.data; // Возврат данных ответа
  } catch (error) {
    console.error('Ошибка при создании объекта Crud:', error);
    handleApiError(error, 'Ошибка при создании объекта Crud:');
  }
};

export const updateStatusCrud = async (
  id: string,
): Promise<Crud | undefined> => {
  const token = getItem<User>('user');
  try {
    const response = await axios.patch(
      `${API}api/cruds/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка при подтверждений:', error);
    handleApiError(error, 'Ошибка при подтверждений:');
  }
};

export const deleteStatusCrud = async (
  id: string,
): Promise<Crud | undefined> => {
  const token = getItem<User>('user');
  try {
    const response = await axios.delete(`${API}api/cruds/${id}`, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Ошибка при подтверждений:', error);
    handleApiError(error, 'Ошибка при подтверждений:');
  }
};

export const submitEditForReview = async (
  id: string,
  formData: FormData,
): Promise<Crud | undefined> => {
  const token = getItem<User>('user');
  try {
    const response = await axios.post(`${API}api/cruds/${id}/edit`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token?.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при отправке на модерацию:', error);
    handleApiError(error, 'Ошибка при отправке на модерацию:');
  }
};

// Функция для подтверждения изменений администратором
export const approveEdit = async (id: string): Promise<Crud | undefined> => {
  const token = getItem<User>('user');
  try {
    const response = await axios.patch(
      `${API}api/cruds/${id}/approve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка при подтверждении изменений:', error);
    handleApiError(error, 'Ошибка при подтверждении изменений:');
  }
};
