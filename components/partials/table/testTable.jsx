import React, { useState, useMemo, useEffect } from "react";
import { useTable, useRowSelect, useSortBy, useGlobalFilter, usePagination } from "react-table";
// import { useDispatch, useSelector } from 'react-redux';
// import { FindRequestDemande, FindRequestDemandeByPartner } from 'Redux/actions/Demandes.Actions';
// import { Button, Modal } from 'reactstrap';
// import Icon from "@/components/ui/Icon";


const CompanyTable = () => {
// const dispatch = useDispatch();
const COLUMNS = [
  {
    Header: "ID",
    accessor: "_id",
    Cell: ({ value }) => `#${value.toString().slice(-5)}`,
  },
  {
    Header: "Conducteur",
    accessor: "driver.name",
  },
  {
    Header: "Point de départ",
    accessor: "address.display_name",
  },
  {
    Header: "Destination",
    accessor: "destination.display_name",
  },
  {
    Header: "Distance (km)",
    accessor: "distance",
    Cell: ({ value }) => `~${Math.floor(value)}km`,
  },
  {
    Header: "Created At",
    accessor: "createdAt",
    Cell: ({ value }) =>
      new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).format(new Date(value)),
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Actions",
    accessor: "actions",
    Cell: ({ row }) => (
      <div className="flex space-x-2">
        <button
          onClick={() => handleEdit(row.original)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(row.original)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
        <button
          onClick={() => handleDownload(row.original)}
          className="bg-green-500 text-white px-2 py-1 rounded"
        >
          Download
        </button>
      </div>
    ),
  },
];

// Action Handlers
const handleEdit = (rowData) => {
  console.log("Edit clicked:", rowData);
  // Add your logic here for editing
};

const handleDelete = (rowData) => {
  console.log("Delete clicked:", rowData);
  // Add your logic here for deletion
};

const handleDownload = (rowData) => {
  console.log("Download clicked:", rowData);
  // Add your logic here for downloading
};
const requests = [
  {
    _id: "60f1b9b3b3b3b3b3b3b3b3b3",
    driver: {
      name: "John Doe",
    },
    address: {
      display_name: "Point A",
    },
    destination: {
      display_name: "Point B",
    },
    distance: 12.5,
    createdAt: "2021-07-16T10:00:00Z",
    status: "pending",

  },

];
// const requestsByPartner = useSelector(state => state?.partnersMissions?.demandes?.demands);

// useEffect(() => {
//   dispatch(FindRequestDemande());
//   dispatch(FindRequestDemandeByPartner());
// }, [dispatch]);

// const data = useMemo(() => requests, [requests]);
const data = requests
const columns =COLUMNS

const tableInstance = useTable(
  {
    columns,
    data,
    initialState: { pageSize: 10, pageIndex: 0 }, // Set initial page state
  },
  useGlobalFilter,
  useSortBy,
  usePagination,
  useRowSelect
);


const {
  getTableProps,
  getTableBodyProps,
  headerGroups,
  page,
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
  pageOptions,
  state,
  gotoPage,
  pageCount,
  prepareRow,
} = tableInstance;

const { pageIndex } = state;

return (
  <div>
    <table {...getTableProps()} className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
      <thead className="bg-slate-200 dark:bg-slate-700">
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())} className="table-th">
                {column.render('Header')}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
        {page.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} className="table-td">
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
    <div className="pagination">
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        Previous
      </button>
      {pageOptions.map(page => (
        <button key={page} onClick={() => gotoPage(page)}>
          {page + 1}
        </button>
      ))}
      <button onClick={() => nextPage()} disabled={!canNextPage}>
        Next
      </button>
    </div>
  </div>
);
};

export default CompanyTable;