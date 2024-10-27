import { AuthResponse } from '@/types/auth/AuthResponse';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleApiError } from './handleApiError';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/';

export const register = createAsyncThunk<
  AuthResponse,
  { email: string; password: string; name: string; captchaValue: string }
>(
  'auth/register',
  async ({ email, password, name, captchaValue }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}api/auth/register`, {
        email,
        password,
        name,
        captchaValue,
      });

      console.log('Регистрация прошла успешно:', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error, 'Ошибка при регистрации'));
    }
  },
);
