import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CandidateType } from '@/types/candidate';
import { fetchCandidate } from '../api/getCandidates';

// Определяем тип состояния
interface CandidateState {
  items: CandidateType[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

// Начальное состояние
const initialState: CandidateState = {
  items: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalItems: 0,
  pageSize: 15,
  totalPages: 0,
};

const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    updateCandidate: (state, action: PayloadAction<CandidateType>) => {
      const index = state.items.findIndex(
        (candidate) => candidate.id === action.payload.id,
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeCandidate: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (candidate) => candidate.id !== action.payload,
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
      .addCase(fetchCandidate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCandidate.fulfilled,
        (
          state,
          action: PayloadAction<{
            items: CandidateType[];
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
      .addCase(fetchCandidate.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Неизвестная ошибка';
      });
  },
});

export const { updateCandidate, removeCandidate, setPage, setPageSize } =
  candidateSlice.actions;
export default candidateSlice.reducer;
