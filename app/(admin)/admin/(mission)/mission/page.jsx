"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import SelectMonth from "@/components/partials/SelectMonth";
import CompanyTable from "@/components/partials/table/company-table";
import HomeBredCurbs from "@/components/partials/HomeBredCurbs";
import { missionService } from "@/_services/mission.service";

const MostSales = dynamic(
  () => import("@/components/partials/widget/most-sales"),
  { ssr: false }
);

const Mission = () => {
  const [filterMap, setFilterMap] = useState("usa");
  const [Missions, setMissions] = useState([]);
  const [MissionsPartner, setMissionsPartner] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [MissionByPartner, setMissionByPartner] = useState(false);

  const FindRequestDemandeByPartnerV2 = () => {
    return missionService.FindRequestDemandeByPartnerV2()
      .then((res) => {
        console.log("FindRequestDemandeByPartnerV2",res);
        setMissionsPartner(res); // Update the state with the correct value
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("done");
      });
  };

  const FindRequestDemande = () => {
    return missionService.FindRequestDemande()
      .then((res) => {
        console.log(res);
        setMissions(res.demands)


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
    Promise.all([FindRequestDemande(), FindRequestDemandeByPartnerV2()])
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
      <HomeBredCurbs title="Mission" />

      <div className="grid grid-cols-12 gap-5">
        <div className="lg:col-span-12 col-span-12">
          <Card title={
            MissionByPartner ?
              `Liste de toutes les missions crées par les partenaires` :
              "Missions"
          } headerslot={<SelectMonth />} noborder
          setMissionByPartner={setMissionByPartner}

          >
            <CompanyTable
            Missions={MissionByPartner ?
            MissionsPartner : Missions

            }
            expandedRows={MissionByPartner}
             />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Mission;
