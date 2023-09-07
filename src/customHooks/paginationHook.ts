import { useState } from "react";

export const usePaginationHook = () => {
  const [pageEntitiesNumber, setPageEntitiesNumber] = useState<number>(10);

  const [page, setPage] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleResultsPerPageChange = (resultsPerPage: number) => {
    setPageEntitiesNumber(resultsPerPage);
    setPage(1);
  };

  return {
    pageNumber: page,
    setPageNumber: handlePageChange,
    resultsPerPage: pageEntitiesNumber,
    setResultsPerPage: handleResultsPerPageChange,
  };
};
