"use client";
import React, { useState,useEffect } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import {
  CardHeader,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";
import { AuthService } from "@/_services/auth.service";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import Fileinput from "@/components/ui/Fileinput";
import { DriverService } from "@/_services/driver.service";
import Select from "@/components/ui/Select";
import { missionService } from "@/_services/mission.service";

import Icon from "@/components/ui/Icon";
import Flatpickr from "react-flatpickr";
import Alert from "@/components/ui/Alert";
import { set } from "date-fns";
import Logo from "@/components/partials/header/Tools/Logo";
const GenerateFacture = () => {
  const [form, setForm] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const [errorDevis, setErrorDevis] = useState();
  const router = useRouter();
  const [partners, setPartners] = useState([]);
  const [partnersDetails, setPartnersDetails] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null); // State for selected partner details
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [DevisByPartner, setDevisByPartner] = useState([]);
  const [totalMontant, settotalMontant] = useState(0);
  const tvaRate = 20;
  const [selectedMissions, setSelectedMissions] = useState([]); // Store selected missions

  const calculateTVA = (montantHT, tvaRate) => {

    const TVA = montantHT * (tvaRate / 100);
    const montantTTC = montantHT + TVA;
    return {
      montantHT,
      TVA,
      montantTTC
    };
  };
  const handleMissionSelection = (missionId) => {
    setSelectedMissions((prev) => {
      if (prev.includes(missionId)) {
        return prev.filter((id) => id !== missionId);
      } else {
        return [...prev, missionId];
      }
    });
  };

  const FetchDevisByPartner = (data,id) => {
    setErrorDevis("")
    setDevisByPartner([])
    settotalMontant(0)
    return missionService
      .FindDevisByPartnerId(data,id)
      .then((res) => {
        console.log(res)
        setDevisByPartner(res.devis);
        setErrorDevis("")
        const totalMontant1 = res.devis.reduce(
          // const montantHT = Number(rowData.montant);
          // const { montantTTC } = calculateTVA(montantHT, tvaRate);
          (total, devis) => total + parseFloat(calculateTVA(devis.montant, tvaRate).montantTTC ),
          0
        );
        settotalMontant(totalMontant1)

      })
      .catch((err) => {
        setDevisByPartner([])
        console.log(err)
        setErrorDevis(err)
        settotalMontant(0)
      });
  };
  const FetchAllPartnership = () => {
    return missionService
      .FetchAllPartnership()
      .then((res) => {
        setPartnersDetails(res.partner);
        const FormattedPartners = res.partner.map((item) => ({
          value: `${item._id}`,
          label: `${item.name} - ${item.phoneNumber}`,
        }));
        setPartners(FormattedPartners);
      })
      .catch((err) => console.error("Error fetching partners:", err));
  };
  const calculateTotalAmount = () => {
    return DevisByPartner
      .filter((item) => selectedMissions.includes(item._id)) // Only selected missions
      .reduce((total, devis) => total + parseFloat(calculateTVA(devis.montant, tvaRate).montantTTC), 0);
  };
  useEffect(() => {
    settotalMontant(calculateTotalAmount());
  }, [selectedMissions]); // Recalculate when selection changes

  const groupAsyncFunctions = () => {
    setIsLoading(true);
    Promise.all([FetchAllPartnership()])
      .catch((err) => console.error("Error in async functions:", err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    groupAsyncFunctions();
  }, []);
  const formatDateToYYYYMMDD= (date)=> {
    const year = date?.getFullYear();
    const month = String(date?.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date?.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  const handleChange = (e) => {
    setValue(e.target.value);

    // Find selected partner details
    const selected = partnersDetails.find(
      (partner) => partner._id === e.target.value
    );
    setSelectedPartner(selected); // Update state with selected partner details
    console.log(selected._id); // Debug log
    const data=
      {
        fromDate:formatDateToYYYYMMDD(startDate),
        toDate:formatDateToYYYYMMDD(endDate)
    }
    console.log(data)
    FetchDevisByPartner(data,selected._id)


  };
const fetch =()=>{
  const data=
      {
        fromDate:formatDateToYYYYMMDD(startDate),
        toDate:formatDateToYYYYMMDD(endDate)
    }
    if(!value){
      setErrorDevis("Veuillez choisir un partenaire")
      return;
    }
    console.log(data)
    FetchDevisByPartner(data,value)
}
  const onSubmit = (e) => {
    e.preventDefault();

    if (!value) {
      toast.error("Veuillez choisir un partenaire", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const data = {
      partner:value,
        from:formatDateToYYYYMMDD(startDate),
        to:formatDateToYYYYMMDD(endDate),
        totalAmount:totalMontant,
        missions: selectedMissions,
    };

    console.log({ data, value });
    CreateFacture(data);
  };

  const CreateFacture = (data) => {

    setIsSubmitting(true);
    missionService
      .createFacture(data)
      .then((res) => {
        setIsSubmitting(false);
        toast.success("Facture created successfully!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        router.push(`/admin/factureDetail/${res?._id}`);
      })
      .catch((error) => {
        setIsSubmitting(false);

      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-1/2">
      <Card title="Générer Facture partenaire" headerslot={false}>
        <form
          onSubmit={onSubmit}
          style={{
            padding: "20px",
            borderRadius: "5px",
            justifyContent: "center",
            alignItems: "center",
            margin: 20,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Flatpickr
                label="Date de début"
                value={startDate}
                onChange={(date) => {
                  fetch()
                  setStartDate(date[0])}}
                options={{ dateFormat: "Y-m-d" }}
              />
              {error?.name && <div className="text-red-500">{error.name}</div>}
            </div>

            <div>
              <Flatpickr
                label="Date de fin"
                value={endDate}
                onChange={(date) => {
                  fetch()
                  setEndDate(date[0])}}
                options={{ dateFormat: "Y-m-d" }}
              />
              {error?.unitPrice && (
                <div className="text-red-500">{error.unitPrice}</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4">
            <div>
              <Select
                label="Liste des partenaires"
                options={partners}
                onChange={handleChange}
                value={value}
                required
              />
             {errorDevis && (
  <Alert
    label={typeof errorDevis === "string" ? errorDevis : "An unexpected error occurred"}
    className="alert-outline-danger"
  />
)}

            </div>
          </div>

          {selectedPartner && (
            <div className="mt-4 p-4 border border-gray-300 rounded">
              <h4 className="text-lg font-semibold">Détails du partenaire</h4>
              <p>
                <strong>Nom:</strong> {selectedPartner.name}
              </p>
              <p>
                <strong>Numéro de téléphone:</strong>{" "}
                {selectedPartner.phoneNumber}
              </p>
              <p>
                <strong>Email:</strong> {selectedPartner.email}
              </p>
              <p>
                <strong>Adresse:</strong> {selectedPartner.address}
              </p>
              {/* Add more details as needed */}
            </div>
          )}

          <div className="ltr:text-right rtl:text-left space-x-3 rtl:space-x-reverse">
            <Button
              isLoading={isSubmitting}
              type="submit"
              text="Valider"
              className="btn-dark"
            />
          </div>
        </form>
      </Card>
      </div>
      <div className="w-full lg:w-1/2">
            {/* Facture Details */}
            <Card title="Facture Details">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <div>
                 <Logo notClicked={false}/>
                  <p className="text-gray-600">140 bis Rue DE RENNES</p>
                  <p className="text-gray-600">PARIS 75006</p>
                  <p className="text-gray-600">Téléphone: 06 51913143</p>
                  <p className="text-gray-600">SIRET: 98066356100028</p>
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-bold">Facture</h2>
                  <p className="text-gray-500">N° de commande: {selectedPartner?.numFacture}</p>
                  <p className="text-gray-500">Date: {new Date().toLocaleDateString("fr-FR")}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-gray-700 font-bold mb-2">Facturer à :</h3>
                  <p>{selectedPartner?.email || "N/A"}</p>
                  <p>{selectedPartner?.addressPartner || "N/A"}</p>
                  <p>{selectedPartner?.phoneNumber || "N/A"}</p>
                  <p>{selectedPartner?.siret || "N/A"}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-gray-700 font-bold mb-2">Réf Client :</h3>
                  <p>ID Client: #{selectedPartner?.partner?._id?.slice(0, 5)}</p>
                  <p>Conditions: Paiement à la commande</p>
                </div>
              </div>

              <table className="w-full mt-6 border-collapse border border-gray-200">
  <thead className="bg-gray-100">
    <tr>
      <th className="border border-gray-200 px-4 py-2">Sélectionner</th>
      <th className="border border-gray-200 px-4 py-2">Description</th>
      <th className="border border-gray-200 px-4 py-2">QTE</th>
      <th className="border border-gray-200 px-4 py-2">Prix Unitaire</th>
      <th className="border border-gray-200 px-4 py-2">Montant</th>
    </tr>
  </thead>
  <tbody>
    {DevisByPartner?.map((item, index) => (
      <tr key={index}>
        <td className="border border-gray-200 px-4 py-2 text-center">
          <input
            type="checkbox"
            checked={selectedMissions.includes(item._id)}
            onChange={() => handleMissionSelection(item._id)}
          />
        </td>
        <td className="border border-gray-200 px-4 py-2">{item?.mission?.postalAddress || "N/A"}</td>
        <td className="border border-gray-200 px-4 py-2">1</td>
        <td className="border border-gray-200 px-4 py-2">
          {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(item?.montant || 0)}
        </td>
        <td className="border border-gray-200 px-4 py-2">
          {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(item?.montant || 0)}
        </td>
      </tr>
    ))}
  </tbody>
</table>


              <div className="mt-6 text-right">
                <p className="text-lg font-semibold">Total HT: { new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                                 totalMontant,
          ) || '0,00'}
          </p>
                <p className="text-lg font-semibold">Total TTC:  { new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
            totalMontant  * 1.20 || 0
        )} </p>
              </div>
            </Card>
          </div>
          </div>
    </div>
  );
};

export default GenerateFacture;
