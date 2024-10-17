import { ExtendedCrud } from '@/types/Crud';
import { getItem } from '@/utils/localStorageUtils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleApiError } from './handleApiError';

export const fetchCruds = createAsyncThunk(
  'crud/fetchCruds',
  async (_, { rejectWithValue }) => {
    const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/';

    try {
      const response = await axios.get(`${API}api/cruds`, {
        params: { limit: 5 },
      });

      return response.data as ExtendedCrud[];
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, 'Ошибка при получении записей'),
      );
    }
  },
);

export const fetchInactiveCruds = createAsyncThunk(
  'crud-inactive/fetchCruds',
  async (_, { rejectWithValue }) => {
    const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/';
    const token = getItem('user');
    try {
      const response = await axios(`${API}api/cruds/inactive?limit=5`, {
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, 'Ошибка при получении записей'),
      );
    }
  },
);
