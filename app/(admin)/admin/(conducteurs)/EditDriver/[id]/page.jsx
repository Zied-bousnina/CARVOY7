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
import Button from "@/components/ui/Button";
import { DriverService } from "@/_services/driver.service";
import { ToastContainer, toast } from 'react-toastify';
const EditDriver = ({ params }) => {
  const printPage = () => {
    window?.print();
  };
  const router = useRouter()
  const [form, setForm] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({});
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
  const onChangeHandlerFile = (e) => {
    setForm({
      ...form,
      kbis: e.target.files[0],
    });
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();





    EditPartner(form);
  };

  const EditPartner = (data) => {
    setIsSubmitting(true);
   DriverService.UpdateDriver(data,id)
      .then((res) => {
       
        setIsSubmitting(false);
        // You can show a success message here
        toast.success("        Partner created successfully!          ", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setError( {});
        setForm({});
        router.push("/admin/conducteurs");

      })
      .catch((error) => {
       
        setIsSubmitting(false);
        if (error) {
          setError(error); // Assuming the backend returns an error object like { email: 'Email already exists', ... }
        }
      });
  };


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
            {/* Company Name */}
            <div>
              <Textinput label="Nom" type="text"  defaultValue={DriverDetails.name}  name="name"
                onChange={onChangeHandler}   />
                 {error?.name && <div className="text-red-500">{error.name}</div>}
            </div>

            {/* Contact Person */}
            <div>
              <Textinput label="e-mail" type="text"  defaultValue={DriverDetails.email}  name="email"
                onChange={onChangeHandler}


                />
                {error?.contactName && <div className="text-red-500">{error.contactName}</div>}
            </div>
          </div>


          <hr className="my-4" />
 {/* Submit Button */}
 <div className="ltr:text-right rtl:text-left space-x-3 rtl:space-x-reverse">
            {/* {isSubmitting ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : ( */}
              <Button isLoading={isSubmitting} isdi type="submit" text="Valider" className="btn-dark" />
            {/* )} */}
          </div>
        </form>
      </Card>
      </>
    )}
    </div>
  );
};

export default EditDriver;
