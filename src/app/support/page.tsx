import React from 'react';
import style from './support.module.scss'; // Импорт стилей
import { Metadata } from 'next';
import { API } from '@/variable/Api';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Поддержка проекта: борьба с русофобией в 2025 году | Реестр русофобов',
  description:
    'Поддержите наш проект по борьбе с русофобией в 2025 году. Узнайте, как помочь в разоблачении русофобов и поддержать развитие Реестра русофобов. Ваша помощь важна!',
  keywords:
    'поддержка проекта, борьба с русофобией 2025, реестр русофобов, финансовая помощь, разоблачение русофобов, как помочь проекту, поддержать реестр русофобов',
  authors: {
    url: 'https://reestr-rusofobov.ru',
    name: 'Реестр русофобов',
  },

  // Open Graph метаданные для соцсетей (например, Facebook, VK)
  openGraph: {
    type: 'website',
    title:
      'Поддержка проекта: борьба с русофобией в 2025 году | Реестр русофобов',
    description:
      'Поддержите наш проект по борьбе с русофобией в 2025 году. Узнайте, как помочь в разоблачении русофобов и поддержать развитие Реестра русофобов. Ваша помощь важна!',
    url: 'https://reestr-rusofobov.ru/support', // Убедитесь, что URL правильный
    images: [
      {
        url: `${API}icon2.png`, // Замените на изображение для соцсетей
        width: 256,
        height: 256,
        alt: 'Реестр русофобов - поддержка проекта в 2025 году',
      },
    ],
    siteName: 'Реестр русофобов',
  },

  // Twitter Card метаданные
  twitter: {
    card: 'summary_large_image',
    title:
      'Поддержка проекта: борьба с русофобией в 2025 году | Реестр русофобов',
    description:
      'Поддержите наш проект по борьбе с русофобией в 2025 году. Узнайте, как помочь в разоблачении русофобов и поддержать развитие Реестра русофобов. Ваша помощь важна!',
    images: [`${API}icon2.png`], // Замените на реальное изображение, если необходимо
  },

  // Метатеги для поисковиков
  robots: {
    index: true,
    follow: true,
  },
};

const SupportPage: React.FC = () => {
  const email = process.env.NEXT_PUBLIC_EMAIL; // Получаем email из переменной окружения
  return (
    <main className={style.main}>
      <header className={style.header}>
        <h1>Поддержите наш проект по борьбе с русофобией в 2025 году</h1>
      </header>
      <section className={style.section}>
        <p>
          Наш проект — это независимая инициатива, направленная на борьбу с
          русофобией и разоблачение её активистов. Мы не получаем финансирования
          от государственных или коммерческих организаций, поэтому ваша
          поддержка крайне важна для нас.
        </p>
        <p>Ваша помощь позволит нам:</p>
        <ul>
          <li>Развивать платформу и добавлять новые материалы.</li>
          <li>Обеспечивать безопасность и стабильность сайта.</li>
          <li>Продолжать разоблачать русофобов и их действия.</li>
        </ul>
        <p>
          Если вы хотите поддержать наш проект, вы можете сделать пожертвование
          через криптовалюту. Каждый ваш вклад помогает нам двигаться вперёд.
        </p>

        {/* Блок с криптовалютой */}
        <div className={style.donationBlock}>
          <h2>Поддержать проект через криптовалюту</h2>
          <p>
            Мы принимаем пожертвования в Bitcoin. Ваша поддержка поможет нам
            продолжать борьбу с русофобией.
          </p>
          <div className={style.bitcoinInfo}>
            <h3>BTC кошелек:</h3>
            <p className={style.bitcoinAddress}>
              bc1qphtkk4jhxrar09ujntmzlw66vjhe3pu4vl3fpw
            </p>
            <a href="https://qr.crypt.bot/?url=bc1qphtkk4jhxrar09ujntmzlw66vjhe3pu4vl3fpw">
              <img
                src="https://qr.crypt.bot/?url=bc1qphtkk4jhxrar09ujntmzlw66vjhe3pu4vl3fpw"
                alt="QR-код для пожертвования в Bitcoin фото"
                title="QR-код для пожертвования в Bitcoin"
                className={style.qrCode}
                loading="lazy"
              />
            </a>
          </div>
        </div>

        {/* Призыв к действию */}
        <div className={style.ctaBlock}>
          <h2>Как ещё можно помочь?</h2>
          <p>
            Если у вас нет возможности сделать пожертвование, вы можете помочь
            нам другими способами:
          </p>
          <ul>
            <li>Расскажите о нашем проекте в социальных сетях.</li>
            <li>
              Поделитесь информацией о{' '}
              <Link href="/reestr" className={style.link}>
                реестре русофобов
              </Link>
              .
            </li>
            <li>
              Сообщите о случаях русофобии через{' '}
              <Link href="/sendData" className={style.link}>
                форму обратной связи
              </Link>
              .
            </li>
          </ul>
        </div>

        {/* Контакты */}
        <div className={style.contacts}>
          <h2>Свяжитесь с нами</h2>
          <p>
            Если у вас есть вопросы или предложения, напишите нам на почту:
            <a href={`mailto:${email}`} className={style.link}>
              {email}
            </a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SupportPage;
