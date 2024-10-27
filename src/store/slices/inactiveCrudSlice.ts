import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExtendedCrud } from '@/types/Crud';
import { fetchInactiveCruds } from '../api/getCruds';

interface CrudState {
  items: ExtendedCrud[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

const initialState: CrudState = {
  items: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalItems: 0,
  pageSize: 15,
  totalPages: 0,
};

const inactiveCrudSlice = createSlice({
  name: 'crud-inactive',
  initialState,
  reducers: {
    updateCrud: (state, action: PayloadAction<ExtendedCrud>) => {
      const index = state.items.findIndex(
        (crud) => crud.id === action.payload.id,
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeCrudInactive: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((crud) => crud.id !== action.payload);
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
      .addCase(fetchInactiveCruds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchInactiveCruds.fulfilled,
        (
          state,
          action: PayloadAction<{ items: ExtendedCrud[]; totalItems: number }>,
        ) => {
          state.loading = false;
          state.items = action.payload.items;
          state.totalPages = Math.ceil(
            action.payload.totalItems / state.pageSize,
          );
        },
      )
      .addCase(fetchInactiveCruds.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Неизвестная ошибка';
      });
  },
});

export const { updateCrud, removeCrudInactive, setPage, setPageSize } =
  inactiveCrudSlice.actions;
export default inactiveCrudSlice.reducer;
