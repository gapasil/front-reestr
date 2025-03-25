import { CandidateType } from '@/types/candidate';
import { User } from '@/types/user';
import { handleApiError } from '@/utils/apiErrorHandler';
import { getItem } from '@/utils/localStorageUtils';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/';

export const createCandidate = async (
  formData: FormData,
): Promise<CandidateType | undefined> => {
  try {
    const response = await axios.post(`${API}api/candidate`, formData);
    return response.data; // Возврат данных ответа
  } catch (error) {
    console.error('Ошибка при создании объекта candidate:', error);
    handleApiError(error, 'Ошибка при создании объекта candidate:');
  }
};

export const deleteСandidate = async (id: string): Promise<void> => {
  const token = getItem<User>('user');
  try {
    await axios.delete(`${API}api/candidate/${id}`, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
    });
    console.log('кандидат успешно удален');
  } catch (error) {
    console.error('Ошибка при удалении кандидата:', error);
    handleApiError(error, 'Ошибка при удалении кандидата');
  }
};
