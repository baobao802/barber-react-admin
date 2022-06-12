import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from '../../icons';
import styles from './Paginator.module.css';

const Paginator = (props) => {
  const { totalPages, onPageChange } = props;
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || 1, 10),
  );

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };

  useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <ReactPaginate
      nextLabel={<ChevronRight />}
      previousLabel={<ChevronLeft />}
      onPageChange={handlePageClick}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      initialPage={parseInt(currentPage - 1)}
      breakLabel='...'
      pageClassName={styles.pageItem}
      pageLinkClassName={styles.pageLink}
      previousClassName={styles.pageItem}
      previousLinkClassName={styles.pageLink}
      nextClassName={styles.pageItem}
      nextLinkClassName={styles.pageLink}
      breakClassName={styles.pageItem}
      breakLinkClassName={styles.pageLink}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      // renderOnZeroPageCount={null}
    />
  );
};

export default Paginator;
