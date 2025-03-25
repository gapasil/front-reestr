import React, { FC, useEffect, useState } from 'react';
import styles from './addCandidate.module.scss';
import TextArea from '../../UI/textAreaForm/textAreaForm';
import { showInfModal } from '@/store/UISlices/infModalSlice';
import { useAppDispatch } from '@/hooks/ReduxHooks';
import TextInput from '../../UI/textInputForm/textInputForm';
import { createCandidate } from '@/services/candidateService';
import {
  CandidateSchema,
  CandidateType,
  CreateCandidate,
} from '@/types/candidate';

type ValidationError = Record<string, string>;

const initData = {
  description: '',
  links: [],
  name: '',
};

export const AddCandidate: FC = () => {
  const [data, setData] = useState<CreateCandidate>(initData);
  const [errors, setErrors] = useState<ValidationError>({});
  const [backendError, setBackendError] = useState<string | null>(null);
  const [prev, setPrev] = useState<boolean>(false);
  const [remove, setRemove] = useState(false);
  const [stateFetch, setStateFetch] = useState(false);

  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: keyof CandidateType,
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

    const result = CandidateSchema.safeParse(data); // Проверка данных на валидность

    if (!result.success) {
      const formattedErrors: ValidationError = {};
      result.error.errors.forEach((error) => {
        if (error.path.length > 0) {
          formattedErrors[error.path[0] as string] = error.message; // Форматирование ошибок
        }
      });

      setErrors(formattedErrors); // Установка ошибок в состоянии
    } else {
      setErrors({}); // Сброс ошибок

      const formData = new FormData();
      formData.append('data', JSON.stringify(data)); // Добавление данных в FormData

      try {
        // Отправка POST-запроса на сервер
        setStateFetch(true);
        const responseData = await createCandidate(formData); // ожидание ответа от функции createCrud
        console.log(responseData);
        setStateFetch(false);
        dispatch(showInfModal('Данные успешно отправлены на модерацию!'));
        setData(initData);
        setPrev(!prev);
        setRemove(!remove);
      } catch (error) {
        setStateFetch(false);
        setBackendError(error as string);
        console.error('Ошибка:', error); // Логирование ошибки
      }
    }
  };

  const handleAddLink = () => {
    setData((prevData) => ({
      ...prevData,
      links: [...prevData.links, ''],
    }));
  };

  const handleRemoveLink = (index: number) => {
    setData((prevData) => ({
      ...prevData,
      links: prevData.links?.filter((_, i) => i !== index),
    }));
  };
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div style={{ width: 'fit-content' }}>
          <TextInput
            label="Имя"
            value={data.name}
            onChange={(e) => handleChange(e, 'name')}
            error={errors.name}
            placeholder="Имя"
          />
          <TextArea
            label="Подробности"
            value={data.description}
            onChange={(e) => handleChange(e, 'description')}
            error={errors.description}
            placeholder="Обоснование добавления"
          />
        </div>
        <div className={styles.infoBottom} style={{ width: 'fit-content' }}>
          <h3>Ссылки на источники:</h3>
          <button type="button" onClick={handleAddLink}>
            Добавить источник
          </button>
          {data.links?.map((item, index) => (
            <div key={index} className={styles.proofOption}>
              <TextInput
                label={undefined}
                placeholder="Ссылка"
                value={item}
                onChange={(e) => {
                  const newProof = [...(data.links || [])];
                  newProof[index] = e.target.value;
                  setData((prevData) => ({
                    ...prevData,
                    links: newProof,
                  }));
                }}
              />
              <button
                className={styles.remove}
                type="button"
                onClick={() => handleRemoveLink(index)}
              >
                &times;
              </button>
            </div>
          ))}
          <p className="errorP">{errors.links}</p>
        </div>
        {stateFetch && <p className="highlightP">Загрузка данных...</p>}
        {stateFetch ? <></> : <button type="submit">Сохранить</button>}
        {backendError && <p className="errorP">{backendError}</p>}
      </form>
    </div>
  );
};
