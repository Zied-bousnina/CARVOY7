"use client";
import React, { useEffect, useState } from "react";
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
import { missionService } from "@/_services/mission.service";
import Image from "@/components/ui/Image";


const EditPartner = ({ params }) => {
  const [form, setForm] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({});
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [PartnerDetails, setPartnerDetails] = useState({});
  const { id } = params;
  const [EditKbis,SetEditKbis]= useState(false)


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
  const onChangeHandlerFile = (e) => {
    setForm({
      ...form,
      kbis: e.target.files[0],
    });
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  console.log(
    form
  )




    EditPartner(form);
  };

  const EditPartner = (data) => {
    setIsSubmitting(true);
   missionService.UpdatePartnerShip(data,id)
      .then((res) => {
        console.log(res);
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
        router.push("/admin/Partenaires");

      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting(false);
        if (error) {
          setError(error); // Assuming the backend returns an error object like { email: 'Email already exists', ... }
        }
      });
  };

  const handleSetEditKbis=()=> {
    SetEditKbis(!EditKbis)
  }

  return (
    <div>
    <ToastContainer />
      <Card title="Edit a partner"
      headerslot={false}
      >
        <h4 className="text-slate-900 dark:text-white text-xl mb-4">#89572935Kh</h4>
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
              <Textinput
                label="Nom de l'entreprise"
                type="text"
                placeholder="Entrez le nom de l'entreprise"
                required
                name="name"
                onChange={onChangeHandler}
                defaultValue={PartnerDetails.name}
              />
              {error?.name && <div className="text-red-500">{error.name}</div>}
            </div>

            {/* Contact Person */}
            <div>
              <Textinput
                label="Contact Person"
                type="text"
                placeholder="Entrez le nom de la personne de contact"
                required
                name="contactName"
                onChange={onChangeHandler}

                defaultValue={PartnerDetails.contactName}

              />
              {error?.contactName && <div className="text-red-500">{error.contactName}</div>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4">
            {/* Address */}
            <div>
              <Textinput
                label="Adresse"
                type="text"
                placeholder="Entrez l'adresse de l'entreprise"
                required
                name="addressPartner"
                onChange={onChangeHandler}
                defaultValue={PartnerDetails.addressPartner}
              />
              {error?.addressPartner && <div className="text-red-500">{error.addressPartner}</div>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Email */}
            <div>
              <Textinput
                label="Email"
                type="email"
                placeholder="Entrez l'adresse e-mail de l'entreprise"
                required
                name="email"
                onChange={onChangeHandler}
                defaultValue={PartnerDetails.email}
              />
              {error?.email && <div className="text-red-500">{error.email}</div>}
            </div>

            {/* Phone Number */}
            <div>
              <Textinput
                label="Numéro de téléphone"
                type="tel"
                placeholder="Entrez le numéro de téléphone de l'entreprise"
                required
                name="phoneNumber"
                onChange={onChangeHandler}
                defaultValue={PartnerDetails.phoneNumber}
              />
              {error?.phoneNumber && <div className="text-red-500">{error.phoneNumber}</div>}
            </div>
          </div>

          <hr className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Siret */}
            <div>
              <Textinput
                label="Siret"
                type="text"
                placeholder="Entrez le numéro SIRET de l'entreprise"
                required
                name="siret"
                onChange={onChangeHandler}
                defaultValue={PartnerDetails.siret}
              />
              {error?.siret && <div className="text-red-500">{error.siret}</div>}
            </div>

            {/* K-Bis */}
            <div
             onClick={() =>handleSetEditKbis()}
             className="cursor-pointer"
            >
            {
              EditKbis ?
              <>

              <label

className={"block capitalize  flex-0 mr-6 md:w-[100px] w-[60px] break-words"}

>
show K-BIS
</label>

              <Textinput
                label="K-Bis"
                type="file"
                placeholder=""
                name="kbis"
                onChange={onChangeHandlerFile}

              />
              </>
              :
              <>
              <label

className={"block capitalize  flex-0 mr-6 md:w-[100px] w-[60px] break-words"}

>
edit K-BIS
</label>
            <Image src={PartnerDetails.kbis}  />
              </>
            }
            </div>
          </div>

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

export default EditPartner;
