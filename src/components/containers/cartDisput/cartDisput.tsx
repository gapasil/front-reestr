import React, { FC } from 'react';
import Image from 'next/image';
import styles from './cartDisput.module.scss';
import { truncateString } from '@/utils/truncate';
import Link from 'next/link';
import AdminButton from '../adminButton/adminButton';
import { Disput } from '@/types/disput';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/';

export const CartDisput: FC<Disput> = ({
  id,
  id_crud,
  id_user,
  images,
  description,
  admin,
}) => {
  return (
    <div className={styles.card}>
      {/* Изображение и описание диспута */}
      <div className={styles.header}>
        {images.length > 0 && (
          <div className={styles.photoContainer}>
            <Image
              src={`${API}${images[0]}`} // Используйте первое изображение
              alt={`${description}'s image`} // Альтернативный текст
              width={250}
              height={250}
              quality={100}
              className={styles.photo}
              style={{ objectFit: 'cover' }} // Используйте стиль для объекта
            />
          </div>
        )}
        <h2>{truncateString(description, 50)}</h2>{' '}
        {/* Т truncat строки для показа */}
      </div>

      {/* Статус диспута */}
      <section className={styles.infoLink}>
        <strong>Id статьи: </strong>
        <Link href={`/mraz/${id_crud}`} className={styles.link}>
          Запись
        </Link>
      </section>

      <section className={styles.infoLink}>
        <strong>Id юзера: </strong>
        <p>{id_user}</p>
      </section>

      {/* Кнопка "Подробнее" */}
      <div className={styles.buttonContainer}>
        <Link href={`/disputeProfile/${id}`} className={styles.detailsButton}>
          Подробнее
        </Link>
        <AdminButton
          type="dispute"
          id={id}
          confirm={false}
          deleteB={true}
          admin={admin}
        />
      </div>
    </div>
  );
};
