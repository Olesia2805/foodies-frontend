import ReactPaginate from 'react-paginate';
import styles from '../RecipePagination/RecipePagination.module.css';
import css from './TabsPagination.module.css';

const TabsPagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className={css.pagination}>
      <ReactPaginate
        previousLabel={null}
        nextLabel={null}
        breakLabel={'...'}
        pageCount={totalPages || 1}
        onPageChange={(e) => onPageChange(e.selected + 1)}
        forcePage={currentPage - 1}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        containerClassName={styles.paginationContainer}
        pageClassName={styles.paginationItem}
        pageLinkClassName={styles.pageLink}
        activeClassName={styles.paginationItemActive}
        breakClassName={styles.break}
        breakLinkClassName={styles.breakLink}
      />
    </div>
  );
};

export default TabsPagination;
