"use client";
import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import { toast, ToastContainer } from "react-toastify";
import { AuthService } from "@/_services/auth.service";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";

const CompleteInfoForm = () => {
    const dispatch = useDispatch();

  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
const router = useRouter();
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onChangeHandlerFile = (e) => {
    setForm({
      ...form,
      kbis: e.target.files[0],
    });
  };

  const validateStep1 = () => {
    const errors = {};
    if (!form.name) errors.name = "Nom de l'entreprise est requis";
    if (!form.contactName) errors.contactName = "Nom de la personne de contact est requis";
    if (!form.addressPartner) errors.addressPartner = "Adresse est requise";

    if (!form.phoneNumber) errors.phoneNumber = "Numéro de téléphone est requis";

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors = {};
    if (!form.siret) errors.siret = "Numéro SIRET est requis";
    if (!form.kbis) errors.kbis = "K-Bis est requis";




    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(1);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!validateStep2()) return;

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    setIsSubmitting(true);

    // Simulate API call
console.log(form)

    Register(formData);

  };
  const Register = (data) => {

    setIsSubmitting(true);
    AuthService.CompletePartnerProfile(data)
      .then((res) => {




        refreshAuthToken()



        setError( {});
        setForm({});
        // router.push("/admin/Partenaires");

      })
      .catch((error) => {



  if (error) {
    const backendErrors = error;
    setError(backendErrors);

    // Display each error message using toast
    Object.keys(backendErrors).forEach((key) => {
      toast.error(backendErrors[key], {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  } else {
    // Handle generic error message
    toast.error("Une erreur interne est survenue. Veuillez réessayer plus tard.", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

      }).finally(() => {
        setIsSubmitting(false);

      }
      );
  };
  const refreshAuthToken = (data) => {

    setIsSubmitting(true);
    AuthService.refreshAuthToken()
      .then((res) => {

        setIsSubmitting(false);
        // You can show a success message here
        console.log("connected++++++++++++++",res)

                 dispatch(authActions.login({token: res.token, router:router}))



        setError( {});
        setForm({});
        // router.push("/admin/Partenaires");

      })
      .catch((error) => {



  if (error) {
    const backendErrors = error;
    setError(backendErrors);

    // Display each error message using toast
    Object.keys(backendErrors).forEach((key) => {
      toast.error(backendErrors[key], {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  } else {
    // Handle generic error message
    toast.error("Une erreur interne est survenue. Veuillez réessayer plus tard.", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

      }).finally(() => {
        setIsSubmitting(false);

      }
      );
  };
  return (
    <div>
      <ToastContainer />
      <form onSubmit={onSubmit} className="space-y-5">
        {currentStep === 1 && (
          <>
            <Textinput
              label="Nom de l'entreprise"
              name="name"
              type="text"
              placeholder="Entrez le nom de l'entreprise"
              onChange={onChangeHandler}
              error={error.name}
            />
            <Textinput
              label="Personne de contact"
              name="contactName"
              type="text"
              placeholder="Entrez le nom de la personne de contact"
              onChange={onChangeHandler}
              error={error.contactName}
            />
            <Textinput
              label="Adresse"
              name="addressPartner"
              type="text"
              placeholder="Entrez l'adresse"
              onChange={onChangeHandler}
              error={error.addressPartner}
            />

            <Textinput
              label="Numéro de téléphone"
              name="phoneNumber"
              type="tel"
              placeholder="Entrez le numéro de téléphone"
              onChange={onChangeHandler}
              error={error.phoneNumber}
            />
            <button type="submit"  className="btn btn-dark block w-full text-center" onClick={handleNext} >Suivant</button>
          </>
        )}

        {currentStep === 2 && (
          <>
            <Textinput
              label="SIRET"
              name="siret"
              type="text"
              placeholder="Entrez le numéro SIRET"
              onChange={onChangeHandler}
              error={error.siret}
            />
            <Textinput
              label="K-Bis"
              name="kbis"
              type="file"
              onChange={onChangeHandlerFile}
              error={error.kbis}
            />


            <div className="flex justify-between ">

              {/* <Button type="button" text="Précédent"  onClick={handlePrevious} /> */}
            <button type="submit" text="Suivant" className="btn btn-dark block w-full text-center m-2" onClick={handlePrevious}  >Précédent</button>

              {/* <Button type="submit" text="Valider" isLoading={isSubmitting} /> */}
            <button type="submit" text="Suivant" className="btn btn-dark block w-full text-center m-2"  >{isSubmitting ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Valider"
          )}</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default CompleteInfoForm;
