import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Disput } from '@/types/disput';
import { fetchDisputs } from '../api/getDisputs';

// Определяем тип состояния
interface DisputState {
  items: Disput[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

// Начальное состояние
const initialState: DisputState = {
  items: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalItems: 0,
  pageSize: 15,
  totalPages: 0,
};

const disputSlice = createSlice({
  name: 'disput',
  initialState,
  reducers: {
    updateDisput: (state, action: PayloadAction<Disput>) => {
      const index = state.items.findIndex(
        (disput) => disput.id === action.payload.id,
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeDisput: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (disput) => disput.id !== action.payload,
      );
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDisputs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDisputs.fulfilled,
        (
          state,
          action: PayloadAction<{
            items: Disput[];
            totalItems: number;
            currentPage: number;
            totalPages: number;
          }>,
        ) => {
          state.loading = false;
          state.items = action.payload.items;
          state.currentPage = action.payload.currentPage;
          state.totalPages = action.payload.totalPages;
        },
      )
      .addCase(fetchDisputs.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Неизвестная ошибка';
      });
  },
});

export const { updateDisput, removeDisput, setPage, setPageSize } =
  disputSlice.actions;
export default disputSlice.reducer;
