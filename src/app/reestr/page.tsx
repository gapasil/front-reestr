import React from 'react';
import { Metadata } from 'next';
import Reestr from '@/components/containers/reestrMainPage/reestr';
import { API } from '@/variable/Api';

export const metadata: Metadata = {
  title:
    'Кто такие русофобы в 2025 году? Список и разоблачение | Реестр русофобов',
  description:
    'Узнайте, кто такие русофобы в 2025 году, их список и причины ненависти к русским. Примеры русофобии и её последствия для общества. Присоединяйтесь к борьбе за правду и справедливость!',
  keywords:
    'русофобы 2025, кто такие русофобы, список русофобов, причины русофобии, примеры русофобии, борьба с русофобией, реестр русофобов, антироссийские деятели, разоблачение русофобов',
  authors: {
    url: 'https://reestr-rusofobov.ru',
    name: 'Реестр русофобов',
  },

  // Open Graph Meta Tags (для Facebook, VK и других)
  openGraph: {
    title:
      'Кто такие русофобы в 2025 году? Список и разоблачение | Реестр русофобов',
    description:
      'Узнайте, кто такие русофобы в 2025 году, их список и причины ненависти к русским. Примеры русофобии и её последствия для общества. Присоединяйтесь к борьбе за правду и справедливость!',
    url: 'https://reestr-rusofobov.ru', // Укажите правильный URL вашего сайта
    siteName: 'Реестр русофобов',
    images: [
      {
        url: `${API}icon2.png`, // Замените на изображение для соцсетей
        width: 256,
        height: 256,
        alt: 'Реестр русофобов - борьба с русофобией в 2025 году',
      },
    ],
  },

  // Twitter Card Meta Tags
  twitter: {
    card: 'summary_large_image', // Тип карточки
    title:
      'Кто такие русофобы в 2025 году? Список и разоблачение | Реестр русофобов',
    description:
      'Узнайте, кто такие русофобы в 2025 году, их список и причины ненависти к русским. Примеры русофобии и её последствия для общества. Присоединяйтесь к борьбе за правду и справедливость!',
    images: [`${API}icon2.png`], // Замените на изображение для Twitter
  },
};

const Page: React.FC = () => {
  // const email = process.env.NEXT_PUBLIC_EMAIL; // Получаем email из переменной окружения
  // const telegram = process.env.NEXT_PUBLIC_TELEGRAM; // Получаем Telegram из переменной окружения
  return <Reestr />;
};

export default Page;
