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

import { missionService } from "@/_services/mission.service";
import { socket } from "@/utils/socket";
// import BasicMap from "@/components/partials/map/basic-map";
import { useSelector } from "react-redux";
import BasicArea from "@/components/partials/chart/appex-chart/BasicArea";
import { StatistiqueService } from "@/_services/statistique.service";
import GroupChartPartner from "@/components/partials/widget/chart/group-chartPartner";

const BasicMap = dynamic(
  () => import("@/components/partials/map/basic-map"),
  {
    ssr: false,
  }
);
// const BasicMap = dynamic(() => import('./components/partials/map/basic-map'), { ssr: false });

const Dashboard = () => {
  const [filterMap, setFilterMap] = useState("usa");
  const [MissionStats, setMissionStats] = useState();
  const [Ammount, setAmmount] = useState(0);
  const [CardStats, setCardStats] = useState({});
  const [MissionStats2, setMissionStats2] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { id: currentUserId } = useSelector((state) => state.userAuth);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

  // const notificationSound = new Audio("/assets/sounds/notification.mp3");
  // let notificationSound;
  // // if (typeof window !== "undefined") {
  //   notificationSound = new Audio("/path/to/notification-sound.mp3");
  // // }
  const handleFilterChange = (newValue) => {
    setDateRange(newValue);
  };
   useEffect(() => {


     socket.on("newMessage", (newMessage) => {

       if (newMessage.sender !== currentUserId  && newMessage.recieverId===currentUserId) {
        // if (notificationSound) {
        //   notificationSound.play().catch((error) => {
        //     console.error("Error playing notification sound:", error);
        //   });
        // }
         // socket.emit("readMessages", { recieverId: contact._id, userId: currentUserId });

       }


     });

     return () => {
       socket.off("newMessage");
     };
   }, [socket]);

const getAmmount = (filters= {})=> {
  return missionService.findAmmountStatis(filters)
  .then((res)=>{

    setAmmount(res.totalAmount)

  })
  .catch((err)=>{

  })
  .finally(()=>{

  })
}
const findStatsPartners = (filters = {})=> {
  return StatistiqueService.findStatsPartner(filters)
  .then((res)=>{

    setCardStats(res)

  })
  .catch((err)=>{

  })
  .finally(()=>{

  })
}
const getMissionStats = (filters = {})=> {
  return missionService.findDemandsstatisticsadmin(filters)
  .then((res)=>{

    const demandsStats = res.demands.map((demand, index) => ({
      label: `Mission ${index + 1}`,
      price: parseFloat(demand.price || 0),
      count: 1,
    }));

    const aggregatedStats = [
      { label: "Completed", price: 0, count: res.statistics.completed },
      { label: "In Progress", price: demandsStats.reduce((sum, d) => sum + d.price, 0), count: res.statistics.inProgress },
      { label: "Total", price: demandsStats.reduce((sum, d) => sum + d.price, 0), count: res.statistics.total },
    ];

    setMissionStats(aggregatedStats);
    setMissionStats2(res.statistics)


  })
  .catch((err)=>{
   
  })
  .finally(()=>{
   
  })
}
const groupAsyncFunctions = () => {
    setIsLoading(true);
    Promise.all([
      getMissionStats({
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      }),
      getAmmount({
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      }),
      findStatsPartners({
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      })

    ])
      .then((_) => {})
      .catch((err) => {
       
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {

groupAsyncFunctions();
}, [dateRange]);


  return (
    <div>
      <HomeBredCurbs title="Accueil"
onFilterChange={handleFilterChange} 

       />
      <div className="grid grid-cols-12 gap-5 mb-5">
        {/* <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
          <ImageBlock1 />
        </div> */}
        <div className="2xl:col-span-12 lg:col-span-12 col-span-12">
          <Card bodyClass="p-4">
            <div className="grid md:grid-cols-4 col-span-1 gap-3">
              <GroupChartPartner  missionStats={MissionStats2} CardStats={CardStats}
              Ammount={Ammount}

              />
            </div>
          </Card>
        </div>

      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="lg:col-span-12 col-span-12">
        <Card
        headerslot={false}
        title="Évolution Comparée : Chiffre d'Affaires (€) et Nombre de Missions">
       <BasicArea height={350} missionStats={MissionStats} />
      </Card>
        </div>





      </div>
    </div>
  );
};

export default Dashboard;
