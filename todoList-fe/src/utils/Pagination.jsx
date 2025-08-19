import React from "react";
import rightArrow from "../assets/icons/rightarrow.svg";
import leftArrow from "../assets/icons/leftarrow.svg"; 
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 font-librefranklin">
      {/* Previous------------------------------------------------- */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-2 py-1 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-40"
      >
        <img src={leftArrow} alt="Previous" className="cursor-pointer" />
      </button>

      {/* Page Numbers */}
      {getPages().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-2.5 py-0.5 font-librefranklin  rounded-md ${
              currentPage === page
                ? "bg-purple-700 text-white"
                : "text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-2 py-1 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-40"
      >
        <img src={rightArrow} alt="Next" className="cursor-pointer" />
      </button>
    </div>
  );
};

export default Pagination;
