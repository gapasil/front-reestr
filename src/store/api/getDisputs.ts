import { getItem } from '@/utils/localStorageUtils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleApiError } from './handleApiError';
import { User } from '@/types/user';

interface FetchDisputsParams {
  page: number;
  limit: number;
}

export const fetchDisputs = createAsyncThunk(
  'disput/fetchDisputs',
  async ({ page = 1, limit = 10 }: FetchDisputsParams, { rejectWithValue }) => {
    const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/';
    const token = getItem<User>('user');

    try {
      // Используем page и limit в запросе
      const response = await axios.get(
        `${API}api/disput?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token?.token}`,
          },
        },
      );

      return {
        items: response.data.items,
        totalItems: response.data.totalItems,
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, 'Ошибка при получении диспутов'),
      );
    }
  },
);
