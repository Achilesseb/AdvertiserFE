import { NavigateBeforeSVG, NavigateNextSVG } from "../constants/svg";
import React from "react";
import ReactPaginate from "react-paginate";

type Props = {
  totalPages: number;
  currentPage: number;
  changePage: (page: number) => void;
};

const PaginationComponent = ({
  totalPages,
  changePage,
  currentPage,
}: Props) => {
  if (totalPages <= 0) return null;

  return (
    <div className=" self-end">
      <ReactPaginate
        className="flex items-center justify-center gap-2 font-medium my-10"
        previousClassName={`flex items-center justify-center border rounded-md text-labelLarge w-8 h-8 text-black cursor-pointer transition ease-in-out duration-200 hover:bg-neutral-90 ${
          currentPage > 1 ? "border-neutral-40" : "border-neutral-90"
        }`}
        nextClassName={`flex items-center justify-center border border-neutral-90 rounded-md text-labelLarge text-black w-8 h-8 cursor-pointer transition ease-in-out duration-200 hover:bg-neutral-90 ${
          currentPage < totalPages ? "border-neutral-40" : "border-neutral-90"
        }`}
        activeLinkClassName="text-white bg-neutral-30 rounded-md"
        pageClassName={`flex justify-center items-center border border-neutral-90 rounded-md text-labelLarge w-8 h-8 cursor-pointer transition ease-in-out duration-200 hover:bg-neutral-70`}
        activeClassName="flex justify-center items-center border border-neutral-40 rounded-md text-white w-8 h-8 text-labelLarge hover:bg-neutral-90 hover:text-black bg-neutral-40"
        pageLinkClassName="w-full h-full no-underline flex justify-center items-center text-black hover:text-white"
        breakLabel="..."
        nextLinkClassName="w-full h-full flex justify-center items-center"
        previousLinkClassName="w-full h-full flex justify-center items-center"
        nextLabel={<NavigateNextSVG />}
        previousLabel={<NavigateBeforeSVG />}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={(data) => changePage(data.selected + 1)}
        forcePage={currentPage === 0 ? 1 : currentPage - 1}
      />
    </div>
  );
};

export default PaginationComponent;
