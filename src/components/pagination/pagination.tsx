// components/Pagination.tsx

import React from 'react';
import styles from './pagination.module.scss'; // Предполагается, что у вас есть стили для пагинации
import { getPageNumbers } from '@/utils/pagePagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // useEffect(() => {
  //   console.log(currentPage);
  //   console.log(totalPages);
  // }, [totalPages, currentPage]);
  // Функция для обработки клика на стрелку "влево"
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Функция для обработки клика на стрелку "вправо"
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.paginationButtons}>
      {/* Стрелка влево */}
      <button
        onClick={handlePreviousClick}
        disabled={currentPage === 1} // Деактивируем кнопку, если текущая страница первая
        className={styles.arrowButton}
      >
        &lt; {/* Знак меньше как стрелка */}
      </button>

      {/* Номера страниц */}
      {getPageNumbers(currentPage, totalPages).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={
            pageNumber === currentPage ? styles.activePage : styles.pageButton
          }
        >
          {pageNumber}
        </button>
      ))}

      {/* Стрелка вправо */}
      <button
        onClick={handleNextClick}
        disabled={currentPage === totalPages} // Деактивируем кнопку, если текущая страница последняя
        className={styles.arrowButton}
      >
        &gt; {/* Знак больше как стрелка */}
      </button>
    </div>
  );
};

export default Pagination;
