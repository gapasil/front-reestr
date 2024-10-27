import { AuthResponse } from '@/types/auth/AuthResponse';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleApiError } from './handleApiError';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/';

export const verify = createAsyncThunk<
  AuthResponse,
  { email: string; code: string }
>('auth/verify', async ({ email, code }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API}api/auth/verify`, {
      email,
      code,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error, 'Ошибка при проверке кода'));
  }
});
