'use client';

import { EditCrud } from '@/components/containers/editCrud/editCrud';
import { ExtendedCrud } from '@/types/Crud';
import { dateUtils } from '@/utils/dateUtils';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/';

const EditDataPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [profile, setCruds] = useState<ExtendedCrud>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}api/cruds/${params.id}`);
        response.data.birthdate = response.data.birthdate
          ? dateUtils.formatDate(dateUtils.parseDate(response.data.birthdate))
          : '';
        setCruds(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  if (loading) return <div>Загрузка...</div>;

  if (!profile) {
    return <div className="errorP">Запись не найдена</div>;
  }
  return <EditCrud initProp={profile} id={params.id} />;
};

export default EditDataPage;
