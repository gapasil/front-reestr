interface SubmitButtonProps {
  loading: boolean;
  isLogin: boolean;
  codeSent: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading,
  isLogin,
  codeSent,
}) => (
  <button type="submit" disabled={loading}>
    {loading
      ? 'Загрузка...'
      : isLogin
        ? 'Войти'
        : codeSent
          ? 'Подтвердить код'
          : 'Зарегистрироваться'}
  </button>
);
