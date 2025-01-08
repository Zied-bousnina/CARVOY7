"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import GroupChart1 from "@/components/partials/widget/chart/group-chart-1";
import HomeBredCurbs from "@/components/partials/HomeBredCurbs";
import BasicArea from "@/components/partials/chart/appex-chart/BasicArea";
import { useSelector } from "react-redux";
import { socket } from "@/utils/socket";
import { missionService } from "@/_services/mission.service";

const BasicMap = dynamic(() => import("@/components/partials/map/basic-map"), {
  ssr: false,
});

const Dashboard = () => {
  const [MissionStats, setMissionStats] = useState([]);
  const [MissionStats2, setMissionStats2] = useState({});
  const [Ammount, setAmmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const { id: currentUserId } = useSelector((state) => state.userAuth);


  const handleFilterChange = (newValue) => {
    setDateRange(newValue);
  };

  // Fetch total amount
  const getAmmount = (filters= {}) => {
    return missionService
      .findAmmountStatis(filters)
      .then((res) => {
        setAmmount(res.totalAmount);
      })
      .catch((err) => console.error("Error fetching amount stats:", err));
  };

  // Fetch mission statistics
  const getMissionStats = (filters = {}) => {
    return missionService
      .findDemandsstatisticsadmin(filters)
      .then((res) => {
        const demandsStats = res.demands.map((demand, index) => ({
          label: `Mission ${index + 1}`,
          price: parseFloat(demand.price || 0),
          count: 1,
        }));

        const aggregatedStats = [
          { label: "Completed", price: 0, count: res.statistics.completed },
          {
            label: "In Progress",
            price: demandsStats.reduce((sum, d) => sum + d.price, 0),
            count: res.statistics.inProgress,
          },
          {
            label: "Total",
            price: demandsStats.reduce((sum, d) => sum + d.price, 0),
            count: res.statistics.total,
          },
        ];

        setMissionStats(aggregatedStats);
        console.log("aggregatedStats",aggregatedStats)
        setMissionStats2(res.statistics);
      })
      .catch((err) => console.error("Error fetching mission stats:", err));
  };

  // Group async functions
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
    ])
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setIsLoading(false));
  };

  // React to date range changes
  useEffect(() => {
    
      groupAsyncFunctions();
  
  }, [dateRange]);

  // Socket listener
  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      if (
        newMessage.sender !== currentUserId &&
        newMessage.recieverId === currentUserId
      ) {
        // Handle new message (e.g., notifications)
        console.log("New message received:", newMessage);
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, currentUserId]);

  return (
    <div>
      <HomeBredCurbs title="Accueil" onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-12 gap-5 mb-5">
        <div className="2xl:col-span-12 lg:col-span-12 col-span-12">
          <Card bodyClass="p-4">
            <div className="grid md:grid-cols-4 col-span-1 gap-3">
              <GroupChart1 missionStats={MissionStats2} Ammount={Ammount} />
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="lg:col-span-12 col-span-12">
          <Card
            headerslot={false}
            title="Évolution Comparée : Chiffre d'Affaires (€) et Nombre de Missions"
          >
            <BasicArea height={350} missionStats={MissionStats} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
