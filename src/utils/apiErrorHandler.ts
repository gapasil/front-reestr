import axios from 'axios';
import { AxiosErrorResponse } from '@/types/auth/AxiosErrorResponse';

export const handleApiError = (
  error: unknown,
  customMessage: string,
): never => {
  console.error(customMessage, error);

  if (axios.isAxiosError(error)) {
    if (error.response) {
      const errResponse = error.response.data as AxiosErrorResponse;
      console.error('Сервер вернул ошибку:', errResponse);
      throw errResponse.error || 'Неизвестная ошибка сервера';
    } else if (error.request) {
      console.error('Нет ответа от сервера:', error.request);
      throw 'Нет ответа от сервера. Попробуйте позже.';
    } else {
      console.error('Ошибка при создании запроса:', error.message);
      throw 'Ошибка при создании запроса. Попробуйте позже.';
    }
  }
  throw error;
};
