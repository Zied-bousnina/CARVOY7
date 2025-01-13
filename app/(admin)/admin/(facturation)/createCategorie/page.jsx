"use client";
import React, { useState } from "react";
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
import Alert from "@/components/ui/Alert";
import Icon from "@/components/ui/Icon";

const CreateCategorie = () => {
  const [form, setForm] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const DistanceTypeOptions = [
    { value: '10', label: '10 km' },
    { value: '20', label: '20 km' },
    { value: '30', label: '30 km' },
    { value: '40', label: '40 km' },
    { value: '50', label: '50 km' },


  ];
  const [value, setValue] = useState("");


  const handleChange = (e) => {
    setValue(e.target.value);
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

if(!value){
  toast.error("Veuillez choisir une distance", {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  }
  );
  return;
}

      const data= {
        description:form?.description,
        unitPrice:form?.unitPrice,
        distance:value
      }



console.log({...form ,value})
    CreateCat(data);
  };

  const CreateCat = (data) => {
    console.log(data)
    setError()
    setIsSubmitting(true);
    missionService.createCategorie(data)
      .then((res) => {

        setIsSubmitting(false);
        // You can show a success message here
        toast.success("   Categorie Updated successfully!          ", {
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
        // router.push("/admin/conducteurs");
        router.push("/admin/addCategorie");


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
    <ToastContainer />
    <div className="lg:flex justify-between flex-wrap items-center mb-6">
        <h4></h4>
        <div className="flex lg:justify-end items-center flex-wrap space-xy-5">
          <button
          onClick={()=> {
            router.push(`/admin/addCategorie`)
          }}
          className="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 rtl:space-x-reverse">
            <span className="text-lg">
              <Icon icon="heroicons:pencil-square" />
            </span>
            <span>Liste categorie</span>
          </button>

        </div>
      </div>
      <Card title="Ajouter Catégorie"
      headerslot={false}
      >
        {/* <h4 className="text-slate-900 dark:text-white text-xl mb-4">#89572935Kh</h4> */}
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


          <div className="grid grid-cols-1 gap-4 mt-4">
            {/* Address */}
            <div>
              <Textinput
                label="Description"
                type="text"
                placeholder="Entrez la Description"
                required
                name="description"
                onChange={onChangeHandler}
              />
              {error?.name && <div className="text-red-500">{error.name}</div>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company Name */}
            <div>

    <Select
              label="Distance (km)"
              options={DistanceTypeOptions}
              onChange={handleChange}
              value={value}
              required
            />
              {error?.name && <div className="text-red-500">{error.name}</div>}
            </div>

            {/* Contact Person */}
            <div>
              <Textinput
                label="Prix unitaire"
                type="text"
                placeholder="Entrez prix unitaire"
                required
                name="unitPrice"
                onChange={onChangeHandler}
              />
              {error?.unitPrice && <div className="text-red-500">{error.unitPrice}</div>}
            </div>
          </div>
{
  error&&
          <Alert
          label={error+' !'}
          className="alert-outline-danger"
          />
        }






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
    </div>
  );
};

export default CreateCategorie;
