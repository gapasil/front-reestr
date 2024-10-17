import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login } from '../api/login';
import { register } from '../api/registration';
import { verify } from '../api/sendCode';

interface AuthState {
  isOpen: boolean; // Открыто ли окно
  isLogin: boolean; // Регистрация или авторизация
  email: string;
  password: string;
  name?: string; // Для регистрации
  phone?: string; // Для регистрации
  code?: string; // Код из email
  loading: boolean;
  error: string | null;
  token?: string;
}

const initialState: AuthState = {
  isOpen: false,
  isLogin: true,
  email: '',
  password: '',
  name: undefined,
  phone: undefined,
  code: undefined,
  loading: false,
  error: null,
  token: undefined,
};

const authAndRegFormSlice = createSlice({
  name: 'authAndRegForm',
  initialState,
  reducers: {
    toggleForm(state) {
      state.isOpen = !state.isOpen;
    },
    setLogin(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setPhone(state, action: PayloadAction<string>) {
      state.phone = action.payload;
    },
    setCode(state, action: PayloadAction<string>) {
      state.code = action.payload;
    },
    clearForm(state) {
      state.email = '';
      state.password = '';
      state.name = undefined;
      state.phone = undefined;
      state.code = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ token: string }>) => {
          state.loading = false;
          state.token = action.payload.token;
        },
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Неизвестная ошибка';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = null; // or set success message
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Неизвестная ошибка';
      })
      .addCase(verify.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verify.fulfilled, (state) => {
        state.loading = false;
        state.error = null; // or set success message
      })
      .addCase(verify.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Неизвестная ошибка';
      });
  },
});

export const {
  toggleForm,
  setLogin,
  setEmail,
  setPassword,
  setName,
  setPhone,
  setCode,
  clearForm,
} = authAndRegFormSlice.actions;

export default authAndRegFormSlice.reducer;
