'use client';

import React, { FC, useEffect, useState } from 'react';
import styles from './profileDisput.module.scss'; // Обновите имя файла стилей
import axios from 'axios';
import AdminButton from '../adminButton/adminButton';
import Carousel from '../../UI/carusel/Carusel';
import PrevLineContent from '../../UI/prevLineImg/prevLineContent';
import { Disput } from '@/types/disput';
import { getItem } from '@/utils/localStorageUtils';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '@/hooks/ReduxHooks';
import { useCheckAdmin } from '@/hooks/userHooks';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/';

export const ProfileDisput: FC<{ id: string }> = ({ id }) => {
  const [disput, setDisput] = useState<Disput>(); // Изменили тип состояния на Disput
  const [loading, setLoading] = useState(true);
  const { isOpen } = useAppSelector((state) => state.authAndRegForm);

  const admin = useCheckAdmin(isOpen);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getItem('user');
        const response = await axios.get(`${API}api/disput/${id}`, {
          headers: {
            'Content-Type': 'multipart/form-data', // Установите заголовок для FormData
            Authorization: `Bearer ${token?.token}`,
          },
        }); // Обновите API, чтобы получать диспуты
        setDisput(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    console.log(disput);
  }, [disput]);

  if (loading) return <div>Загрузка...</div>;

  if (!disput) {
    return <div className="errorP">Запись не найдена</div>;
  }

  const mediaItems = [
    ...disput.images.map((image) => ({
      src: `${API}${image}`,
      type: 'image' as const,
    })),
    ...disput.videos.map((video) => ({
      src: `${API}${video}`,
      type: 'video' as const,
    })),
  ];

  return (
    <div className={styles.container}>
      {disput.images.length > 1 ? (
        <Carousel images={disput.images} />
      ) : (
        <Image
          key={disput.images[0]}
          src={`${API}${disput.images[0]}`}
          alt={`${disput.images}'s photo`}
          className={styles.photo}
          style={{ objectFit: 'cover' }}
          width={250}
          height={250}
          quality={100}
        />
      )}

      <div className={styles.grid}>
        <div className={styles.info}>
          <h2>Диспут ID: {disput.id}</h2>
          <p>
            <strong>ID - записи:</strong>
            <Link
              href={`/mraz/${disput.id_crud}`}
              className={styles.detailsButton}
            >
              Запись
            </Link>
          </p>
          <p>
            <strong>ID пользователя:</strong> {disput.id_user}
          </p>
          <p>
            <strong>Статус:</strong> {disput.status}
          </p>
          <p>
            <strong>Описание:</strong> <p>{disput.description}</p>
          </p>
        </div>
      </div>
      <PrevLineContent items={mediaItems} />
      <AdminButton
        confirm={false} // Проверяем статус диспута
        deleteB={true}
        type="dispute"
        id={id}
        admin={admin}
      />
    </div>
  );
};
