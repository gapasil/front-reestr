'use client';

import { AddCrud } from '@/components/addCrud/addCrud';
import React, { memo } from 'react';

const SendData: React.FC = () => {
  return (
    <main>
      <h1>Отправить данные</h1>
      <AddCrud />
    </main>
  );
};

const MemoizedSendData = memo(SendData);
MemoizedSendData.displayName = 'SendData';

export default MemoizedSendData;
