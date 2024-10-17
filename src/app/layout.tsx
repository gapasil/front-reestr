'use client';

import React from 'react';
import { Provider } from 'react-redux';
import store from '@/store/store';
import '@/styles/globals.scss';
import '@/styles/layout.scss';
import { Header } from '@/components/header/header';
import { MainSideMenu } from '@/components/mainSideMenu/mainSideMenu';
import { Footer } from '@/components/footer/footer';
import AuthForm from '@/components/authForm/authForm';
import InfModal from '@/components/UI/infModal/infModal';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <html lang="ru">
        <body>
          <InfModal />
          <AuthForm />
          <Header />
          <main className="container-layout">
            <MainSideMenu />
            <div className="content-layout">{children}</div>
            <div>Donate</div>
          </main>
          <Footer />
        </body>
      </html>
    </Provider>
  );
};

export default Layout;
