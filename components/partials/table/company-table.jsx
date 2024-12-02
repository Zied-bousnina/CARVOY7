import React, { useMemo } from "react";
import { useTable, useRowSelect, useSortBy, useGlobalFilter, usePagination, useExpanded } from "react-table";
import Icon from "@/components/ui/Icon";
// import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import { useRouter } from "next/navigation";
const CompanyTable = ({ Missions, expandedRows = false }) => {
  const router = useRouter();
  const actions = [
    // {
    //   name: "send",
    //   icon: "ph:paper-plane-right",
    //   doit: () => {
    //     router.push("/invoice-add");
    //   },
    // },
    {
      name: "view",
      icon: "heroicons-outline:eye",
      doit: () => {
        router.push("/invoice-preview");
      },
    },
    {
      name: "edit",
      icon: "heroicons:pencil-square",
      doit: (id) => {
        router.push("/invoice-edit");
      },
    },
    {
      name: "delete",
      icon: "heroicons-outline:trash",
      doit: (id) => {
        return null;
      },
    },
  ];
  const COLUMNS = [
    {
      Header: "ID",
      accessor: "_id",
      Cell: ({ value }) => `#${value?.toString().slice(-5)}`,
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
        }).format(new Date("2021-07-16T10:00:00Z")),
    },
    // {
    //   Header: "Status",
    //   accessor: "status",
    // },
    {
      Header: "status",
      accessor: "status",
      Cell: (row) => {
        return (
          <span className="block w-full">
            <span
              className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
                row?.cell?.value === "Confirmée driver"
                  ? "text-success-500 bg-success-500"
                  : ""
              }
            ${
              row?.cell?.value === "in progress"
                ? "text-warning-500 bg-warning-500"
                : ""
            }
            ${
              row?.cell?.value === "cancled"
                ? "text-danger-500 bg-danger-500"
                : ""
            }

             `}
            >
              {row?.cell?.value}
            </span>
          </span>
        );
      },
    },
    {
      Header: "action",
      accessor: "action",
      Cell: (row) => {
        return (
          <div>
           <Dropdown
  classMenuItems="right-0 w-auto top-[110%] z-50" // Adjust width for horizontal layout
  label={
    <span className="text-xl text-center block w-full">
      <Icon icon="heroicons-outline:dots-vertical" />
    </span>
  }
>
  <div className="flex space-x-2 divide-x divide-slate-100 dark:divide-slate-800 max-w-full overflow-x-auto">
    {actions.map((item, i) => (
      <div
        key={i}
        onClick={() => item.doit()}
        className={`
          ${
            item.name === "delete"
              ? "bg-danger-500 text-danger-500 bg-opacity-30 hover:bg-opacity-100 hover:text-white"
              : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
          }
          px-4 py-2 text-sm cursor-pointer flex items-center space-x-2 rtl:space-x-reverse
        `}
      >
        <span className="text-base">
          <Icon icon={item.icon} />
        </span>
        <span>{item.name}</span>
      </div>
    ))}
  </div>
</Dropdown>

          </div>
        );
      },
    }
    // {
    //   Header: "Actions",
    //   accessor: "actions",
    //   Cell: ({ row }) => (
    //     <div className="flex space-x-2">
    //       <button
    //         onClick={() => handleEdit(row.original)}
    //         className="bg-blue-500 text-white px-2 py-1 rounded"
    //       >
    //         Edit
    //       </button>
    //       <button
    //         onClick={() => handleDelete(row.original)}
    //         className="bg-red-500 text-white px-2 py-1 rounded"
    //       >
    //         Delete
    //       </button>
    //       <button
    //         onClick={() => handleDownload(row.original)}
    //         className="bg-green-500 text-white px-2 py-1 rounded"
    //       >
    //         Download
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  const COLUMNSPartner = [
    {
      Header: "Name",
      accessor: "partner.contactName",

    },
    {
      Header: "E-mail",
      accessor: "partner.email",
    },
    {
      Header: "Tel",
      accessor: "partner.phoneNumber",
    },


  ];
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
const columns = useMemo(() => (expandedRows ? COLUMNSPartner : COLUMNS), [expandedRows]);

const data = useMemo(() => Missions || [], [Missions]);
console.log("data", data);

const tableInstance = useTable(
  {
    columns,
    data,
    initialState: {
      pageSize: 6,
      expanded: expandedRows ? { 0: true } : {}, // Set initial expanded state
    },
  },
  useGlobalFilter,
  useSortBy,
  useExpanded,
  usePagination,
  useRowSelect,
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
  prepareRow,
} = tableInstance;

const { pageIndex } = state;

return (
  <>
    <div>
      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table
              className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
              {...getTableProps()}
            >
              <thead className="bg-slate-200 dark:bg-slate-700">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                  {expandedRows &&
                  <th
                   scope="col"
                   className="table-th">
                   expand
                  </th>
                  }
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        scope="col"
                        className="table-th"
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                {...getTableBodyProps()}
              >
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <React.Fragment key={row.id}>
                      <tr {...row.getRowProps()}>
                      {
                        expandedRows&&
                        <td>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? '▼' : '▶'}
                          </span>
                        </td>
                      }
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()} className="table-td">
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                      {row.isExpanded ? (
                        <tr>
                          <td colSpan={columns.length + 1}>
                            <div className="p-4">
                              <h4 className="font-bold">Missions for {row?.original?.partner?.contactName}</h4>
                              <ul>



                                <CompanyTable
            Missions={row?.original?.demands

            }
            // expandedRows={MissionByPartner}
             />


                              </ul>
                            </div>
                          </td>
                        </tr>
                      ) : null}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="md:flex md:space-y-0 space-y-5 justify-center mt-6 items-center">
        <ul className="flex items-center space-x-3 rtl:space-x-reverse">
          <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
            <button
              className={` ${
                !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <Icon icon="heroicons-outline:chevron-left" />
            </button>
          </li>
          {pageOptions.map((page, pageIdx) => (
            <li key={pageIdx + "sss"}>
              <button
                href="#"
                aria-current="page"
                className={` ${
                  pageIdx === pageIndex
                    ? "bg-slate-900 dark:bg-slate-600 dark:text-slate-200 text-white font-medium"
                    : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900 font-normal"
                } text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                onClick={() => gotoPage(pageIdx)}
              >
                {page + 1}
              </button>
            </li>
          ))}
          <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
            <button
              className={` ${
                !canNextPage ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <Icon icon="heroicons-outline:chevron-right" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </>
);
};

export default CompanyTable;