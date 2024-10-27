'use client';

import { CartCrud } from '@/components/cardCrud/cartCrud';
import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/ReduxHooks';
import { setPage } from '@/store/slices/mainCrudSlice';
import usePagination from '@/hooks/usePagination';
import { useSetQueryParam } from '@/utils/queryParam';
import { fetchCruds, searchCruds } from '@/store/api/getCruds';
import ViewListContent from '../viewListContent/viewListContent';

const CrudList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error, currentPage, pageSize, totalPages } =
    useAppSelector((state) => state.crud);

  const handleSetPage = useCallback(
    (page: number) => {
      dispatch(setPage(page));
    },
    [dispatch],
  );

  const handleFetchData = useCallback(
    (params: { page: number; limit: number; query?: string }) => {
      if (params.query) {
        dispatch(
          searchCruds({
            query: params.query,
            page: params.page,
            limit: params.limit,
          }),
        );
      } else {
        dispatch(fetchCruds(params));
      }
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
    return <div className="errorP">Ошибка: {error}</div>;
  }

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      dispatch(setPage(pageNumber));
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
      search={true}
    />
  );
};

export default CrudList;
