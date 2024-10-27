import axios from 'axios';
import { AxiosErrorResponse } from '@/types/auth/AxiosErrorResponse'; // Ваш тип ошибок

export const handleApiError = (error: unknown, context: string): string => {
  console.error(`${context}:`, error);

  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.log(error);

      const errResponse = error.response.data as AxiosErrorResponse;
      console.error('Сервер вернул ошибку:', errResponse);
      return errResponse.error || 'Неизвестная ошибка сервера';
    } else if (error.request) {
      console.error('Нет ответа от сервера:', error.request);
      return 'Нет ответа от сервера. Попробуйте позже.';
    } else {
      console.error('Ошибка при создании запроса:', error.message);
      return 'Ошибка при создании запроса. Попробуйте позже.';
    }
  }

  return 'Произошла неизвестная ошибка.';
};
