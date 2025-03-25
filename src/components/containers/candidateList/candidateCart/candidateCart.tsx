import React, { FC } from 'react';
import styles from './candidateCart.module.scss';
import { CandidateType } from '@/types/candidate';
import AdminButton from '../../adminButton/adminButton';

export const CandidateCart: FC<CandidateType> = ({
  name,
  description,
  links,
  id,
  admin,
}) => {
  return (
    <div className={styles.card}>
      {/* Фото и имя */}
      <div className={styles.header}>
        <h2>{name}</h2>
      </div>

      {/* Категории и обвинения */}
      <section className={styles.info}>
        <p>{description}</p>
      </section>
      <section className={styles.infoLeft}>
        <h3>Источники:</h3>
        {links &&
          links.length > 0 &&
          links.map((proof, index) => (
            <li key={`${proof}${index}`}>
              <a href={proof} target="_blank" rel="noopener noreferrer">
                {proof}
              </a>
            </li>
          ))}
      </section>
      <div className={styles.cardSeparator}></div>
      {/* Кнопка "Подробнее" */}
      <div className={styles.buttonContainer}>
        <AdminButton
          type="candidate"
          id={id}
          confirm={false}
          deleteB={true}
          admin={admin}
        />
      </div>
    </div>
  );
};
