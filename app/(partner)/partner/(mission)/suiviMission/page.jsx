"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import ImageBlock1 from "@/components/partials/widget/block/image-block-1";
import GroupChart1 from "@/components/partials/widget/chart/group-chart-1";
import RevenueBarChart from "@/components/partials/widget/chart/revenue-bar-chart";
import RadialsChart from "@/components/partials/widget/chart/radials";
import SelectMonth from "@/components/partials/SelectMonth";
import CompanyTable from "@/components/partials/table/company-table";
import RecentActivity from "@/components/partials/widget/recent-activity";
import RadarChart from "@/components/partials/widget/chart/radar-chart";
import HomeBredCurbs from "@/components/partials/HomeBredCurbs";
import MapPage from "@/app/(dashboard)/map/page";
import { missionService } from "@/_services/mission.service";
// import BasicMap from "@/components/partials/map/basic-map";

const BasicMap = dynamic(
  () => import("@/components/partials/map/basic-map"),
  {
    ssr: false,
  }
);
// const BasicMap = dynamic(() => import('./components/partials/map/basic-map'), { ssr: false });

const SuiviMission = () => {
  const [filterMap, setFilterMap] = useState("usa");
  const [MissionStats, setMissionStats] = useState();
  const [Ammount, setAmmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
const getAmmount = ()=> {
  return missionService.findAmmountStatis()
  .then((res)=>{
    console.log(res)
    setAmmount(res.totalAmount)

  })
  .catch((err)=>{
    console.log(err)
  })
  .finally(()=>{
    console.log("done")
  })
}
const getMissionStats = ()=> {
  return missionService.findDemandsstatisticsadmin()
  .then((res)=>{
    console.log(res)
    setMissionStats(res.statistics)


  })
  .catch((err)=>{
    console.log(err)
  })
  .finally(()=>{
    console.log("done")
  })
}
const groupAsyncFunctions = () => {
    setIsLoading(true);
    Promise.all([
      getMissionStats(),
      getAmmount()

    ])
      .then((_) => {})
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {

groupAsyncFunctions();
}, []);


  return (
    <div>
      <HomeBredCurbs title="Suivi mission"


       />

      <div className="grid grid-cols-12 gap-5">
        <div className="lg:col-span-12 col-span-12">
          <Card>
            <div className="legend-ring">
              <BasicMap />
            </div>
          </Card>
        </div>





      </div>
    </div>
  );
};

export default SuiviMission;
