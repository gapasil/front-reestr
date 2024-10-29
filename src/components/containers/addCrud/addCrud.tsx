'use client';

import React, { FC, useEffect, useState } from 'react';
import styles from './addCrud.module.scss';
import { Crud, CrudCreate, CrudSchema } from '@/types/Crud';
import { Categories } from '@/types/enumCategory';
import TextInput from '../../UI/textInputForm/textInputForm';
// import NumberInput from '../UI/numberInputForm/numberInputForm';
import SelectInput from '../../UI/selectInputForm/selectInputForm';
import TextArea from '../../UI/textAreaForm/textAreaForm';
// import SocialMediaInput from '../UI/socialMediaInputForm/socialMediaInputForm';
import ImageUpload from '../../UI/ImageUpload/imageUpload';
import { createCrud } from '@/services/crudServices';
import { useCheckToken } from '@/hooks/userHooks';
import { showInfModal } from '@/store/UISlices/infModalSlice';
import { useAppDispatch } from '@/hooks/ReduxHooks';
import { getItem } from '@/utils/localStorageUtils';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '@/services/authService';
import VideoUpload from '../../UI/videoUpload/videoUpload';
import { Captcha } from '../captcha/captcha';

type ValidationError = Record<string, string>;
const initData = {
  id: '',
  name: '',
  age: 0,
  gender: '',
  birthdate: '',
  birthplace: '',
  citizenship: '',
  phone: '',
  email: '',
  address: '',
  socialmedia: {
    facebook: '',
    instagram: '',
  },
  photourl: [],
  videourl: [],
  categories: [],
  accusations: '',
  proof: [],
  userId: undefined,
};

export const AddCrud: FC = () => {
  const [data, setData] = useState<CrudCreate>(initData);
  const [errors, setErrors] = useState<ValidationError>({});
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [prev, setPrev] = useState<boolean>(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null); // State for CAPTCHA
  const [remove, setRemove] = useState(false);

  const captchaCb = (value: null | string) => {
    setCaptchaValue(value);
  };

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
    field: keyof Crud,
  ) => {
    console.log(e.target.value);

    const value = e.target.value;
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // const handleSocialMediaChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   platform: 'facebook' | 'instagram',
  // ) => {
  //   const value = e.target.value;
  //   setData((prevData) => ({
  //     ...prevData,
  //     socialmedia: {
  //       ...prevData.socialmedia,
  //       [platform]: value,
  //     },
  //   }));
  // };

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    const value = e.target.value as Categories;
    setData((prevData) => {
      const newCategories = [...prevData.categories];
      newCategories[index] = value;
      return { ...prevData, categories: newCategories };
    });
  };

  const handleAddCategory = () => {
    setData((prevData) => ({
      ...prevData,
      categories: [...prevData.categories, undefined],
    }));
  };

  const handleRemoveCategory = (index: number) => {
    setData((prevData) => ({
      ...prevData,
      categories: prevData.categories.filter((_, i) => i !== index),
    }));
  };

  const handleAddProof = () => {
    setData((prevData) => ({
      ...prevData,
      proof: [...(prevData.proof || []), { description: '', link: '' }],
    }));
  };

  const handleRemoveProof = (index: number) => {
    setData((prevData) => ({
      ...prevData,
      proof: prevData.proof?.filter((_, i) => i !== index),
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

    data.categories = data.categories.filter(
      (category) => category !== undefined,
    );

    // data.age = Number(data.age); // Убедитесь, что возраст является числом
    const result = CrudSchema.safeParse(data); // Проверка данных на валидность

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
        formData.append('captchaValue', captchaValue);
        const responseData = await createCrud(formData); // ожидание ответа от функции createCrud
        console.log(responseData);
        dispatch(showInfModal('Данные успешно отправлены на модерацию!'));
        setData(initData);
        setImages([]);
        setVideos([]);
        setPrev(!prev);
        setCaptchaValue(null);
        setRemove(!remove);
      } catch (error) {
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

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div>
          <p style={{ marginBottom: '10px' }}>Ваш id: {data?.userId}</p>
          <p style={{ marginBottom: '10px' }}>
            Если обязательные поля не известны, укажите прочерки:
            &quot;---&quot;.
          </p>
          <p style={{ marginBottom: '25px' }}>
            Первая фотография будет использована в качестве превью.
          </p>
          <ImageUpload
            setPrev={prev}
            label="Загрузить фотографию"
            onImageChange={handleImageChange}
          />
        </div>
        <div>
          <VideoUpload
            setPrev={prev}
            label="Загрузить видео"
            onVideoChange={handleVideoUpload}
          />
        </div>

        <div className={styles.grid}>
          <div className={styles.info}>
            <TextInput
              label="Имя"
              value={data.name}
              onChange={(e) => handleChange(e, 'name')}
              error={errors.name}
            />
            {/* <NumberInput
              label="Возраст"
              value={data.age}
              onChange={(e) => handleChange(e, 'age')}
              error={errors.age}
            /> */}
            <SelectInput
              label="Пол"
              value={data.gender}
              onChange={(e) => handleChange(e, 'gender')}
              options={['Женщина', 'Мужчина', 'Перфоратор']}
              error={errors.gender}
            />
            <TextInput
              label="Дата рождения"
              value={data.birthdate}
              onChange={(e) => handleChange(e, 'birthdate')}
              error={errors.birthdate}
              placeholder="YYYY-MM-DD"
            />
            <TextInput
              label="Место рождения"
              value={data.birthplace}
              onChange={(e) => handleChange(e, 'birthplace')}
              error={errors.birthplace}
            />
            <TextInput
              label="Гражданство"
              value={data.citizenship}
              onChange={(e) => handleChange(e, 'citizenship')}
              error={errors.citizenship}
            />
            <TextInput
              label="Телефон"
              value={data.phone || ''}
              onChange={(e) => handleChange(e, 'phone')}
              error={errors.phone}
              placeholder="Введите номер телефона"
            />
            <TextInput
              label="Email"
              value={data.email}
              onChange={(e) => handleChange(e, 'email')}
              error={errors.email}
            />
            <TextInput
              label="Адрес"
              value={data.address}
              onChange={(e) => handleChange(e, 'address')}
              error={errors.address}
            />
            {/* <div className={styles.socialMedia}>
              <strong>Социальные медиа:</strong>
              <SocialMediaInput
                platform="facebook"
                value={data.socialmedia?.facebook}
                onChange={(e) => handleSocialMediaChange(e, 'facebook')}
              />
              <SocialMediaInput
                platform="instagram"
                value={data.socialmedia?.instagram}
                onChange={(e) => handleSocialMediaChange(e, 'instagram')}
              />
            </div> */}
          </div>
          <div className={styles.infoLeft}>
            <h3>Категории:</h3>
            <ul>
              {data.categories.map((category, index) => {
                return (
                  <li key={index}>
                    <SelectInput
                      label={undefined}
                      value={category}
                      onChange={(e) => handleCategoryChange(e, index)}
                      options={Object.values(Categories)}
                      disabledOptions={
                        data?.categories?.filter(
                          (_, i) => i !== index && _ !== undefined,
                        ) as string[]
                      }
                    />
                    <button
                      className={styles.remove}
                      type="button"
                      onClick={() => handleRemoveCategory(index)}
                    >
                      &times;
                    </button>
                  </li>
                );
              })}
            </ul>
            <button type="button" onClick={handleAddCategory}>
              Добавить категорию
            </button>
            {errors.categories && (
              <span className="errorP">{errors.categories}</span>
            )}
            <div className={styles.infoBottom}>
              <h3>Ссылки на источники:</h3>
              <button type="button" onClick={handleAddProof}>
                Добавить источник
              </button>
              {data.proof?.map((item, index) => (
                <div key={index} className={styles.proofOption}>
                  <div>
                    <TextInput
                      label={undefined}
                      placeholder="Описание"
                      value={item.description}
                      onChange={(e) => {
                        const newProof = [...(data.proof || [])];
                        newProof[index].description = e.target.value;
                        setData((prevData) => ({
                          ...prevData,
                          proof: newProof,
                        }));
                      }}
                    />
                    <TextInput
                      label={undefined}
                      placeholder="Ссылка"
                      value={item.link}
                      onChange={(e) => {
                        const newProof = [...(data.proof || [])];
                        newProof[index].link = e.target.value;
                        setData((prevData) => ({
                          ...prevData,
                          proof: newProof,
                        }));
                      }}
                    />
                  </div>
                  <button
                    className={styles.remove}
                    type="button"
                    onClick={() => handleRemoveProof(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <p className="errorP">{errors.proof}</p>
            </div>
          </div>
        </div>
        <TextArea
          label="Описание"
          value={data.accusations}
          onChange={(e) => handleChange(e, 'accusations')}
          error={errors.accusations}
          placeholder="Обвинения"
        />
        <Captcha cb={captchaCb} remove={remove} />
        <button type="submit">Сохранить</button>
        {isMenuAuthOpen && <p className="errorP">Необходимо авторизоваться</p>}
        {!isMenuAuthOpen && backendError && (
          <p className="errorP">{backendError}</p>
        )}
      </form>
    </div>
  );
};
