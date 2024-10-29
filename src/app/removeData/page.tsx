'use client';
import { AddDisput } from '@/components/containers/addDisput/addDisput';
import React from 'react';

const RemoveData: React.FC = () => {
  return (
    <main
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1 className="header-page">Оспорить публикацию</h1>
      <AddDisput />
    </main>
  );
};

export default RemoveData;
