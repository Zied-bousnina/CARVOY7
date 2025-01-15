import React, { useMemo,useState } from "react";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useExpanded,
} from "react-table";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const CompanyTable2 = ({ Missions, expandedRows = false }) => {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState("");
    const [activeModal, setActiveModal] = useState(false);
    const [selectedPartnerId, setSelectedPartnerId] = useState(null);

  // Actions
  const actions = [
    {
      name: "Voir",
      icon: "heroicons-outline:eye",
      doit: (id) => {
        // router.push(`/admin/missionDetails/${id}`);

      },
    },
    {
      name: "Modifier",
      icon: "heroicons:pencil-square",
      doit: (id) => {
        // router.push(`/admin/editMission/${id}`);

      },
    },
    {
      name: "Supprimer",
      icon: "heroicons-outline:trash",
      doit: (id) => {
        // handleDeleteClick(id);
      },
    },
  ];

  // Columns
  const COLUMNS = [
    {
      Header: "ID",
      accessor: "numFacture",
      Cell: ({ value }) => `#${value?.toString().slice(-5)}`,
    },
    {
      Header: "De",
      accessor: "from",
    },
    {
      Header: "A",
      accessor: "to",
    },
    {
      Header: "Montant total",
      accessor: "totalAmmount",
    },

    {
      Header: "Créé le",
      accessor: "createdAt",
      Cell: ({ value }) =>
        new Intl.DateTimeFormat("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(value)),
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
      Header: "Action",
      accessor: "action",
      Cell: (row) => {
        return (
          <div>
            <Dropdown
              classMenuItems="right-0 w-auto top-[110%] z-50"
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
                    onClick={() => item.doit(row.row.values._id)}
                    className={`${
                      item.name === "Supprimer"
                        ? "bg-danger-500 text-danger-500 bg-opacity-30 hover:bg-opacity-100 hover:text-white"
                        : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                    } px-4 py-2 text-sm cursor-pointer flex items-center space-x-2 rtl:space-x-reverse`}
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
    },
  ];
   const handleDeleteClick = (missionId) => {
      const selectedMission = Missions.find((mission) => mission._id === missionId);
  console.log(selectedMission);
      if (selectedMission?.status !== "En attente") {
        toast.error("Seules les missions avec le statut 'En Attente' peuvent être supprimées.");
        return;
      }

      setSelectedPartnerId(missionId);
      setActiveModal(true);
    };
  const filteredMissions = useMemo(() => {
    if (!statusFilter) return Missions;
    return Missions.filter((mission) => mission.payed === statusFilter);
  }, [Missions, statusFilter]);

  const columns = useMemo(() => COLUMNS, [expandedRows]);
  const data = useMemo(() => filteredMissions || [], [filteredMissions]);

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
    prepareRow,
  } = tableInstance;

  const { pageIndex } = state;

  return (
    <>
    {activeModal && (
        <Modal
          activeModal={activeModal}
          onClose={() => setActiveModal(false)}
          title="Confirmer la suppression"
          footerContent={
            <>
              <button
                className="btn btn-secondary"
                onClick={() => setActiveModal(false)}
                disabled={isLoading}
              >
                Annuler
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deletePartner(selectedPartnerId)}
                disabled={isLoading}
              >
                {isLoading ? "Suppression en cours..." : "Supprimer"}
              </button>
            </>
          }
        >
          <p>Êtes-vous sûr de vouloir supprimer cette mission ?</p>
        </Modal>
      )}
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
                          {row.cells.map((cell) => (
                            <td {...cell.getCellProps()} className="table-td">
                              {cell.render("Cell")}
                            </td>
                          ))}
                        </tr>
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
              <li key={pageIdx}>
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

export default CompanyTable2;
