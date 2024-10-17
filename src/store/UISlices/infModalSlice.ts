import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InfModalState {
  isOpen: boolean;
  message: string;
}

const initialState: InfModalState = {
  isOpen: false,
  message: '',
};

const infModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showInfModal: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.message = action.payload;
    },
    hideInfModal: (state) => {
      state.isOpen = false;
      state.message = '';
    },
  },
});

export const { showInfModal, hideInfModal } = infModalSlice.actions;
export default infModalSlice.reducer;
