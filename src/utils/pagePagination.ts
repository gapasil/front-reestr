export const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number = 6,
): number[] => {
  const halfRange = Math.floor(maxVisiblePages / 2);
  let startPage = Math.max(1, currentPage - halfRange);
  let endPage = Math.min(totalPages, currentPage + halfRange);

  // Adjust if the range is less than the max visible pages
  if (endPage - startPage < maxVisiblePages - 1) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
  }

  // Construct the page numbers array
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
};
