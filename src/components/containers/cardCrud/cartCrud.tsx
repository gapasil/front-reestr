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
  admin,
  translit_name,
}) => {
  return (
    <article className={styles.card}>
      {/* Фото и имя */}
      <section className={styles.header}>
        <div className={styles.photoContainer}>
          {photourl.length > 0 && (
            <Image
              src={`${API}${photourl[0]}`}
              alt={`${name} фото`}
              title={`${name} ${categories[0]}`}
              width={250}
              height={250}
              quality={100}
              className={styles.photo}
              objectFit="cover"
            />
          )}
        </div>
        <h2>{name}</h2>
      </section>

      {/* Категории и обвинения */}
      <section className={styles.info}>
        <div className={styles.infoCategory}>
          <strong>Категории: </strong>
          <ul>
            {categories.map((category, index) => {
              if (index < 2) {
                return <li key={category}>{category}</li>;
              }
              return null;
            })}
            {categories.length > 2 ? (
              <details>
                <summary>
                  <span>Больше категорий</span>
                  <span className={styles.arrowDrop}></span>
                </summary>
                <ul className={styles.detailsCata}>
                  {categories.map((category, index) => {
                    if (index >= 2) {
                      return <li key={category}>{category}</li>;
                    }
                    return null;
                  })}
                </ul>
              </details>
            ) : (
              <></>
            )}
          </ul>
        </div>

        <p className={styles.accusationsText}>
          {truncateString(accusations, 150)}
        </p>
      </section>
      <div className={styles.cardSeparator}></div>
      {/* Кнопка "Подробнее" */}
      <section className={styles.buttonContainer}>
        <Link href={`/mraz/${translit_name}`} className={styles.detailsButton}>
          Подробнее
        </Link>
        <AdminButton
          type="crud"
          id={id}
          confirm={false}
          deleteB={true}
          admin={admin}
        />
      </section>
    </article>
  );
};
