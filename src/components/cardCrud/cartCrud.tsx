import React, { FC } from 'react';
import Image from 'next/image';
import styles from './cartCrud.module.scss';
import { truncateString } from '@/utils/truncate';
import { ExtendedCrud } from '@/types/Crud';
import Link from 'next/link';
import AdminButton from '../adminButton/adminButton';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/';

export const CartCrud: FC<ExtendedCrud> = ({
  name,
  photourl,
  categories,
  accusations,
  id,
  active,
}) => {
  return (
    <div className={styles.card}>
      {/* Фото и имя */}
      <div className={styles.header}>
        <div className={styles.photoContainer}>
          <Image
            src={`${API}${photourl[0]}`}
            alt={`${name}'s photo`}
            width={100}
            height={100}
            className={styles.photo}
            objectFit="cover"
          />
        </div>
        <h2>{name}</h2>
      </div>

      {/* Категории и обвинения */}
      <section className={styles.info}>
        <div className={styles.infoCategory}>
          <strong>Категории: </strong>
          <ul>
            {categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </div>

        <p>{truncateString(accusations, 150)}</p>
      </section>
      <div className={styles.cardSeparator}></div>
      {/* Кнопка "Подробнее" */}
      <div className={styles.buttonContainer}>
        <Link href={`/mraz/${id}`} className={styles.detailsButton}>
          Подробнее
        </Link>
        <AdminButton type="crud" id={id} confirm={!active} deleteB={true} />
      </div>
    </div>
  );
};
