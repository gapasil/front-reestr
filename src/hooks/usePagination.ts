import { useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

interface UsePaginationProps {
  currentPage: number;
  pageSize: number;
  setPage: (page: number) => void;
  fetchData: (params: { page: number; limit: number; query?: string }) => void;
}

const usePagination = ({
  currentPage,
  pageSize,
  setPage,
  fetchData,
}: UsePaginationProps): void => {
  const searchParams = useSearchParams();

  const getQueryParam = useCallback(
    (param: string): string | null => {
      return searchParams.get(param) || null;
    },
    [searchParams],
  );

  /// инициализация достается из url page
  useEffect(() => {
    const pageParam = getQueryParam('page');
    if (pageParam) {
      const pageNumber = Number(pageParam);
      setPage(pageNumber);
    }
  }, [getQueryParam, setPage]);

  useEffect(() => {
    const pageParam = getQueryParam('query');
    if (pageParam) {
      fetchData({
        page: currentPage,
        limit: pageSize,
        query: pageParam,
      });
    } else {
      fetchData({ page: currentPage, limit: pageSize });
    }
  }, [currentPage, fetchData, pageSize, getQueryParam]);
};

export default usePagination;
