import React from "react";

const Pagination = ({ pageIndex, pageOptions, gotoPage, canNextPage, canPreviousPage, nextPage, previousPage }) => {
  return (
    <div className="pagination">
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        Previous
      </button>
      <span>
        Page {pageIndex + 1} of {pageOptions.length}
      </span>
      <button onClick={() => nextPage()} disabled={!canNextPage}>
        Next
      </button>
      <input
        type="number"
        value={pageIndex + 1}
        onChange={(e) => gotoPage(Number(e.target.value) - 1)}
        style={{ width: "50px" }}
      />
    </div>
  );
};

export default Pagination;