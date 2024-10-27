'use client';

import React, { useCallback } from 'react';
import { CartDisput } from '../cartDisput/cartDisput';
import { useAppDispatch, useAppSelector } from '@/hooks/ReduxHooks';
import { fetchDisputs } from '@/store/api/getDisputs';
import { setPage as setDisputPage } from '@/store/slices/disputSlice';
import usePagination from '@/hooks/usePagination';
import ViewListContent from '../viewListContent/viewListContent';
import { useSetQueryParam } from '@/utils/queryParam';
import { autoReload } from '@/utils/autoReload';

const ListDisput: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error, currentPage, pageSize, totalPages } =
    useAppSelector((state) => state.disput);

  const handleSetPage = useCallback(
    (page: number) => {
      dispatch(setDisputPage(page));
    },
    [dispatch],
  );

  const handleFetchData = useCallback(
    (params: { page: number; limit: number }) => {
      dispatch(fetchDisputs(params));
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
      ItemComponent={CartDisput}
    />
  );
};

export default ListDisput;
