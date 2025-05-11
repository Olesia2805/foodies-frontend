import React, { useState } from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = -1; i <= 1; i++) {
      const page = currentPage + i;
      if (page > 0 && page <= totalPages) {
        pages.push(page);
      }
    }
    return pages;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          className={`${styles.paginationButton} ${
            page === currentPage ? styles.paginationButtonActive : ''
          }`}
          onClick={() => {
            setCurrentPage(page);
            onPageChange(page);
          }}
        >
          {page}
        </button>
      ))}

      <button
        className={styles.paginationButton}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
