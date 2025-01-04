"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import TotalTable from "@/components/partials/table/TotalTable";
import userDarkMode from "@/hooks/useDarkMode";
import Textinput from "@/components/ui/Textinput";
import { missionService } from "@/_services/mission.service";
import {useParams}  from "next/navigation"
import { useRouter } from 'next/navigation';
import Image from "@/components/ui/Image";
import Loading from "@/components/Loading";
import Modal from "@/components/ui/Modal";

const DriverDetail = ({ params }) => {
  const printPage = () => {
    window?.print();
  };
  const router = useRouter()
  const { id } = params;
  const [isDark] = userDarkMode();
  const [isLoading, setIsLoading] = useState(false);
  const [DriverDetails, setDriverDetails] = useState({});
  const [DriverDetailsDocuments, setDriverDetailsDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [modalImage, setModalImage] = useState(''); // State to hold the clicked image URL

  // Handle image click
  const handleImageClick = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true); // Open the modal
  };

  // Handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(''); // Clear the image when modal is closed
  };

  const FetchdriverDetail = (id) => {
    return missionService.GetPartnerDetailsById(id)
      .then((res) => {

        setDriverDetails(res.partner); // Update the state with the correct value
        setDriverDetailsDocuments(res.documents)
      })
      .catch((err) => {

      })
      .finally(() => {

      });
  };

  const groupAsyncFunctions = (id) => {
    setIsLoading(true);
    Promise.all([FetchdriverDetail(id)])
      .then(() => {})
      .catch((err) => {

      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    groupAsyncFunctions(id);
  }, []);


  return (
    <div>
    {isLoading ? (
      <Loading />
    ):
    (

   <>
      <div className="lg:flex justify-between flex-wrap items-center mb-6">
        <h4>Preview</h4>
        <div className="flex lg:justify-end items-center flex-wrap space-xy-5">
          <button
          onClick={()=> {
            router.push(`/admin/EditDriver/${id}`)
          }}
          className="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 rtl:space-x-reverse">
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
      <Card title="Partner Details" headerslot={false}>
        <h4 className="text-slate-900 dark:text-white text-xl mb-4">
          Partner ID: {DriverDetails._id}
        </h4>
        <form
          style={{
            padding: "20px",
            borderRadius: "5px",
            justifyContent: "center",
            alignItems: "center",
            margin: 20,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company Name */}
            <div>
              <Textinput label="Nom" type="text" disabled defaultValue={DriverDetails.name} readOnly   />
            </div>

            {/* Contact Person */}
            <div>
              <Textinput label="e-mail" type="text" disabled defaultValue={DriverDetails.email} readOnly />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4">
            {/* k-bis */}

               <Textinput
               readOnly={true}
                onClick={()=> {

if (DriverDetailsDocuments[0]?.kbis) {
window.open(DriverDetailsDocuments[0]?.kbis, '_blank');
}
}}
               label="k-bis" type="email"
               placeholder={"Cliquer pour voir le fichier"}
                />

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Permit de conduire (carte avant) */}
            <div>

            <Textinput
               readOnly={true}
                onClick={()=> {

if (DriverDetailsDocuments[0]?.permisConduirefrontCard) {
window.open(DriverDetailsDocuments[0]?.permisConduirefrontCard, '_blank');
}
}}
               label="Permis de conduire (Carte avant)" type="email"
               placeholder={"Cliquer pour voir le fichier"}
                />
            </div>

            {/* Permis de conduire (Carte arrière) */}
            <div>
            <Textinput readOnly={true} onClick={()=> {if (DriverDetailsDocuments[0]?.permisConduirebackCard) {window.open(DriverDetailsDocuments[0]?.permisConduirebackCard, '_blank');
}
}}
               label="Permis de conduire (Carte arrière)" type="email"
               placeholder={"Cliquer pour voir le fichier"}
                />
            </div>
          </div>

          <hr className="my-4" />

          <div className="grid grid-cols-1 gap-4 mt-4">
            {/* Certificat d'assurance */}
            <div>
            <Textinput readOnly={true} onClick={()=>
            {if (DriverDetailsDocuments[0]?.assurance
) {window.open(DriverDetailsDocuments[0]?.assurance
, '_blank');}}}
               label="Certificat d'assurance" type="email"
               placeholder={"Cliquer pour voir le fichier"}
                />
            </div>


          </div>



          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Document d'identité (Carte avant) */}
            <div>

            <Textinput
               readOnly={true}
                onClick={()=> {

if (DriverDetailsDocuments[0]?.CinfrontCard
) {
window.open(DriverDetailsDocuments[0]?.CinfrontCard
, '_blank');
}
}}
               label="Document d'identité (Carte avant)" type="email"
               placeholder={"Cliquer pour voir le fichier"}
                />
            </div>

            {/* Document d'identité (Carte arrière) */}
            <div>
            <Textinput readOnly={true} onClick={()=> {if (DriverDetailsDocuments[0]?.CinbackCard
) {window.open(DriverDetailsDocuments[0]?.CinbackCard
, '_blank');
}
}}
               label="Document d'identité (Carte arrière)" type="email"
               placeholder={"Cliquer pour voir le fichier"}
                />
            </div>
          </div>

          <hr className="my-4" />
          <div className="grid grid-cols-1 gap-4 mt-4">
            {/* Justificatif de domicile */}
            <div>

            <Textinput
               readOnly={true}
                onClick={()=> {

if (DriverDetailsDocuments[0]?.proofOfAddress) {
window.open(DriverDetailsDocuments[0]?.proofOfAddress, '_blank');
}
}}
               label="Justificatif de domicile" type="email"
               placeholder={"Cliquer pour voir le fichier"}
                />
            </div>


          </div>

          <hr className="my-4" />

        </form>
      </Card>
      </>
    )}
    </div>
  );
};

export default DriverDetail;
