'use client';

import CandidateList from '@/components/containers/candidateList/candidateList';
import withAdminProtection from '@/hoc/withAdminProtection';
import React from 'react';

const Candidate: React.FC = () => {
  return (
    <main>
      <h1 className="header-page">Кандидаты на добавление</h1>
      <CandidateList />
    </main>
  );
};

export default withAdminProtection(Candidate);
