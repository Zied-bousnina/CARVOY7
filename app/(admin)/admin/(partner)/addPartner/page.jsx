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


const AddPartner = () => {
  const [form, setForm] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({});
  const router = useRouter();

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

    if (
      form.name === undefined ||
      form.contactName === undefined ||
      form.addressPartner === undefined ||
      form.email === undefined ||
      form.phoneNumber === undefined ||
      form.siret === undefined ||
      form.kbis === undefined
    ) {
      
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (Array.isArray(form[key])) {
        form[key].forEach((value) => {
          formData.append(key, value);
        });
      } else {
        formData.append(key, form[key]);
      }
    });

    createPartner(formData);
  };

  const createPartner = (data) => {
    setIsSubmitting(true);
    AuthService.CreatePartner(data)
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
        router.push("/admin/Partenaires");

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
      <Card title="Créer un partenaire"

      headerslot={false}>
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
              />
              {error?.siret && <div className="text-red-500">{error.siret}</div>}
            </div>

            {/* K-Bis */}
            <div>
              <Textinput
                label="K-Bis"
                type="file"
                placeholder=""
                name="kbis"
                onChange={onChangeHandlerFile}
              />
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

export default AddPartner;
