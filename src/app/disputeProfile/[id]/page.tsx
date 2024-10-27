import { ProfileDisput } from '@/components/profileDisput/profileDisput';
import React from 'react';

const DisputeProfile: React.FC<{ params: { id: string } }> = ({ params }) => {
  return <ProfileDisput id={params.id} />;
};

export default DisputeProfile;
