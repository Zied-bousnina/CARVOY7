/* eslint-disable react/display-name */
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { advancedTable } from "@/constant/table-data";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useExpanded,
} from "react-table";
import GlobalFilter from "@/components/partials/table/GlobalFilter";
import { missionService } from "@/_services/mission.service";
import CompanyTable from "@/components/partials/table/company-table";
import { UserService } from "@/_services/user.service";
import Modal from "@/components/ui/Modal";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input
          type="checkbox"
          ref={resolvedRef}
          {...rest}
          className="table-checkbox"
        />
      </>
    );
  }
);

const Factures = () => {
  const [filterMap, setFilterMap] = useState("usa");
  const [Missions, setMissions] = useState([]);
  const [PartnerList, setPartnerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [activeModal, setActiveModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [selectedPartnerId, setSelectedPartnerId] = useState(null);
  const searchParams = useSearchParams();

  // Extract the `status` parameter from the URL
  const initialStatusFilter = searchParams?.get("status") || "";
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter);

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
      doit: (id) => {
        router.push(`/partner/factureDetail/${id}`);
      },
    },
    {
      name: "edit",
      icon: "heroicons:pencil-square",
      doit: (id) => {
        router.push(`/partner/factureDetail/${id}`);
      },
    },
    {
      name: "delete",
      icon: "heroicons-outline:trash",
      doit: (id) => {
        // handleDeleteClick(id)
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
      Header: "de",
      accessor: "from",
    },
    {
      Header: "A",
      accessor: "to",
    },
    {
        Header: "Montant total",
        accessor: "totalAmmount",
        Cell: ({ value }) => {
          if (value == null) return "—"; // Graceful fallback for null/undefined values

          const formattedValue = new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(value);

          return formattedValue;
        },
      },

    {
      Header: "Méthode de paiement",
      accessor: "paymentMethod",
    },
    {
      Header: "Numéro de référence",
      accessor: "referenceNumber",

    },
    {
      Header: "Créé le",
      accessor: "createdAt",
      Cell: ({ value }) =>
        new Intl.DateTimeFormat('en-US', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date("2021-07-16T10:00:00Z")),
    },
    {
        Header: () => (
          <div className="flex flex-col">
            <span>Statut</span>
            <select
              className="form-control mt-1"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Tous</option>
              <option value="true">Payé</option>
              <option value="false">Non payé</option>
            </select>
          </div>
        ),
        accessor: "payed",
        Cell: (row) => {
          const payedValue = row?.cell?.value;
          const displayValue = payedValue ? "Payé" : "Non payé";

          return (
            <span className="block w-full">
              <span
                className={`inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
                  payedValue ? "text-success-500 bg-success-500" : "text-danger-500 bg-danger-500"
                }`}
              >
                {displayValue}
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
        onClick={() => {
          // deletePartner(row.row.values._id)
          // console.log(row.row.values)

          item.doit(    row.row.values._id    )
          }}
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

  ];


  const Fetchfactures = () => {
    return missionService.FindFacturesByPartner()
      .then((res) => {
console.log(res)
        setPartnerList(res
        ); // Update the state with the correct value
      })
      .catch((err) => {

      })
      .finally(() => {

      });
  };
  const deletePartner = (id) => {
    setIsLoading(true);
    UserService.DeleteUserByAdmin(id)
      .then((res) => {

        Fetchfactures(); // Refresh the table
        setActiveModal(false); // Close the modal
      })
      .catch((err) => {
        console.error("Error deleting partner:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleDeleteClick = (partnerId) => {
    setSelectedPartnerId(partnerId); // Set the ID of the partner to delete
    setActiveModal(true); // Open the modal
  };


  const groupAsyncFunctions = () => {
    setIsLoading(true);
    Promise.all([Fetchfactures()])
      .then(() => {})
      .catch((err) => {

      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    groupAsyncFunctions();
  }, []); // Empty ar
// const mission = MissionByPartner ?  MissionsPartner: Missions
const filteredMissions = useMemo(() => {
    if (!statusFilter) return PartnerList;
    return PartnerList.filter((mission) => mission.payed === statusFilter);
  }, [PartnerList, statusFilter]);
  const columns = useMemo(() => (COLUMNS), []);
  const data = useMemo(() => filteredMissions || [], [filteredMissions]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,

    // (hooks) => {
    //   hooks.visibleColumns.push((columns) => [
    //     {
    //       id: "selection",
    //       Header: ({ getToggleAllRowsSelectedProps }) => (
    //         <div>
    //           <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    //         </div>
    //       ),
    //       Cell: ({ row }) => (
    //         <div>
    //           <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //         </div>
    //       ),
    //     },
    //     ...columns,
    //   ]);
    // }
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
  {/* Confirmation Modal */}
  {activeModal && (
        <Modal
          activeModal={activeModal}
          onClose={() => setActiveModal(false)}
          title="Confirm Delete"
          footerContent={
            <>
              <button
                className="btn btn-secondary"
                onClick={() => setActiveModal(false)}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deletePartner(selectedPartnerId)}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </>
          }
        >
          <p>Are you sure you want to delete this partner?</p>
        </Modal>
      )}
      <Card noborder>
        <div className="md:flex pb-6 items-center">
          <h6 className="flex-1 md:mb-0 mb-3">factures</h6>
          <div className="md:flex md:space-x-3 items-center flex-none rtl:space-x-reverse">

            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            {/* <Button
              icon="heroicons-outline:calendar"
              text="Select date"
              className=" btn-outline-secondary dark:border-slate-700  text-slate-600 btn-sm font-normal dark:text-slate-300 "
              iconClass="text-lg"
            /> */}
            {/* <Button
              icon="heroicons-outline:filter"
              text="Filter"
              className=" btn-outline-secondary text-slate-600 dark:border-slate-700 dark:text-slate-300 font-normal btn-sm "
              iconClass="text-lg"
            /> */}

          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700 mb-16 "
                {...getTableProps}
              >
                <thead className=" border-t border-slate-100 dark:border-slate-800">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      {...headerGroup.getHeaderGroupProps()}
                      key={`ex-tr-${headerGroup.id}`}

                    >

                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          scope="col"
                          className=" table-th "
                          key={`ex-th-${column.id}`}
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
                  className="bg-white divide-y  divide-slate-100 dark:bg-slate-800 dark:divide-slate-700 "
                  {...getTableBodyProps}
                >
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <React.Fragment key={row.id}>

                      <tr {...row.getRowProps()} key={`ex-tr2-${row.id}`} >

                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="table-td"
                              key={`ex-td-${cell.column.id}`}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>

                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
          <div className=" flex items-center space-x-3 rtl:space-x-reverse">
            <span className=" flex space-x-2  rtl:space-x-reverse items-center">
              <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">
                Go
              </span>
              <span>
                <input
                  type="number"
                  className=" form-control py-2"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                  style={{ width: "50px" }}
                />
              </span>
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Page{" "}
              <span>
                {pageIndex + 1} of {pageOptions.length}
              </span>
            </span>
          </div>
          <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
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
              <li key={pageIdx}>
                <button
                  href="#"
                  aria-current="page"
                  className={` ${
                    pageIdx === pageIndex
                      ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                      : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                  }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
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
      </Card>
    </>
  );
};

export default Factures;
