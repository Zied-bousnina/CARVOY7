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
// import BasicMap from "@/components/partials/map/basic-map";
import BasicArea from "@/components/partials/chart/appex-chart/BasicArea";
import { useSelector } from "react-redux";
import { socket } from "@/utils/socket";

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
  const [MissionStats2, setMissionStats2] = useState();
  const [Ammount, setAmmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { id: currentUserId } = useSelector((state) => state.userAuth);
  // const notificationSound = new Audio("/assets/sounds/notification.mp3");
  // let notificationSound;
  // // if (typeof window !== "undefined") {
  //   notificationSound = new Audio("/path/to/notification-sound.mp3");
  // // }
   useEffect(() => {


     socket.on("newMessage", (newMessage) => {
       console.log("New message from socket", newMessage)
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
      <HomeBredCurbs title="Accueil"


       />
      <div className="grid grid-cols-12 gap-5 mb-5">
        {/* <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
          <ImageBlock1 />
        </div> */}
        <div className="2xl:col-span-12 lg:col-span-12 col-span-12">
          <Card bodyClass="p-4">
            <div className="grid md:grid-cols-4 col-span-1 gap-3">
              <GroupChart1  missionStats={MissionStats2}
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
