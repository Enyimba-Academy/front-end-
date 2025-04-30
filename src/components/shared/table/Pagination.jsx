import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ setPage, totalPages, currentPage }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md border border-gray-300 disabled:opacity-50"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setPage(page)}
          className={`px-3 py-1 rounded-md ${
            currentPage === page
              ? "bg-primary-600 text-white"
              : "border border-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md border border-gray-300 disabled:opacity-50"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
