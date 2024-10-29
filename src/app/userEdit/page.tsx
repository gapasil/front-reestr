'use client';
import UserEdit from '@/components/containers/userEdit/userEdit';
import withAdminProtection from '@/hoc/withAdminProtection';
import React from 'react';

const UserEditPage: React.FC = () => {
  return (
    <main
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>Изменение юзеров</h1>
      <UserEdit />
    </main>
  );
};

export default withAdminProtection(UserEditPage);
