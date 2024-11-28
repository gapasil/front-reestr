// pages/blocked.tsx
import Head from 'next/head';
import React, { FC } from 'react';

const BlockedPage: FC = () => {
  return (
    <>
      <Head>
        <title>Доступ ограничен</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="Вы не можете получить доступ к этому сайту."
        />
      </Head>
      <div style={styles.container}>GOIDA!!!</div>
    </>
  );
};

const styles: {
  container: React.CSSProperties;
  image: React.CSSProperties;
  text: React.CSSProperties;
} = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#000',
    position: 'fixed',
    width: '100vw',
    top: '0px',
    left: '0px',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
  text: {
    color: '#fff',
    fontSize: '24px',
    marginTop: '20px',
  },
};
export default BlockedPage;
