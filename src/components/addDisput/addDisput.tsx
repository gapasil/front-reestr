import React, { FC, useEffect, useState } from 'react';
import styles from './addDisput.module.scss';
import TextArea from '../UI/textAreaForm/textAreaForm';
import { createCrud } from '@/services/crudServices';
import { useCheckToken } from '@/hooks/userHooks';
import { showInfModal } from '@/store/UISlices/infModalSlice';
import { useAppDispatch } from '@/hooks/ReduxHooks';
import { getItem } from '@/utils/localStorageUtils';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '@/services/authService';
import { CreateDisput, Disput, DisputSchema } from '@/types/disput';
import TextInput from '../UI/textInputForm/textInputForm';

type ValidationError = Record<string, string>;

const initData = {
  idCrud: '',
  description: '',
  link: [],
  videos: [],
};

export const AddDisput: FC = () => {
  const [data, setData] = useState<CreateDisput>(initData);
  const [errors, setErrors] = useState<ValidationError>({});
  const [backendError, setBackendError] = useState<string | null>(null);

  const isMenuAuthOpen = useCheckToken();

  const dispatch = useAppDispatch();

  useEffect(() => {
    let decodeTokenUser: DecodedToken | null = null;
    const token = getItem('user')?.token;

    if (token) {
      try {
        decodeTokenUser = jwtDecode<DecodedToken>(token);
      } catch (error) {
        console.error('Ошибка декодирования токена:', error);
      }
    }

    if (decodeTokenUser && decodeTokenUser.id) {
      setData((prevData) => ({
        ...prevData,
        userId: decodeTokenUser.id,
      }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: keyof Disput,
  ) => {
    const value = e.target.value;
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    console.log(data);

    const result = DisputSchema.safeParse(data); // Проверка данных на валидность

    if (!result.success) {
      const formattedErrors: ValidationError = {};
      result.error.errors.forEach((error) => {
        if (error.path.length > 0) {
          formattedErrors[error.path[0] as string] = error.message; // Форматирование ошибок
        }
      });
      console.log(formattedErrors);

      setErrors(formattedErrors); // Установка ошибок в состоянии
    } else {
      setErrors({}); // Сброс ошибок

      const formData = new FormData();
      formData.append('data', JSON.stringify(data)); // Добавление данных в FormData

      try {
        // Отправка POST-запроса на сервер
        const responseData = await createCrud(formData); // ожидание ответа от функции createCrud
        console.log(responseData);
        dispatch(showInfModal('Данные успешно отправлены на модерацию!'));
        setData(initData);
      } catch (error) {
        setBackendError(error as string);
        console.error('Ошибка:', error); // Логирование ошибки
      }
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="ID-публикаций"
          value={data.idCrud}
          onChange={(e) => handleChange(e, 'idCrud')}
          error={errors.idCrud}
          flex={'flex-start'}
        />
        <TextArea
          label="Описание проблемы"
          value={data.description}
          onChange={(e) => handleChange(e, 'description')}
          error={errors.description}
          placeholder="Описание проблемы"
        />
        <button type="submit">Сохранить</button>
        {isMenuAuthOpen && <p className="errorP">Необходимо авторизоваться</p>}
        {!isMenuAuthOpen && backendError && (
          <p className="errorP">{backendError}</p>
        )}
      </form>
    </div>
  );
};
