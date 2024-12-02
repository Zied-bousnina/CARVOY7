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

const PartnerDetail = ({ params }) => {
  const printPage = () => {
    window?.print();
  };
  const router = useRouter()
  const { id } = params;
  const [isDark] = userDarkMode();
  const [isLoading, setIsLoading] = useState(false);
  const [PartnerDetails, setPartnerDetails] = useState({});
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

  const FetchPartnerDetail = (id) => {
    return missionService.GetPartnerDetailsById(id)
      .then((res) => {
        console.log("FindPartner detail",res);
        setPartnerDetails(res.partner
        ); // Update the state with the correct value
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("done");
      });
  };

  const groupAsyncFunctions = (id) => {
    setIsLoading(true);
    Promise.all([FetchPartnerDetail(id)])
      .then(() => {})
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    groupAsyncFunctions(id);
  }, []);
  console.log("id",PartnerDetail)

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
            router.push(`/admin/EditPartner/${id}`)
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
          Partner ID: {PartnerDetails._id}
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
              <Textinput label="Company Name" type="text" disabled defaultValue={PartnerDetails.name} readOnly   />
            </div>

            {/* Contact Person */}
            <div>
              <Textinput label="Contact Person" type="text" disabled defaultValue={PartnerDetails.contactName} readOnly />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4">
            {/* Address */}
            <div>
              <Textinput label="Address" type="text" disabled defaultValue={PartnerDetails.addressPartner} readOnly />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Email */}
            <div>
              <Textinput label="Email" type="email" disabled defaultValue={PartnerDetails.email} readOnly />
            </div>

            {/* Phone Number */}
            <div>
              <Textinput label="Phone Number" type="tel" disabled defaultValue={PartnerDetails.phoneNumber} readOnly />
            </div>
          </div>

          <hr className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Siret */}
            <div>
              <Textinput label="Siret" type="text" disabled defaultValue={PartnerDetails.siret} readOnly />
            </div>

            {/* K-Bis */}
            <div
            onClick={() => handleImageClick(PartnerDetails.kbis)}
            className="cursor-pointer"
            >
            <label

          className={"block capitalize  flex-0 mr-6 md:w-[100px] w-[60px] break-words"}

        >
K-BIS
        </label>
              <Image src={PartnerDetails.kbis}  />
            </div>
            {isModalOpen && (
              <Modal
        activeModal={isModalOpen}
        onClose={closeModal}
        title="K-BIS"
        themeClass="bg-slate-900 dark:bg-slate-800 dark:border-b dark:border-slate-700"
      >
        {/* Pass the image inside the modal */}
        <img
          src={modalImage}
          alt="Modal Content"
          className="max-w-full max-h-[500px] object-contain"
        />
      </Modal>
      )}
          </div>
        </form>
      </Card>
      </>
    )}
    </div>
  );
};

export default PartnerDetail;
