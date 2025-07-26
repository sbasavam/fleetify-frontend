// components/ui/Pagination.jsx
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 5;

const getPageNumbers = () => {
  const pages = [];

  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let start = Math.max(currentPage - 2, 1);
  let end = Math.min(currentPage + 2, totalPages);

  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push('...');
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) pages.push('...');
    pages.push(totalPages);
  }

  return pages;
};


  const handlePageChange = (page) => {
    if (page === '...' || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <div className="flex items-center justify-center space-x-1">
      <button
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-md disabled:opacity-50 hover:bg-gray-100"
      >
        <FiChevronLeft />
      </button>

      {getPageNumbers().map((page, i) => (
        <button
          key={i}
          onClick={() => handlePageChange(page)}
          disabled={page === '...'}
          className={`w-10 h-10 flex items-center justify-center rounded-md ${
            page === currentPage
              ? 'bg-indigo-600 text-white'
              : page === '...'
              ? 'cursor-default'
              : 'hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md disabled:opacity-50 hover:bg-gray-100"
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
