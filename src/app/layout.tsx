'use client';

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from '@/store/store';
import '@/styles/globals.scss';
import '@/styles/layout.scss';
import { Header } from '@/components/header/header';
import { MainSideMenu } from '@/components/mainSideMenu/mainSideMenu';
import { Footer } from '@/components/footer/footer';
import AuthForm from '@/components/authForm/authForm';
import InfModal from '@/components/UI/infModal/infModal';
import Head from 'next/head';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    // Функция для отслеживания изменения размера окна
    const handleResize = () => {
      setIsMobile(window.innerWidth < 780);
    };

    // Устанавливаем начальное значение
    handleResize();

    // Подписываемся на изменение размера окна
    window.addEventListener('resize', handleResize);

    // Убираем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <title>Реестр русофобов - Узнайте о текущем списке</title>
        <meta
          name="description"
          content="Реестр русофобов — информация о текущем списке. Узнайте больше на нашем сайте."
        />
        <meta
          name="keywords"
          content="реестр, русофобы, список, информация, реестр русофобов"
        />
        <meta name="author" content="gapasil" />
      </Head>
      <html lang="ru">
        <body>
          <InfModal />
          <AuthForm />
          <Header />
          <main className="container-layout">
            {!isMobile && <MainSideMenu />}
            <div className="content-layout">{children}</div>
            <div
              className="block-donate"
              style={{
                maxWidth: '160px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <h3 style={{ margin: '0px' }}>Поддержать проект:</h3>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
              >
                <h3>BTC кошелек:</h3>
                <p style={{ wordWrap: 'break-word', maxWidth: '100px' }}>
                  bc1qphtkk4jhxrar09ujntmzlw66vjhe3pu4vl3fpw
                </p>
                <img
                  id="bitcoin-qr"
                  src="https://qr.crypt.bot/?url=bc1qphtkk4jhxrar09ujntmzlw66vjhe3pu4vl3fpw"
                  alt="QR Code"
                  style={{ maxWidth: '100px' }}
                />
              </div>
            </div>
          </main>
          <Footer />
        </body>
      </html>
    </Provider>
  );
};

export default Layout;
