import React, { FC, useCallback, useEffect, useState } from 'react';
import styles from './editCrud.module.scss';
import { Crud, CrudCreate, CrudSchema } from '@/types/Crud';
import { Categories } from '@/types/enumCategory';
import TextInput from '../../UI/textInputForm/textInputForm';
// import NumberInput from '../UI/numberInputForm/numberInputForm';
import SelectInput from '../../UI/selectInputForm/selectInputForm';
import TextArea from '../../UI/textAreaForm/textAreaForm';
// import SocialMediaInput from '../UI/socialMediaInputForm/socialMediaInputForm';
import ImageUpload from '../../UI/ImageUpload/imageUpload';
import { submitEditForReview } from '@/services/crudServices';
import { useCheckToken } from '@/hooks/userHooks';
import { showInfModal } from '@/store/UISlices/infModalSlice';
import { useAppDispatch } from '@/hooks/ReduxHooks';
import { getItem } from '@/utils/localStorageUtils';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '@/services/authService';
import VideoUpload from '../../UI/videoUpload/videoUpload';

import {
  handleChange,
  handleCategoryChange,
  handleAddCategory,
  handleRemoveCategory,
  handleAddProof,
  handleRemoveProof,
} from './eventHandlers';
import OldImage from './components/oldImage';
import OldVideo from './components/oldVideo';
import { Captcha } from '../captcha/captcha';
import RoundToggle from '@/components/UI/roundToggle/RoundToggle';
import { User } from '@/types/user';

type ValidationError = Record<string, string>;

export const EditCrud: FC<{ initProp: CrudCreate; id: string }> = ({
  initProp,
  id,
}) => {
  const [data, setData] = useState<CrudCreate>(initProp);
  const [errors, setErrors] = useState<ValidationError>({});
  const [images, setImages] = useState<(File | string)[]>([]); // State to store uploaded images
  const [videos, setVideos] = useState<(File | string)[]>([]); // State to store uploaded images
  const [backendError, setBackendError] = useState<string | null>(null);
  const [prev, setPrev] = useState<boolean>(false);
  const [oldImages, setOldImages] = useState<string[]>(data.photourl);
  const [oldVideos, setOldVideos] = useState<string[]>(data.videourl);

  const [captchaValue, setCaptchaValue] = useState<string | null>(null); // State for CAPTCHA
  const [remove, setRemove] = useState(false);

  const [stateFetch, setStateFetch] = useState(false);

  const captchaCb = (value: null | string) => {
    setCaptchaValue(value);
  };

  const removeOldImage = (index: number) => {
    setOldImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeOldVideo = (index: number) => {
    setOldVideos((prev) => prev.filter((_, i) => i !== index));
  };

  const isMenuAuthOpen = useCheckToken();

  const dispatch = useAppDispatch();

  const handleChangeWrapped = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
      field: keyof Crud,
    ) => {
      handleChange(setData)(e, field);
    },
    [],
  );

  // const handleSocialMediaChangeWrapped = useCallback(
  //   (
  //     e: React.ChangeEvent<HTMLInputElement>,
  //     platform: 'facebook' | 'instagram',
  //   ) => {
  //     handleSocialMediaChange(setData)(e, platform);
  //   },
  //   [],
  // );

  const handleCategoryChangeWrapped = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
      handleCategoryChange(setData)(e, index);
    },
    [],
  );

  const handleAddCategoryWrapped = useCallback(() => {
    handleAddCategory(setData)();
  }, []);

  const handleRemoveCategoryWrapped = useCallback((index: number) => {
    handleRemoveCategory(setData)(index);
  }, []);

  const handleAddProofWrapped = useCallback(() => {
    handleAddProof(setData)();
  }, []);

  const handleRemoveProofWrapped = useCallback((index: number) => {
    handleRemoveProof(setData)(index);
  }, []);

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
        userId: decodeTokenUser.id,
      }));
    }
  }, []);

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

      images.forEach((photo) => {
        formData.append('photourls', photo);
      });

      formData.append('existingPhotoUrls', JSON.stringify(oldImages));

      videos.forEach((video) => {
        formData.append('videourls', video);
      });

      formData.append('existingVideoUrls', JSON.stringify(oldVideos));

      try {
        setStateFetch(true);
        formData.append('captchaValue', captchaValue);
        const responseData = await submitEditForReview(id, formData); // ожидание ответа от функции createCrud
        setStateFetch(false);
        console.log(responseData);
        dispatch(showInfModal('Данные успешно отправлены на модерацию!'));
        setData(initProp);
        setImages([]);
        setVideos([]);
        setPrev(!prev);
        setCaptchaValue(null);
        setRemove(!remove);
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

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div>
          <p style={{ marginBottom: '10px' }}>
            Если обязательные поля не известны, укажите прочерки:
            &quot;---&quot;.
          </p>
          <p style={{ marginBottom: '25px' }}>
            Первая фотография будет использована в качестве превью.
          </p>
          <div>
            <h2>Старые видео и фото</h2>
            <div className={styles.oldImageContainer}>
              {oldImages.map((imageUrl, index) => (
                <OldImage
                  key={imageUrl}
                  imageUrl={imageUrl}
                  onRemove={() => removeOldImage(index)}
                />
              ))}
            </div>
            <div className={styles.oldVideoContainer}>
              {oldVideos.map((videoUrl, index) => (
                <OldVideo
                  key={videoUrl}
                  videoUrl={videoUrl}
                  onRemove={() => removeOldVideo(index)}
                />
              ))}
            </div>
          </div>
          <ImageUpload
            lengthOldImage={oldImages?.length}
            setPrev={prev}
            label="Загрузить фотографию"
            onImageChange={handleImageChange}
          />
        </div>
        <div>
          <VideoUpload
            lengthOldVideo={oldVideos?.length}
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
              onChange={(e) => handleChangeWrapped(e, 'name')}
              error={errors.name}
              placeholder="Имя фамилия"
            />
            {/* <NumberInput
              label="Возраст"
              value={data.age}
              onChange={(e) => handleChangeWrapped(e, 'age')}
              error={errors.age}
            /> */}
            <SelectInput
              label="Пол"
              value={data.gender}
              onChange={(e) => handleChangeWrapped(e, 'gender')}
              options={['Женщина', 'Мужчина', 'Перфоратор']}
              error={errors.gender}
            />
            <TextInput
              label="Дата рождения"
              value={data.birthdate}
              onChange={(e) => handleChangeWrapped(e, 'birthdate')}
              error={errors.birthdate}
              placeholder="ГГГГ-MM-ДД"
            />
            <TextInput
              label="Место рождения"
              value={data.birthplace}
              onChange={(e) => handleChangeWrapped(e, 'birthplace')}
              error={errors.birthplace}
              placeholder="Город, страна"
            />
            <TextInput
              label="Гражданство"
              value={data.citizenship}
              onChange={(e) => handleChangeWrapped(e, 'citizenship')}
              error={errors.citizenship}
              placeholder="Гражданства"
            />
            <TextInput
              label="Телефон"
              value={data.phone || ''}
              onChange={(e) => handleChangeWrapped(e, 'phone')}
              error={errors.phone}
              placeholder="+ХХХХХХХХХХ"
            />
            <TextInput
              label="Email"
              value={data.email}
              onChange={(e) => handleChangeWrapped(e, 'email')}
              error={errors.email}
              placeholder="email@gmail.com"
            />
            <TextInput
              label="Адрес"
              value={data.address}
              onChange={(e) => handleChangeWrapped(e, 'address')}
              error={errors.address}
              placeholder="Местонахождение цели"
            />
            {/* <div className={styles.socialMedia}>
              <strong>Социальные медиа:</strong>
              <SocialMediaInput
                platform="facebook"
                value={data.socialmedia?.facebook}
                onChange={(e) => handleSocialMediaChangeWrapped(e, 'facebook')}
              />
              <SocialMediaInput
                platform="instagram"
                value={data.socialmedia?.instagram}
                onChange={(e) => handleSocialMediaChangeWrapped(e, 'instagram')}
              />
            </div> */}
            <div className={styles.toggleContainer}>
              <label>Есть ли персональные данные:</label>
              <RoundToggle
                value={data.personaldata}
                onChange={(value) =>
                  setData((prevData) => ({
                    ...prevData,
                    personaldata: value,
                  }))
                }
              />
            </div>
          </div>
          <div className={styles.infoLeft}>
            <h3>Категории:</h3>
            <ul>
              {data.categories.map((category, index) => (
                <li key={index}>
                  <SelectInput
                    label={undefined}
                    value={category}
                    onChange={(e) => handleCategoryChangeWrapped(e, index)}
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
                    onClick={() => handleRemoveCategoryWrapped(index)}
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" onClick={handleAddCategoryWrapped}>
              Добавить категорию
            </button>
            {errors.categories && (
              <span className="errorP">{errors.categories}</span>
            )}
            <div className={styles.infoBottom}>
              <h3>Ссылки на источники:</h3>
              <button type="button" onClick={handleAddProofWrapped}>
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
                    onClick={() => handleRemoveProofWrapped(index)}
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
          onChange={(e) => handleChangeWrapped(e, 'accusations')}
          error={errors.accusations}
          placeholder="Обвинения"
        />
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
