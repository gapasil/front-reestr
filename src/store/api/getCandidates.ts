import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleApiError } from './handleApiError';
import { User } from '@/types/user';
import { getItem } from '@/utils/localStorageUtils';
import { CandidateType } from '@/types/candidate';

interface FetchParams {
  page: number;
  limit: number;
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/';

const fetchData = async (url: string, params: FetchParams, token?: string) => {
  try {
    const config = {
      params: {
        page: params.page,
        limit: params.limit,
      },
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    };
    const response = await axios.get(url, config);
    return {
      items: response.data.items as CandidateType[],
      totalItems: response.data.totalItems,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchCandidate = createAsyncThunk(
  'crud/fetchCandidate',
  async ({ page, limit }: FetchParams, { rejectWithValue }) => {
    const url = `${API}api/candidate`;
    const token = getItem<User>('user')?.token;
    try {
      const data = await fetchData(url, { page, limit }, token);
      return {
        items: data.items,
        totalItems: data.totalItems,
        currentPage: page, // Добавляем текущее значение страницы
        totalPages: Math.ceil(data.totalItems / limit), // Рассчитываем общее количество страниц
      };
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, 'Ошибка при получении записей'),
      );
    }
  },
);
