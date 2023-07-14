import React from "react";
import { usePagination, DOTS } from "../../../hooks/usePagination";
import greenArrowLeft from "../../../images/GreenArrowLeft.png";
import greenArrowRight from "../../../images/GreenArrowRight.png";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  // i want tif page is 0 then also shhow page 1
  // if (totalCount === 0) {
  //   return null;
  // }
  // if (currentPage === 0 || paginationRange.length < 2) {
  //   return null;
  // }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  let lastPage;

  if (paginationRange && paginationRange.length > 0) {
    lastPage = paginationRange[paginationRange.length - 1];
  } else {
    lastPage = 0; // Set a default value when paginationRange is undefined or empty
  }
  // let lastPage = paginationRange[paginationRange?.length - 1];
  return (
    <ul className={`flex justify-center items-center m-0 p-0`}>
      <li
        className={`inline-flex items-center justify-center cursor-pointer p-2 m-1 rounded-md ${
          currentPage === 1 ? "opacity-50 pointer-events-none" : ""
        }`}
        onClick={onPrevious}
      >
        <img src={greenArrowLeft} alt="Previous" className="w-4 h-4" />
      </li>
      {paginationRange?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={index}
              className="inline-flex items-center justify-center cursor-default p-2 m-1"
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={index}
            className={`inline-flex items-center justify-center cursor-pointer px-4 py-[2px] m-1 rounded-md ${
              pageNumber === currentPage
                ? "bg-gray-300 text-black font-semibold"
                : "bg-gray-100"
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`inline-flex items-center justify-center cursor-pointer p-2 m-1 rounded-md ${
          currentPage === lastPage ? "opacity-50 pointer-events-none" : ""
        }`}
        onClick={onNext}
      >
        <img src={greenArrowRight} alt="Next" className="w-4 h-4" />
      </li>
    </ul>
  );
};

export default Pagination;
