const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Generate page numbers to display
    const getPageNumbers = () => {
      const pageNumbers = [];
      const maxPagesToShow = 10;
      
      if (totalPages <= maxPagesToShow) {
        // If total pages are less than max to show, display all
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Always include first page
        pageNumbers.push(1);
        
        // Calculate start and end of the displayed page range
        let start = Math.max(2, currentPage - 1);
        let end = Math.min(totalPages - 1, currentPage + 1);
        
        // Adjust if range is too small
        if (end - start < 2) {
          if (currentPage < totalPages / 2) {
            end = Math.min(start + 2, totalPages - 1);
          } else {
            start = Math.max(end - 2, 2);
          }
        }
        
        // Add ellipsis if needed
        if (start > 2) {
          pageNumbers.push('...');
        }
        
        // Add middle page numbers
        for (let i = start; i <= end; i++) {
          pageNumbers.push(i);
        }
        
        // Add ellipsis if needed
        if (end < totalPages - 1) {
          pageNumbers.push('...');
        }
        
        // Always include last page
        pageNumbers.push(totalPages);
      }
      
      return pageNumbers;
    };
    
    return (
      <div className="flex justify-center mt-8">
        <nav aria-label="Page navigation">
          <ul className="flex items-center -space-x-px h-10 text-base">
            <li>
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 ${
                  currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:text-gray-700'
                }`}
              >
                <span className="sr-only">Previous</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                </svg>
              </button>
            </li>
            
            {getPageNumbers().map((page, index) => (
              <li key={index}>
                {page === '...' ? (
                  <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300">
                    ...
                  </span>
                ) : (
                  <button
                    onClick={() => onPageChange(page)}
                    className={`flex items-center justify-center px-4 h-10 leading-tight border ${
                      currentPage === page
                        ? 'text-primary-600 border-primary-300 bg-primary-50 hover:bg-primary-100 hover:text-primary-700'
                        : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                )}
              </li>
            ))}
            
            <li>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 ${
                  currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:text-gray-700'
                }`}
              >
                <span className="sr-only">Next</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  };
  
  export default Pagination;