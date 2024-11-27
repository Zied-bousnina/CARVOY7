"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import SelectMonth from "@/components/partials/SelectMonth";
import CompanyTable from "@/components/partials/table/company-table";
import HomeBredCurbs from "@/components/partials/HomeBredCurbs";
import { missionService } from "@/_services/mission.service";
import TableReusable from "@/components/partials/table/Table-reusable";
import { DriverService } from "@/_services/driver.service";

const MostSales = dynamic(
  () => import("@/components/partials/widget/most-sales"),
  { ssr: false }
);



const Conducteurs = () => {
  const [filterMap, setFilterMap] = useState("usa");
  const [Missions, setMissions] = useState([]);
  const [DriveLists, setDriveLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [MissionByPartner, setMissionByPartner] = useState(false);
  const COLUMNS = [
    {
      Header: "ID",
      accessor: "_id",
      Cell: ({ value }) => `#${value?.toString().slice(-5)}`,
    },
    {
      Header: "Nom",
      accessor: "name",
    },
    {
      Header: "E-mail",
      accessor: "email",

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

  const handleDelete = (row) => {
    console.log("delete", row);
  };

  const handleEdit = (row) => {
    console.log("edit", row);
  };

  const handleDownload = (row) => {
    console.log("download", row);
  };

  const FetchAllPartnership = () => {
    return DriverService.FetchAllDrivers()
      .then((res) => {
        console.log("FindPartner list",res);
        setDriveLists(res.driver
        ); // Update the state with the correct value
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("done");
      });
  };



  const groupAsyncFunctions = () => {
    setIsLoading(true);
    Promise.all([FetchAllPartnership()])
      .then(() => {})
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    groupAsyncFunctions();
  }, []); // Empty array to only run on mount

  return (
    <div>
      <HomeBredCurbs title="Conducteurs" />

      <div className="grid grid-cols-12 gap-5">
        <div className="lg:col-span-12 col-span-12">
          <Card title={"Liste de tous les conducteurs"
          } headerslot={false} noborder
          // setMissionByPartner={setMissionByPartner}

          >
            <TableReusable
            Missions={
            DriveLists
            }
            COLUMNS={COLUMNS}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleDownload={handleDownload}

            // expandedRows={MissionByPartner}
             />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Conducteurs;
