import React, { FC, useEffect, useState } from 'react';
import styles from './addDisput.module.scss';
import TextArea from '../../UI/textAreaForm/textAreaForm';
import { useCheckToken } from '@/hooks/userHooks';
import { showInfModal } from '@/store/UISlices/infModalSlice';
import { useAppDispatch } from '@/hooks/ReduxHooks';
import { getItem } from '@/utils/localStorageUtils';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '@/services/authService';
import { CreateDisput, Disput, DisputSchema } from '@/types/disput';
import TextInput from '../../UI/textInputForm/textInputForm';
import ImageUpload from '../../UI/ImageUpload/imageUpload';
import VideoUpload from '../../UI/videoUpload/videoUpload';
import { createDisput } from '@/services/disputService';
import { Captcha } from '../captcha/captcha';
import { User } from '@/types/user';

type ValidationError = Record<string, string>;

const initData = {
  id_user: '',
  id_crud: '',
  description: '',
  link: [],
  videos: [],
  images: [],
};

export const AddDisput: FC = () => {
  const [data, setData] = useState<CreateDisput>(initData);
  const [errors, setErrors] = useState<ValidationError>({});
  const [backendError, setBackendError] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]); // State to store uploaded images
  const [videos, setVideos] = useState<File[]>([]); // State to store uploaded images
  const [prev, setPrev] = useState<boolean>(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null); // State for CAPTCHA
  const [remove, setRemove] = useState(false);
  const [stateFetch, setStateFetch] = useState(false);

  const captchaCb = (value: null | string) => {
    setCaptchaValue(value);
  };

  const isMenuAuthOpen = useCheckToken();

  const dispatch = useAppDispatch();

  useEffect(() => {
    let decodeTokenUser: DecodedToken | null = null;
    const token = getItem<User>('user')?.token;

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
        id_user: decodeTokenUser.id,
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

    if (!captchaValue) {
      setBackendError('Пожалуйста, подтвердите, что вы не робот.');
      return;
    }

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

      images.forEach((image) => {
        formData.append('photourls', image); // Append each image to FormData
      });

      videos.forEach((video) => {
        formData.append('videourls', video); // Append each image to FormData
      });

      try {
        // Отправка POST-запроса на сервер
        setStateFetch(true);
        formData.append('captchaValue', captchaValue);
        const responseData = await createDisput(formData); // ожидание ответа от функции createCrud
        console.log(responseData);
        setStateFetch(false);
        dispatch(showInfModal('Данные успешно отправлены на модерацию!'));
        setData(initData);
        setPrev(!prev);
        setRemove(!remove);
        setCaptchaValue(null);
      } catch (error) {
        setStateFetch(false);
        setBackendError(error as string);
        console.error('Ошибка:', error); // Логирование ошибки
      }
    }
  };

  const handleImageChange = (files: File[] | null) => {
    console.log(images);

    if (files) {
      setImages(files); // Update the state with the selected files
    } else {
      setImages([]); // Clear the images if no files are selected
    }
  };

  const handleVideoUpload = (files: File[] | null) => {
    console.log(videos);

    if (files) {
      setVideos(files); // Update the state with the selected files
    } else {
      setVideos([]); // Clear the images if no files are selected
    }
  };

  const handleAddLink = () => {
    setData((prevData) => ({
      ...prevData,
      link: [...(prevData.link || []), { description: '', link: '' }],
    }));
  };

  const handleRemoveLink = (index: number) => {
    setData((prevData) => ({
      ...prevData,
      link: prevData.link?.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div style={{ width: 'fit-content' }}>
          <p style={{ marginBottom: '10px' }}>
            Первая картинка станет превью. ID-публикаций на странице записи
          </p>
          <ImageUpload
            setPrev={prev}
            label="Загрузить фотографию"
            onImageChange={handleImageChange}
          />
        </div>
        <div style={{ width: 'fit-content' }}>
          <VideoUpload
            setPrev={prev}
            label="Загрузить видео"
            onVideoChange={handleVideoUpload}
          />
        </div>
        <div style={{ width: 'fit-content' }}>
          <TextInput
            label="ID-публикаций"
            value={data.id_crud}
            onChange={(e) => handleChange(e, 'id_crud')}
            error={errors.idCrud}
            flex={'flex-start'}
          />
          <p className="errorP">{errors.id_crud}</p>
          <TextArea
            label="Описание проблемы"
            value={data.description}
            onChange={(e) => handleChange(e, 'description')}
            error={errors.description}
            placeholder="Описание проблемы"
          />
        </div>
        <div className={styles.infoBottom} style={{ width: 'fit-content' }}>
          <h3>Ссылки на источники:</h3>
          <button type="button" onClick={handleAddLink}>
            Добавить источник
          </button>
          {data.link?.map((item, index) => (
            <div key={index} className={styles.proofOption}>
              <div>
                <TextInput
                  label={undefined}
                  placeholder="Описание"
                  value={item.description}
                  onChange={(e) => {
                    const newProof = [...(data.link || [])];
                    newProof[index].description = e.target.value;
                    setData((prevData) => ({
                      ...prevData,
                      link: newProof,
                    }));
                  }}
                />
                <TextInput
                  label={undefined}
                  placeholder="Ссылка"
                  value={item.link}
                  onChange={(e) => {
                    const newProof = [...(data.link || [])];
                    newProof[index].link = e.target.value;
                    setData((prevData) => ({
                      ...prevData,
                      link: newProof,
                    }));
                  }}
                />
              </div>
              <button
                className={styles.remove}
                type="button"
                onClick={() => handleRemoveLink(index)}
              >
                &times;
              </button>
            </div>
          ))}
          <p className="errorP">{errors.link}</p>
        </div>
        <Captcha cb={captchaCb} remove={remove} />
        {stateFetch && <p className="highlightP">Загрузка данных...</p>}
        {stateFetch ? <></> : <button type="submit">Сохранить</button>}
        {isMenuAuthOpen && <p className="errorP">Необходимо авторизоваться</p>}
        {!isMenuAuthOpen && backendError && (
          <p className="errorP">{backendError}</p>
        )}
      </form>
    </div>
  );
};
