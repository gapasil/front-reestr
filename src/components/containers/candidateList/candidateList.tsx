'use client';

import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/ReduxHooks';
import usePagination from '@/hooks/usePagination';
import ViewListContent from '../viewListContent/viewListContent';
import { useSetQueryParam } from '@/utils/queryParam';
import { autoReload } from '@/utils/autoReload';
import { fetchCandidate } from '@/store/api/getCandidates';
import { setPage } from '@/store/slices/candidateSlice';
import { CandidateCart } from './candidateCart/candidateCart';

const CandidateList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error, currentPage, pageSize, totalPages } =
    useAppSelector((state) => state.candidate);

  // Set page callback
  const handleSetPage = useCallback(
    (page: number) => {
      dispatch(setPage(page));
    },
    [dispatch],
  );

  // Fetch data callback
  const handleFetchData = useCallback(
    (params: { page: number; limit: number }) => {
      dispatch(fetchCandidate(params));
    },
    [dispatch],
  );

  // Pagination logic
  usePagination({
    currentPage,
    pageSize,
    setPage: handleSetPage,
    fetchData: handleFetchData,
  });

  const setQueryParam = useSetQueryParam();

  // Trigger auto reload after error, useEffect ensures it runs after render
  useEffect(() => {
    if (error) {
      autoReload();
    }
  }, [error]); // Only runs when error changes

  // Handle page click
  const handlePageClick = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      handleSetPage(pageNumber);
      setQueryParam('page', pageNumber);
    }
  };

  // Log items on update
  useEffect(() => {
    console.log(items);
  }, [items]);

  // Loading or error states (these should not affect hooks order)
  if (loading) {
    return <div>Загрузка...</div>; // Return loading UI after hooks are called
  }

  if (error) {
    return <div className="errorP">Ошибка: {error}</div>; // Return error UI after hooks are called
  }

  // Return the main content when not loading or errored
  return (
    <ViewListContent
      items={items}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageClick}
      ItemComponent={CandidateCart}
    />
  );
};

export default CandidateList;
