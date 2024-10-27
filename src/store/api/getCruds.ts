import { ExtendedCrud } from '@/types/Crud';
import { getItem } from '@/utils/localStorageUtils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleApiError } from './handleApiError';

interface FetchParams {
  page: number;
  limit: number;
  isActive?: boolean;
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/';

export const searchCruds = createAsyncThunk(
  'crud/searchCruds',
  async (
    { query, page, limit }: { query: string; page: number; limit: number },
    { rejectWithValue },
  ) => {
    const url = `${API}api/cruds/search`;
    try {
      const response = await axios.get(url, { params: { query, page, limit } });
      return {
        items: response.data.items as ExtendedCrud[],
        totalItems: response.data.totalItems,
      };
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, 'Ошибка при поиске записей'),
      );
    }
  },
);

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
      items: response.data.items as ExtendedCrud[],
      totalItems: response.data.totalItems,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchCruds = createAsyncThunk(
  'crud/fetchCruds',
  async ({ page, limit }: FetchParams, { rejectWithValue }) => {
    const url = `${API}api/cruds`;
    try {
      return await fetchData(url, { page, limit });
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, 'Ошибка при получении записей'),
      );
    }
  },
);

export const fetchInactiveCruds = createAsyncThunk(
  'crud-inactive/fetchInactiveCruds',
  async ({ page, limit }: FetchParams, { rejectWithValue }) => {
    const url = `${API}api/cruds/inactive`;
    const token = getItem('user')?.token;
    try {
      return await fetchData(url, { page, limit }, token);
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, 'Ошибка при получении неактивных записей'),
      );
    }
  },
);
