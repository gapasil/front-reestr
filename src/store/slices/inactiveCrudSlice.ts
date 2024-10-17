import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExtendedCrud } from '@/types/Crud';
import { fetchInactiveCruds } from '../api/getCruds';

interface CrudState {
  items: ExtendedCrud[];
  loading: boolean;
  error: string | null;
}

const initialState: CrudState = {
  items: [],
  loading: false,
  error: null,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInactiveCruds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchInactiveCruds.fulfilled,
        (state, action: PayloadAction<ExtendedCrud[]>) => {
          state.loading = false;
          state.items = action.payload;
        },
      )
      .addCase(fetchInactiveCruds.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Неизвестная ошибка';
      });
  },
});

export const { updateCrud, removeCrudInactive } = inactiveCrudSlice.actions;
export default inactiveCrudSlice.reducer;
