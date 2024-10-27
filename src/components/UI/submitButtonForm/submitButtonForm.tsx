import { memo } from 'react';

interface SubmitButtonProps {
  loading: boolean;
  isLogin: boolean;
  codeSent: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = memo(
  ({ loading, isLogin, codeSent }) => (
    <button type="submit" disabled={loading}>
      {loading
        ? 'Загрузка...'
        : isLogin
          ? 'Войти'
          : codeSent
            ? 'Подтвердить код'
            : 'Зарегистрироваться'}
    </button>
  ),
);
SubmitButton.displayName = 'SubmitButton';
