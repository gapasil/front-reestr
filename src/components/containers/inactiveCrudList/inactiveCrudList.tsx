'use client';

import React, { useCallback } from 'react';
import { CartCrud } from '@/components/containers/cardCrud/cartCrud';
import { useAppDispatch, useAppSelector } from '@/hooks/ReduxHooks';
import { setPage as setInactivePage } from '@/store/slices/inactiveCrudSlice';
import { fetchInactiveCruds } from '@/store/api/getCruds';
import usePagination from '@/hooks/usePagination';
import ViewListContent from '../viewListContent/viewListContent';
import { useSetQueryParam } from '@/utils/queryParam';
import { autoReload } from '@/utils/autoReload';

const InactiveCrudList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error, currentPage, pageSize, totalPages } =
    useAppSelector((state) => state.inactiveCrud);

  const handleSetPage = useCallback(
    (page: number) => {
      dispatch(setInactivePage(page));
    },
    [dispatch],
  );

  const handleFetchData = useCallback(
    (params: { page: number; limit: number }) => {
      dispatch(fetchInactiveCruds(params));
    },
    [dispatch],
  );

  usePagination({
    currentPage,
    pageSize,
    setPage: handleSetPage,
    fetchData: handleFetchData,
  });

  const setQueryParam = useSetQueryParam();

  if (loading) return <div>Загрузка...</div>;
  if (error) {
    autoReload();
    return <div className="errorP">Ошибка: {error}</div>;
  }

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      handleSetPage(pageNumber);
      setQueryParam('page', pageNumber);
    }
  };

  return (
    <ViewListContent
      items={items}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageClick}
      ItemComponent={CartCrud}
    />
  );
};

export default InactiveCrudList;
