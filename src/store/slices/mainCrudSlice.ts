import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExtendedCrud } from '@/types/Crud';
import { fetchCruds } from '../api/getCruds';

// Определяем тип состояния
interface CrudState {
  items: ExtendedCrud[];
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: CrudState = {
  items: [],
  loading: false,
  error: null,
};

const crudSlice = createSlice({
  name: 'crud',
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
      .addCase(
        fetchCruds.fulfilled,
        (state, action: PayloadAction<ExtendedCrud[]>) => {
          state.loading = false;
          state.items = action.payload;
        },
      )
      .addCase(fetchCruds.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Неизвестная ошибка';
      });
  },
});

export const { updateCrud, removeCrud } = crudSlice.actions;
export default crudSlice.reducer;
