import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExtendedCrud } from '@/types/Crud';
import { fetchCruds, searchCruds } from '../api/getCruds';

// Определяем тип состояния
interface CrudState {
  items: ExtendedCrud[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalItems: number;
  pageSize: number;
  totalPages: number;
}

// Начальное состояние
const initialState: CrudState = {
  items: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalItems: 0,
  pageSize: 15,
  totalPages: 0,
};

const crudSlice = createSlice({
  name: 'crud',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    updateCrud: (state, action: PayloadAction<ExtendedCrud>) => {
      const index = state.items.findIndex(
        (crud) => crud.id === action.payload.id,
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeCrud: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((crud) => crud.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCruds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCruds.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.totalItems = action.payload.totalItems;
        state.totalPages = Math.ceil(
          action.payload.totalItems / state.pageSize,
        );
      })
      .addCase(fetchCruds.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Неизвестная ошибка';
      })
      .addCase(searchCruds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchCruds.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.totalItems = action.payload.totalItems;
        state.totalPages = Math.ceil(
          action.payload.totalItems / state.pageSize,
        );
      })
      .addCase(searchCruds.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Неизвестная ошибка';
      });
  },
});

export const { updateCrud, removeCrud, setPage } = crudSlice.actions;
export default crudSlice.reducer;
