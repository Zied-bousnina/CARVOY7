import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import useDarkMode from "@/hooks/useDarkMode";
import { useEffect, useState } from "react";
import { missionService } from "@/_services/mission.service";
// import missionService from "@/services/missionService"; // Replace with your actual service path

const BasicArea = ({ height = 350 }) => {
  const [isDark] = useDarkMode();
  const [missionStats, setMissionStats] = useState([]);

  useEffect(() => {
    const getMissionStats = () => {
      missionService
        .findDemandsstatisticsadmin()
        .then((res) => {
          console.log(res);
          const demandsStats = res.demands.map((demand, index) => ({
            label: `Mission ${index + 1}`,
            price: parseFloat(demand.price || 0),
            count: 1,
          }));

          // Prepare data for the chart
          const priceData = demandsStats.map((d) => d.price);
          const cumulativeCount = demandsStats.map((_, i) => i + 1);

          setMissionStats({
            priceData,
            cumulativeCount,
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          console.log("done");
        });
    };

    getMissionStats();
  }, []);

  const series = [
    {
      name: "Chiffre d'affaire (€)",
      data: missionStats.priceData || [],
    },
    {
      name: "Nombre de missions cumulées",
      data: missionStats.cumulativeCount || [],
    },
  ];

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    colors: ["#4669FA", "#FA6946"],
    tooltip: {
      theme: isDark ? "dark" : "light",
    },
    grid: {
      show: true,
      borderColor: isDark ? "#334155" : "#e2e8f0",
      strokeDashArray: 10,
      position: "back",
    },
    yaxis: [
      {
        title: {
          text: "Chiffre d'affaire (€)",
        },
        labels: {
          style: {
            colors: isDark ? "#CBD5E1" : "#475569",
            fontFamily: "Inter",
          },
        },
      },
      {
        opposite: true,
        title: {
          text: "Nombre de missions cumulées",
        },
        labels: {
          style: {
            colors: isDark ? "#CBD5E1" : "#475569",
            fontFamily: "Inter",
          },
        },
      },
    ],
    xaxis: {
      categories: missionStats.cumulativeCount
        ? missionStats.cumulativeCount.map((_, i) => `Mission ${i + 1}`)
        : [],
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      position: "top",
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="line" height={height} />
    </div>
  );
};

export default BasicArea;
