import { AuthResponse } from '@/types/auth/AuthResponse';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleApiError } from './handleApiError';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/';

export const login = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: string } // Это позволит типизировать rejectWithValue
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    // Отправка POST-запроса на сервер для авторизации
    const response = await axios.post(`${API}api/auth/login`, {
      email,
      password,
    });

    // Возвращаем данные пользователя при успешном запросе
    return response.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error, 'Ошибка при авторизаций'));
  }
});
