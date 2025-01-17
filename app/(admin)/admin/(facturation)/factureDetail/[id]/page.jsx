"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import userDarkMode from "@/hooks/useDarkMode";
import { missionService } from "@/_services/mission.service";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import Logo from "@/components/partials/header/Tools/Logo";
import { toast } from 'react-toastify';

const statusMapping = {
  "in progress": "En cours",
  canceled: "Annulée",
  "confirmed driver": "Confirmée conducteur",
};

const FactureDetail = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [isDark] = userDarkMode();
  const [isLoading, setIsLoading] = useState(false);
  const [factureDetails, setFactureDetails] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchFactureDetail = async (id) => {
    setFactureDetails({})
    try {
      const res = await missionService.FindFactureByPartnerId(id);
      setFactureDetails(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchFactureDetail(id).finally(() => setIsLoading(false));
  }, [id]);
const payeeFacture = async () => {
   setIsSubmitting(true);
      missionService
        .PayeeFacture(id)
        .then((res) => {
          setIsSubmitting(false);
          toast.success(" Facture payée avec succès", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          fetchFactureDetail(id)
        })
        .catch((error) => {
          setIsSubmitting(false);

        });
}
console.log(factureDetails)
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
        className={`inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-full ${bgColorClass} ${textColorClass}`}
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
            <h4>Preview</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  // router.push(/admin/editMission/${id});
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
              <button
  type="button"
  onClick={() => payeeFacture()}
  disabled={isSubmitting}
  className={`invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 rtl:space-x-reverse ${
    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
  }`}
>
  <span className="text-lg">
    <Icon icon="heroicons:check-circle" />
  </span>
  <span>
    {factureDetails?.facture?.payed ? "Marquer Non Payée" : "Marquer Payée"}
  </span>
</button>

            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Facture Details */}
            <Card title="Facture Details">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <div>
                 <Logo/>
                  <p className="text-gray-600">140 bis Rue DE RENNES</p>
                  <p className="text-gray-600">PARIS 75006</p>
                  <p className="text-gray-600">Téléphone: 06 51913143</p>
                  <p className="text-gray-600">SIRET: 98066356100028</p>
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-bold">Facture</h2>
                  <p className="text-gray-500">N° de commande: {factureDetails?.numFacture}</p>
                  <p className="text-gray-500">Date: {new Date().toLocaleDateString("fr-FR")}</p>
                  <p
                    className={`font-bold ${
                      factureDetails?.facture?.payed
                        ? "text-success-500"
                        : "text-danger-500"
                    }`}
                  >
                    {factureDetails?.facture?.payed
                      ? "Facture Payée"
                      : "Facture Non Payée"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-gray-700 font-bold mb-2">Facturer à :</h3>
                  <p>{factureDetails?.facture?.partner?.email || "N/A"}</p>
                  <p>{factureDetails?.facture?.partner?.addressPartner || "N/A"}</p>
                  <p>{factureDetails?.facture?.partner?.phoneNumber || "N/A"}</p>
                  <p>{factureDetails?.facture?.partner?.siret || "N/A"}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-gray-700 font-bold mb-2">Réf Client :</h3>
                  <p>ID Client: #{factureDetails?.partner?._id?.slice(0, 5)}</p>
                  <p>Conditions: Paiement à la commande</p>
                </div>
              </div>

              <table className="w-full mt-6 border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-200 px-4 py-2">Description</th>
                    <th className="border border-gray-200 px-4 py-2">QTE</th>
                    <th className="border border-gray-200 px-4 py-2">Prix Unitaire</th>
                    <th className="border border-gray-200 px-4 py-2">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  {factureDetails?.devis?.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-200 px-4 py-2">{item?.mission?.postalAddress || "N/A"}</td>
                      <td className="border border-gray-200 px-4 py-2">1</td>
                      <td className="border border-gray-200 px-4 py-2">{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                                 item?.montant,
          ) || '0,00'}</td>
                      <td className="border border-gray-200 px-4 py-2">{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                                 item?.montant,
          ) || '0,00'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-6 text-right">
                <p className="text-lg font-semibold">Total HT: { new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                                 factureDetails?.facture?.totalAmmount,
          ) || '0,00'}
          </p>
                <p className="text-lg font-semibold">Total TTC:  { new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
            factureDetails?.facture?.totalAmmount  * 1.20 || 0
        )} </p>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default FactureDetail;
