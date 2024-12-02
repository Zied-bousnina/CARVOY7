import React, { useMemo } from "react";
import { useTable, useGlobalFilter, useSortBy, usePagination, useExpanded } from "react-table";

const ReusableTable = ({ columns, data, expandable = false, renderRowSubComponent }) => {
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex },
    canNextPage,
    canPreviousPage,
    nextPage,
    previousPage,
    pageOptions,
    gotoPage,
  } = tableInstance;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-fixed" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {expandable && <th>Expand</th>}
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <React.Fragment key={row.id}>
                  <tr {...row.getRowProps()}>
                    {expandable && (
                      <td>
                        <span {...row.getToggleRowExpandedProps()}>
                          {row.isExpanded ? "▼" : "▶"}
                        </span>
                      </td>
                    )}
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                  {row.isExpanded && renderRowSubComponent && (
                    <tr>
                      <td colSpan={columns.length + 1}>
                        {renderRowSubComponent({ row })}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination-controls">
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
          defaultValue={pageIndex + 1}
          onChange={(e) => gotoPage(Number(e.target.value) - 1)}
        />
      </div>
    </>
  );
};

export default ReusableTable;
