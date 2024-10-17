import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/hooks/ReduxHooks';
import styles from './authForm.module.scss';
import {
  setEmail,
  setPassword,
  setName,
  setCode,
  setLogin,
  toggleForm,
} from '@/store/slices/authAndRegForm';
import { login } from '@/store/api/login';
import { register } from '@/store/api/registration';
import { verify } from '@/store/api/sendCode';
import { setItem } from '@/utils/localStorageUtils';
import { schemaLogin, schemaRegistration } from '@/types/auth/schemaAuth';
import { InputField } from '../UI/inputAuthFieldForm/inputFieldForm';
import { SubmitButton } from '../UI/submitButtonForm/submitButtonForm';

type LoginFormData = z.infer<typeof schemaLogin>;
type RegistrationFormData = z.infer<typeof schemaRegistration>;

const AuthForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLogin, isOpen } = useAppSelector((state) => state.authAndRegForm);

  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);

  useEffect(() => {
    setBackendError(null);
  }, [isLogin, codeSent]);

  const schema = isLogin ? schemaLogin : schemaRegistration;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData | RegistrationFormData>({
    resolver: zodResolver(schema),
  });

  if (!isOpen) return null;

  const onSubmit = async (data: LoginFormData | RegistrationFormData) => {
    setLoading(true);
    try {
      if (isLogin) {
        const loginData = data as LoginFormData;
        dispatch(setEmail(loginData.email));
        dispatch(setPassword(loginData.password));

        const resultAction = await dispatch(
          login({ email: loginData.email, password: loginData.password }),
        );

        if (login.fulfilled.match(resultAction)) {
          setItem('user', { token: resultAction.payload.token });
          dispatch(toggleForm());
        } else {
          const errorMessage =
            typeof resultAction.payload === 'string'
              ? resultAction.payload
              : 'An unexpected error occurred';
          throw new Error(errorMessage);
        }
      } else {
        const registerData = data as RegistrationFormData;
        dispatch(setEmail(registerData.email));
        dispatch(setPassword(registerData.password));
        dispatch(setName(registerData.name || ''));
        // dispatch(setPhone(registerData.phone || ''));

        if (!codeSent) {
          const resultAction = await dispatch(
            register({
              email: registerData.email,
              password: registerData.password,
              name: registerData.name || '',
              // phone: registerData.phone || '',
            }),
          );

          if (register.fulfilled.match(resultAction)) {
            setCodeSent(true);
          } else {
            const errorMessage =
              typeof resultAction.payload === 'string'
                ? resultAction.payload
                : 'An unexpected error occurred';
            throw new Error(errorMessage);
          }
        } else if (registerData.code) {
          dispatch(setCode(registerData.code || ''));
          const resultAction = await dispatch(
            verify({ email: registerData.email, code: registerData.code }),
          );

          if (verify.fulfilled.match(resultAction)) {
            dispatch(setLogin(!isLogin));
          } else {
            const errorMessage =
              typeof resultAction.payload === 'string'
                ? resultAction.payload
                : 'An unexpected error occurred';
            throw new Error(errorMessage);
          }
        }
      }
    } catch (error) {
      setBackendError(
        error instanceof Error ? error.message : 'An unexpected error occurred',
      );
    } finally {
      setLoading(false);
    }
  };

  const onInvalid = (errors) => console.error(errors);

  return (
    <div className={styles.wrapper} onClick={() => dispatch(toggleForm())}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        onClick={(e) => e.stopPropagation()}
      >
        <InputField
          label="Email"
          name="email"
          control={control}
          errors={errors}
        />
        <InputField
          label="Пароль"
          name="password"
          type="password"
          control={control}
          errors={errors}
        />
        {!isLogin && (
          <>
            <InputField
              label="Подтвердите Пароль"
              name="confirmPassword"
              type="password"
              control={control}
              errors={errors}
            />
            <InputField
              label="Имя"
              name="name"
              control={control}
              errors={errors}
            />
            {/* <InputField
              label="Телефон"
              name="phone"
              control={control}
              errors={errors}
            /> */}
            {codeSent && (
              <InputField
                label="Код из email"
                name="code"
                control={control}
                errors={errors}
              />
            )}
          </>
        )}

        {backendError && <div className="errorP">{backendError}</div>}

        <SubmitButton loading={loading} isLogin={isLogin} codeSent={codeSent} />

        <button
          type="button"
          className={styles.toggleButton}
          onClick={() => dispatch(setLogin(!isLogin))}
        >
          {isLogin ? 'Перейти к регистрации' : 'Перейти к авторизации'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
