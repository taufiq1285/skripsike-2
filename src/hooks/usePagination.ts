/**
 * usePagination Hook - AKBID Lab System
 * Security: Safe pagination, data limits
 * Status: Ready for use
 */
import { useState, useMemo } from 'react';
import { ENV } from '../lib/constants/env';

interface UsePaginationOptions {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
}

export const usePagination = ({
  totalItems,
  itemsPerPage = ENV.PAGINATION_SIZE,
  initialPage = 1,
}: UsePaginationOptions) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const paginationData = useMemo(() => {
    // SECURITY: Validate pagination parameters
    const safeItemsPerPage = Math.max(1, Math.min(itemsPerPage, 100)); // Max 100 items per page
    const totalPages = Math.ceil(totalItems / safeItemsPerPage);
    const safePage = Math.max(1, Math.min(currentPage, totalPages));
    
    const startIndex = (safePage - 1) * safeItemsPerPage;
    const endIndex = Math.min(startIndex + safeItemsPerPage, totalItems);
    
    return {
      currentPage: safePage,
      totalPages,
      itemsPerPage: safeItemsPerPage,
      startIndex,
      endIndex,
      hasNext: safePage < totalPages,
      hasPrevious: safePage > 1,
      isFirstPage: safePage === 1,
      isLastPage: safePage === totalPages,
    };
  }, [currentPage, totalItems, itemsPerPage]);

  const goToPage = (page: number) => {
    const safePage = Math.max(1, Math.min(page, paginationData.totalPages));
    setCurrentPage(safePage);
  };

  const goToNext = () => {
    if (paginationData.hasNext) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (paginationData.hasPrevious) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToFirst = () => {
    setCurrentPage(1);
  };

  const goToLast = () => {
    setCurrentPage(paginationData.totalPages);
  };

  const getPageNumbers = () => {
    const { currentPage, totalPages } = paginationData;
    const delta = 2; // Number of pages to show on each side
    const range = [];
    
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift('...');
    }
    if (currentPage + delta < totalPages - 1) {
      range.push('...');
    }

    range.unshift(1);
    if (totalPages !== 1) {
      range.push(totalPages);
    }

    return range;
  };

  return {
    ...paginationData,
    goToPage,
    goToNext,
    goToPrevious,
    goToFirst,
    goToLast,
    getPageNumbers,
  };
};
