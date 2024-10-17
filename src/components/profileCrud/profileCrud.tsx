'use client';

import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './profileCrud.module.scss';
import { autoReload } from '@/utils/autoReload';
import axios from 'axios';
import { dateUtils } from '@/utils/dateUtils';
import AdminButton from '../adminButton/adminButton';
import { ExtendedCrud } from '@/types/Crud';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/';

export const ProfileCrud: FC<{ id: string }> = ({ id }) => {
  const [profile, setCruds] = useState<ExtendedCrud>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}api/cruds/${id}`);
        setCruds(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API, id]);

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  if (loading) return <div>Загрузка...</div>;

  if (!profile) {
    autoReload();
    return <div className="errorP">Пользователь не найден</div>;
  }

  return (
    <div className={styles.container}>
      {profile.photourl.map((photo, index) => (
        <Image
          key={photo}
          src={`${API}${photo}`}
          alt={`${profile.name}'s photo`}
          width={100}
          height={100}
          className={styles.photo}
          style={{ objectFit: 'cover' }}
        />
      ))}
      {profile.videourl.map((video, index) => (
        <video
          src={`${API}${video}`}
          controls
          width={100}
          key={video}
          height={100}
          className={styles.preview}
        />
      ))}
      <div className={styles.grid}>
        <div className={styles.info}>
          <h2>{profile.name}</h2>
          <p>
            <strong>ID:</strong> {profile.id}
          </p>
          <p>
            <strong>Возраст:</strong> {profile.age}
          </p>
          <p>
            <strong>Пол:</strong> {profile.gender}
          </p>
          <p>
            <strong>Дата рождения:</strong>{' '}
            {profile.birthdate
              ? dateUtils.formatDate(dateUtils.parseDate(profile.birthdate))
              : ''}
          </p>
          <p>
            <strong>Место рождения:</strong> {profile.birthplace}
          </p>
          <p>
            <strong>Гражданство:</strong> {profile.citizenship}
          </p>
          <p>
            <strong>Телефон:</strong> {profile.phone}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Адрес:</strong> {profile.address}
          </p>
          <div className={styles.socialMedia}>
            {profile.socialmedia?.facebook && (
              <a
                href={profile.socialmedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            )}
            {profile.socialmedia?.instagram && (
              <a
                href={profile.socialmedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            )}
          </div>
        </div>
        <div className={styles.infoLeft}>
          <h3>Категории:</h3>
          <ul>
            {profile.categories.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
          <h3>Источники:</h3>
          {profile.proof?.map((proof) => (
            <li key={proof.link}>
              <a href={proof.link} target="_blank" rel="noopener noreferrer">
                {proof.description}
              </a>
            </li>
          ))}
        </div>
      </div>
      <div className={styles.infoBottom}>
        <h3>Описание:</h3>
        <p>{profile.accusations}</p>
      </div>
      <AdminButton
        confirm={!profile.active}
        deleteB={true}
        type="crud"
        id={id}
      />
    </div>
  );
};
