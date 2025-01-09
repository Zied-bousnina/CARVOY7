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

const MissionDetails = ({ params }) => {
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

        setPartnerDetails(res.partner
        ); // Update the state with the correct value
      })
      .catch((err) => {

      })
      .finally(() => {

      });
  };

  const groupAsyncFunctions = (id) => {
    setIsLoading(true);
    Promise.all([FetchPartnerDetail(id)])
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
      ) : (
        <>
          <div className="lg:flex justify-between flex-wrap items-center mb-6">
            <h4>Preview</h4>
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

          {/* Flex container for Partner Details and Cart */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Partner Details on the left */}
            <div className="w-full lg:w-1/2">
              <Card title="mission Details" headerslot={false}>
                {/* Content for Partner Details */}
              </Card>
            </div>

            {/* Cart on the right */}
            <div className="w-full lg:w-1/2">
              <Card title="Cart" headerslot={false}>
                {/* Content for Cart */}
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );

};

export default MissionDetails;
