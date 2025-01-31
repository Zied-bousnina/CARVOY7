"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import userDarkMode from "@/hooks/useDarkMode";
import { missionService } from "@/_services/mission.service";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const BasicMap2 = dynamic(() => import("@/components/partials/map/basic-map2"), {
  ssr: false,
});
const statusMapping = {
  "in progress": "En cours",
  canceled: "Annulée",
  "confirmed driver": "Confirmée conducteur",
};
const MissionDetails = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [isDark] = userDarkMode();
  const [isLoading, setIsLoading] = useState(false);
  const [MissionDetails, setMissionDetails] = useState({});

  const [remunerationValue, setRemunerationValue] = useState(0); // For real-time updates

  const [intervalType, setIntervalType] = useState("tiered"); // Default to "tiered"
  const [fixedThreshold, setFixedThreshold] = useState(100); // Default fixed remuneration value
  const [tieredThresholds, setTieredThresholds] = useState([
    { min: 0, max: 50, remuneration: 100 },
    { min: 51, max: 100, remuneration: 200 },
    { min: 101, max: 150, remuneration: 300 },
  ]); // Example tiered configuration


  const FetchMissionDetail = (id) => {
    return missionService
      .FindRequestDemandeById(id)
      .then((res) => {
        setMissionDetails(res?.demande); // Update the state with the correct value
        setFixedThreshold(res?.demande?.price)
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {});
  };

  const groupAsyncFunctions = (id) => {
    setIsLoading(true);
    Promise.all([FetchMissionDetail(id)])
      .then(() => {})
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const calculateRemuneration = (value) => {
    if (intervalType === "tiered") {
      // Find the matching tranche
      const tranche = tieredThresholds.find(
        (threshold) => value >= threshold.min && value <= threshold.max
      );
      if (tranche) {
        setRemunerationValue(tranche.remuneration); // Set the remuneration based on the tranche
      } else {
        setRemunerationValue(0); // Default value if no tranche matches
      }
    } else if (intervalType === "fixed") {
      setRemunerationValue(fixedThreshold); // Apply the fixed configuration
    }
  };

  const saveConfiguration = async () => {
    const config = {
      id, // Send mission ID
      intervalType,
      price: fixedThreshold, // Use price instead of `fixedThreshold`
      factureIncluded: true, // Add option to include in invoice
      tranches: tieredThresholds, // Send tranches
    };
console.log(config)
    try {
      const response = await missionService.updateTrancheConfiguration(config,id);
      if (response) {
        console.log("Configuration saved successfully", response);
        alert("Configuration mise à jour avec succès !");
      }
    } catch (error) {
      console.error("Error saving configuration:", error);
      alert("Erreur lors de la mise à jour de la configuration.");
    }
  };


    // Recalculate remuneration whenever intervalType, fixedThreshold, or tieredThresholds change
    useEffect(() => {
      if (MissionDetails?.distance !== undefined) {
        calculateRemuneration(MissionDetails.distance);
      }
    }, [intervalType, fixedThreshold, tieredThresholds]);

  useEffect(() => {
    groupAsyncFunctions(id);
  }, []);
  const getStatusDisplay = (statusValue) => {
    const displayValue = statusMapping[statusValue] || statusValue;

    let bgColorClass = "";
    let textColorClass = "";

    switch (statusValue) {
      case "confirmed driver":
        bgColorClass = "bg-success-500 bg-opacity-25";
        textColorClass = "text-success-500";
        break;
      case "in progress":
        bgColorClass = "bg-warning-500 bg-opacity-25";
        textColorClass = "text-warning-500";
        break;
      case "canceled":
        bgColorClass = "bg-danger-500 bg-opacity-25";
        textColorClass = "text-danger-500";
        break;
      default:
        bgColorClass = "bg-gray-300";
        textColorClass = "text-gray-700";
    }
    return (
      <span
        className={`inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] ${bgColorClass} ${textColorClass}`}
      >
        {displayValue}
      </span>
    );
  };
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="lg:flex justify-between flex-wrap items-center mb-6">
          {/* Configuration Section */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold">Configurer les tranches ou montant fixe</h4>
            <div className="flex flex-col space-y-4">
              {/* Select Interval Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Type d'intervalle :</label>
                <select
                  value={intervalType}
                  onChange={(e) => setIntervalType(e.target.value)}
                  className="form-select"
                >
                  <option value="fixed">Montant fixe</option>
                  <option value="tiered">Tranches</option>
                </select>
              </div>

              {/* Fixed Remuneration */}
              {intervalType === "fixed" && (
                <div>
                  <label className="block text-sm font-medium mb-2">Montant fixe (en €) :</label>
                  <input
                    type="number"
                    value={fixedThreshold}
                    onChange={(e) => setFixedThreshold(Number(e.target.value))}
                    className="form-input"
                    placeholder="Montant fixe"
                  />
                </div>
              )}

              {/* Tiered Configuration */}
              {intervalType === "tiered" && (
                <div>
                  <label className="block text-sm font-medium mb-2">Ajouter des tranches :</label>
                  {tieredThresholds.map((threshold, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="number"
                        value={threshold.min}
                        onChange={(e) =>
                          setTieredThresholds((prev) =>
                            prev.map((t, i) =>
                              i === index ? { ...t, min: Number(e.target.value) } : t
                            )
                          )
                        }
                        className="form-input"
                        placeholder="Min"
                      />
                      <input
                        type="number"
                        value={threshold.max}
                        onChange={(e) =>
                          setTieredThresholds((prev) =>
                            prev.map((t, i) =>
                              i === index ? { ...t, max: Number(e.target.value) } : t
                            )
                          )
                        }
                        className="form-input"
                        placeholder="Max"
                      />
                      <input
                        type="number"
                        value={threshold.remuneration}
                        onChange={(e) =>
                          setTieredThresholds((prev) =>
                            prev.map((t, i) =>
                              i === index
                                ? { ...t, remuneration: Number(e.target.value) }
                                : t
                            )
                          )
                        }
                        className="form-input"
                        placeholder="Rémunération (€)"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setTieredThresholds((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                        className="btn btn-danger btn-sm"
                      >
                        Supprimer
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setTieredThresholds([...tieredThresholds, { min: 0, max: 0, remuneration: 0 }])
                    }
                    className="btn btn-primary btn-sm"
                  >
                    Ajouter une tranche
                  </button>
                </div>
              )}
            </div>
            <button onClick={saveConfiguration} className="btn btn-success mt-4">
              Sauvegarder la configuration
            </button>
          </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  router.push(`/admin/editMission/${id}`);
                }}
                className="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 rtl:space-x-reverse"
              >
                <span className="text-lg">
                  <Icon icon="heroicons:pencil-square" />
                </span>
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 rtl:space-x-reverse"
              >
                <span className="text-lg">
                  <Icon icon="heroicons:printer" />
                </span>
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Flex container for mission details and map */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Mission Details Card */}
            <div className="w-full lg:w-1/2">
            <Card title="Mission Details" headerslot={false}>
  <div className="space-y-6">
    {/* Mission Overview */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <p>
                      <strong>Status:</strong> {getStatusDisplay(MissionDetails?.status || "N/A")}
                    </p>
      <p>
        <strong>Mission Type:</strong> <span className="text-gray-700">{MissionDetails?.missionType || "N/A"}</span>
      </p>
      <p>
        <strong>Vehicle Type:</strong> <span className="text-gray-700">{MissionDetails?.vehicleType || "N/A"}</span>
      </p>
      <p>
                      <strong>Remuneration Amount:</strong>{" "}
                      <span className="text-gray-700">
                        {remunerationValue
                          ? Number(remunerationValue).toLocaleString("fr-FR", {
                              style: "currency",
                              currency: "EUR",
                            })
                          : "N/A"}
                      </span>
                    </p>
                    {intervalType === "tiered" && (
                      <div>
                        <p>
                          <strong>Tranches configurées :</strong>
                        </p>
                        <ul className="list-disc pl-5">
                          {tieredThresholds.map((threshold, index) => (
                            <li key={index} className="text-gray-700">
                              {threshold.min} - {threshold.max} km:{" "}
                              {threshold.remuneration.toLocaleString("fr-FR", {
                                style: "currency",
                                currency: "EUR",
                              })}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}


      <p>
        <strong>Distance:</strong>{" "}
        <span className="text-gray-700">
          {MissionDetails?.distance ? Math.round(MissionDetails.distance) : "N/A"} km
        </span>
      </p>
      <p>
        <strong>Date Depart:</strong> <span className="text-gray-700">{MissionDetails?.dateDepart || "N/A"}</span>
      </p>
      <p>
        <strong>Transport:</strong> <span className="text-gray-700">{MissionDetails?.transport || "N/A"}</span>
      </p>

      <p>
        <strong>Immatriculation:</strong> <span className="text-gray-700">{MissionDetails?.immatriculation || "N/A"}</span>
      </p>
      <p>
        <strong>Postal Address:</strong> <span className="text-gray-700">{MissionDetails?.postalAddress || "N/A"}</span>
      </p>
      <p>
        <strong>Postal Destination:</strong>{" "}
        <span className="text-gray-700">{MissionDetails?.postalDestination || "N/A"}</span>
      </p>
    </div>

    {/* Services Section */}
<div>
  <p className="font-semibold text-lg">Services :</p>
  {MissionDetails?.services ? (
    <ul className="list-disc pl-5 space-y-1">
      {Object.entries(MissionDetails.services).map(([key, value]) => {
        // Map service keys to French labels
        const serviceMapping = {
          main: "Principal",
          charge: "Recharge",
          exteriorWash: "Lavage extérieur",
          interiorCleaning: "Nettoyage intérieur",
          garagePlate: "Plaque de garage",
          fuel: "Carburant",
        };

        const label = serviceMapping[key] || key; // Fallback to original key if no mapping
        return (
          <li key={key} className="text-gray-700">
            <strong>{label} :</strong>{" "}
            {value ? (
              <span className="text-green-600">Oui</span>
            ) : (
              <span className="text-red-600">Non</span>
            )}
          </li>
        );
      })}
    </ul>
  ) : (
    <p className="text-gray-500">Aucun service disponible.</p>
  )}
</div>

  </div>
</Card>

            </div>

            {/* Map Card */}
            <div className="w-full lg:w-1/2">
              <Card title="Route Map" headerslot={false}>
                <div className="legend-ring">
                  {!isLoading && (
                    <BasicMap2
                      cords={{
                        depart: MissionDetails?.address,
                        destination: MissionDetails?.destination,
                      }}
                    />
                  )}
                </div>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MissionDetails;
