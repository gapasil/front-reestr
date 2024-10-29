import { useAppDispatch } from '@/hooks/ReduxHooks';
import { searchCruds } from '@/store/api/getCruds';
import React, { memo, useState } from 'react';
import { useGetQueryParam, useSetQueryParams } from '@/utils/queryParam';
import { setPage } from '@/store/slices/mainCrudSlice';
import styles from './searchCrud.module.scss'; // Make sure this path is correct

const SearchCruds = memo((): JSX.Element => {
  const oldQuery = useGetQueryParam('query');
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState(oldQuery || '');
  const setQueryParams = useSetQueryParams();
  const page = useGetQueryParam('page');

  const handleSearch = async () => {
    if (query?.trim()) {
      await dispatch(
        searchCruds({ query: query, page: Number(page), limit: 15 }),
      );
      setQueryParams({ query: query, page: 1 });
    } else {
      setQueryParams({ query: '', page: 1 });
    }
    dispatch(setPage(1));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Поиск..."
        className={styles.searchInput}
      />
      <button onClick={handleSearch} className={styles.searchButton}>
        Поиск
      </button>
    </div>
  );
});

SearchCruds.displayName = 'SearchCruds';
export default SearchCruds;
