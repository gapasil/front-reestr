import React from 'react';
import '@/styles/globals.scss';
import '@/styles/layout.scss';
import { Header } from '@/components/containers/header/header';
import { MainSideMenu } from '@/components/containers/mainSideMenu/mainSideMenu';
import { Footer } from '@/components/containers/footer/footer';
import AuthForm from '@/components/containers/authForm/authForm';
import InfModal from '@/components/UI/infModal/infModal';
// import Head from 'next/head';
import { Metadata } from 'next';
import ClientProvider from '@/components/containers/clientProvider/clientProvider';
// import Link from 'next/link';
// import Image from 'next/image';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Реестр русофобов | Список и информация о русофобии',
  description:
    'Реестр русофобов: список лиц, обвиняемых в русофобии. Узнайте подробности или добавьте информацию на наш сайт.',
  keywords:
    'реестр русофобов, список русофобов, информация о русофобии, добавить в реестр, антироссийские действия',
  authors: {
    url: 'reestr.rusofobov@mail.ru',
    name: 'Команда Реестра русофобов',
  },
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="ru">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-8H8XRFPDZ9"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-8H8XRFPDZ9');
        `}
      </Script>
      <body>
        <ClientProvider>
          <InfModal />
          <AuthForm />
          <Header />
          <main className="container-layout">
            <MainSideMenu />
            <div className="content-layout">{children}</div>
          </main>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
};

export default Layout;
