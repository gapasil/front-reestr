'use client';

import withAdminProtection from '@/hoc/withAdminProtection';
import React from 'react';

const Dispute: React.FC = () => {
  return (
    <main>
      <h1>Dispute</h1>
    </main>
  );
};

export default withAdminProtection(Dispute);
