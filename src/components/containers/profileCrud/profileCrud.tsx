'use client';

import React, { FC, useEffect, useState } from 'react';
import styles from './profileCrud.module.scss';
import axios from 'axios';
import { dateUtils } from '@/utils/dateUtils';
import AdminButton from '../adminButton/adminButton';
import { ExtendedCrud } from '@/types/Crud';
import Carousel from '../../UI/carusel/Carusel';
import PrevLineContent from '../../UI/prevLineImg/prevLineContent';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '@/hooks/ReduxHooks';
import { useCheckAdmin } from '@/hooks/userHooks';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/';

interface Item {
  src: string;
  type: 'image' | 'video'; // Литеральные строки для типов
}

export const ProfileCrud: FC<{ id: string }> = ({ id }) => {
  const [profile, setCruds] = useState<ExtendedCrud>();
  const [loading, setLoading] = useState(true);
  const { isOpen } = useAppSelector((state) => state.authAndRegForm);

  const admin = useCheckAdmin(isOpen);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API}api/cruds/search-by-name?translit_name=${id}`,
        );
        setCruds(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // useEffect(() => {
  //   console.log(profile);
  // }, [profile]);

  if (loading) return <div>Загрузка...</div>;

  if (!profile) {
    return <div className="errorP">Запись не найдена</div>;
  }

  const mediaItems: Item[] = [
    ...profile.photourl.map((photo) => ({
      src: `${API}${photo}`,
      type: 'image' as const,
    })), // Добавляем 'as const' для строгой типизации
    ...profile.videourl.map((video) => ({
      src: `${API}${video}`,
      type: 'video' as const,
    })),
  ];

  return (
    <>
      <div className={styles.container}>
        {profile.parent_id && (
          <Link href={`/mraz/${profile.parent_id}`}>Оригинальная запись</Link>
        )}
        {profile.active && (
          <Link href={`/editData/${id}`}>Отредактировать</Link>
        )}
        {/* {profile.photourl.map((photo) => (
        <Image
          key={photo}
          src={`${API}${photo}`}
          alt={`${profile.name}'s photo`}
          className={styles.photo}
          style={{ objectFit: 'cover' }}
          width={250}
          height={250}
          quality={100}
        />
      ))} */}
        {profile.photourl.length > 1 ? (
          <Carousel
            images={profile.photourl}
            meta={profile?.name ? profile?.name : 'default'}
          />
        ) : (
          <Image
            key={profile.photourl[0]}
            src={`${API}${profile.photourl[0]}`}
            alt={`${profile.name} фото`}
            title={`${profile.name}`}
            className={styles.photo}
            style={{ objectFit: 'cover' }}
            width={250}
            height={250}
            quality={100}
          />
        )}
        {/* <PrevLineContent /> */}
        {/* {profile.videourl.map((video) => (
        <video
          src={`${API}${video}`}
          controls
          width={100}
          key={video}
          height={100}
          className={styles.preview}
        />
      ))} */}
        <div className={styles.grid}>
          <div className={styles.info}>
            <h2>{profile?.name}</h2>
            <p>
              <strong>ID:</strong> {profile?.id}
            </p>
            {/* <p>
            <strong>Возраст:</strong> {profile?.age}
          </p> */}
            <p>
              <strong>Пол:</strong> {profile?.gender}
            </p>
            <p>
              <strong>Дата рождения:</strong>{' '}
              {profile?.birthdate
                ? dateUtils.formatDate(dateUtils.parseDate(profile?.birthdate))
                : ''}
            </p>
            <p>
              <strong>Место рождения:</strong> {profile?.birthplace}
            </p>
            <p>
              <strong>Гражданство:</strong> {profile?.citizenship}
            </p>
            <p>
              <strong>Телефон:</strong> {profile?.phone}
            </p>
            <p>
              <strong>Email:</strong> {profile?.email}
            </p>
            <p>
              <strong>Адрес:</strong> {profile?.address}
            </p>
            {/* <div className={styles.socialMedia}>
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
          </div> */}
          </div>
          <div className={styles.infoLeft}>
            <h3>Категории:</h3>
            <ul>
              {profile?.categories?.map((category) => (
                <li key={category}>{category}</li>
              ))}
            </ul>
            <h3>Источники:</h3>
            {profile.proof &&
              profile.proof.length > 0 &&
              profile.proof.map((proof) => (
                <li key={proof.link}>
                  <a
                    href={proof.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {proof.description}
                  </a>
                </li>
              ))}
          </div>
        </div>
        <PrevLineContent
          items={mediaItems}
          meta={profile?.name ? profile?.name : 'default'}
        />
        <div className={styles.infoBottom}>
          <h3>Описание:</h3>
          <p>{profile?.accusations}</p>
        </div>
        <AdminButton
          confirm={!profile?.active}
          deleteB={true}
          type={profile?.parent_id ? 'crud-edit' : 'crud'}
          id={id}
          admin={admin}
        />
      </div>
    </>
  );
};
