// app/mraz/[id]/page.tsx
import React from 'react';
import { Metadata } from 'next';
import axios from 'axios';
import { ExtendedCrud } from '@/types/Crud';
import { ProfileCrud } from '@/components/containers/profileCrud/profileCrud';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/';

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const response = await axios.get<ExtendedCrud>(
      `${API}api/cruds/search-by-name?translit_name=${params.id}`,
    );
    const profile = response.data;

    const imageUrl =
      profile.photourl.length > 0
        ? `${API}${profile.photourl[0]}`
        : `${API}icon2.png`;

    return {
      title: profile.name
        ? `${profile.name} ${profile.categories[1] ? profile.categories[1] : ''} | Реестр русофобов`
        : 'Реестр русофобов',
      description: `Актуальная информация о ${profile.name} в реестре русофобов. Узнайте последние факты и доказательства. Присоединяйтесь к проекту по борьбе с русофобией!`,

      // Open Graph (Facebook, VK)
      openGraph: {
        type: 'article',
        title: profile.name
          ? `${profile.name} ${profile.categories[1] ? profile.categories[1] : ''} | Реестр русофобов`
          : 'Реестр русофобов',
        description: `Информация о ${profile.name} в реестре русофобов. Узнайте последние факты и доказательства. Присоединяйтесь к проекту по борьбе с русофобией!`,
        url: `https://reestr-rusofobov.ru/mraz/${profile.id}`,
        images: [
          {
            url: imageUrl,
            width: 245,
            height: 245,
            alt: `${profile.name} фото` || 'Реестр русофобов фото русофоба',
          },
        ],
        siteName: 'Реестр русофобов',
      },

      // Twitter Card (Twitter)
      twitter: {
        card: 'summary_large_image',
        title: profile.name
          ? `${profile.name} ${profile.categories[1] ? profile.categories[1] : ''} | Реестр русофобов`
          : 'Реестр русофобов',
        description: `Информация о ${profile.name} в реестре русофобов. Узнайте последние факты и доказательства. Присоединяйтесь к проекту по борьбе с русофобией!`,
        images: [imageUrl],
      },

      // Мета-теги для соцсетей и поисковиков
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.log('Ошибка при генерации метаданных:', error);
    console.error('Ошибка при генерации метаданных:', error);
    // Возвращаем общие метаданные, если произошла ошибка
    return {
      title: 'Реестр русофобов',
      description:
        'Информация о лицах и организациях, распространяющих русофобию',
      openGraph: {
        type: 'website',
        title: 'Реестр русофобов',
        description:
          'Информация о лицах и организациях, распространяющих русофобию',
        url: 'https://reestr-rusofobov.ru',
        siteName: 'Реестр русофобов',
        images: [
          {
            url: `${API}icon2.png`, // Используем изображение по умолчанию
            width: 256,
            height: 256,
            alt: 'Реестр русофобов - изображение',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Реестр русофобов',
        description:
          'Информация о лицах и организациях, распространяющих русофобию',
        images: [`${API}icon2.png`], // Используем изображение по умолчанию
      },
    };
  }
}

const MrazPage: React.FC<PageProps> = async ({ params }) => {
  // Передаем ID в клиентский компонент
  return <ProfileCrud id={params.id} />;
};

export default MrazPage;
