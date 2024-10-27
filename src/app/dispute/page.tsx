'use client';

import ListDisput from '@/components/listDisput/listDisput';
import withAdminProtection from '@/hoc/withAdminProtection';
import React from 'react';

const Dispute: React.FC = () => {
  return (
    <main>
      <h1 className="header-page">Прошения</h1>
      <ListDisput />
    </main>
  );
};

export default withAdminProtection(Dispute);
