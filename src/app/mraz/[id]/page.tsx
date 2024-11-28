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
      `${API}api/cruds/${params.id}`,
    );
    const profile = response.data;
    return {
      title: profile.name
        ? `${profile.name} - Реестр русофобов`
        : 'Реестр русофобов',
      description:
        profile.accusations ||
        'Информация о лицах и организациях, распространяющих русофобию',
      openGraph: {
        type: 'article',
        title: profile.name || 'Реестр русофобов',
        description:
          profile.accusations ||
          'Информация о лицах и организациях, распространяющих русофобию',
        url: `https://reestr-rusofobov.ru/mraz/${profile.id}`,
        images: [
          {
            url:
              profile.photourl.length > 0
                ? `${API}${profile.photourl[0]}`
                : '/default-image.jpg',
            width: 800,
            height: 600,
            alt: profile.name || 'Реестр русофобов',
          },
        ],
        siteName: 'Реестр русофобов',
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
      },
    };
  }
}

const MrazPage: React.FC<PageProps> = async ({ params }) => {
  // Передаем ID в клиентский компонент
  return <ProfileCrud id={params.id} />;
};

export default MrazPage;
