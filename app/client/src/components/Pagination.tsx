import React, { useState } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import '../styles/components/Pagination/Pagination.css';

const PaginationSquare = ({
  children,
  onClick,
  className,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<any>;
}) => {
  return (
    <div onClick={onClick} className={`pagination-square ${className}`}>
      {children}
    </div>
  );
};

const Pagination = ({
  nextClick,
  prevClick,
  currentPage,
  nextPageLink,
  prevPageLink,
}: {
  currentPage: number;
  nextClick: React.MouseEventHandler<any>;
  prevClick: React.MouseEventHandler<any>;
  nextPageLink: string;
  prevPageLink: string;
}) => {
  return (
    <div className="pagination-container">
      {prevPageLink != '' && (
        <PaginationSquare onClick={prevClick}>
          <IoChevronBack />
        </PaginationSquare>
      )}
      <PaginationSquare className="pagination-page-number">
        {currentPage}
      </PaginationSquare>
      {nextPageLink != '' && (
        <PaginationSquare onClick={nextClick}>
          <IoChevronForward />
        </PaginationSquare>
      )}
    </div>
  );
};

export default Pagination;
