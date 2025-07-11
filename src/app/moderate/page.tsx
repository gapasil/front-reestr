'use client';

import InactiveCrudList from '@/components/containers/inactiveCrudList/inactiveCrudList';
import withAdminProtection from '@/hoc/withAdminProtection';
import React from 'react';

const Moderate: React.FC = () => {
  return (
    <main>
      <h1 className="header-page">Кандидаты на добавление</h1>
      <InactiveCrudList />
    </main>
  );
};

export default withAdminProtection(Moderate);
