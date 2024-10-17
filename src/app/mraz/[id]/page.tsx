import { ProfileCrud } from '@/components/profileCrud/profileCrud';
import React from 'react';

const MrazPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  return <ProfileCrud id={params.id} />;
};

export default MrazPage;
