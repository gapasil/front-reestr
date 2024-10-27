import { Crud } from '@/types/Crud';
import { handleApiError } from '@/utils/apiErrorHandler';
import { getItem } from '@/utils/localStorageUtils';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/';

export const createDisput = async (
  formData: FormData,
): Promise<Crud | undefined> => {
  const token = getItem('user');
  try {
    const response = await axios.post(`${API}api/disput`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Установите заголовок для FormData
        Authorization: `Bearer ${token?.token}`,
      },
    });
    return response.data; // Возврат данных ответа
  } catch (error) {
    console.error('Ошибка при создании объекта disput:', error);
    handleApiError(error, 'Ошибка при создании объекта disput:');
  }
};

export const deleteDisput = async (id: string): Promise<void> => {
  const token = getItem('user');
  try {
    await axios.delete(`${API}api/disput/${id}`, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
    });
    console.log('Диспут успешно удален');
  } catch (error) {
    console.error('Ошибка при удалении диспута:', error);
    handleApiError(error, 'Ошибка при удалении диспута');
  }
};
