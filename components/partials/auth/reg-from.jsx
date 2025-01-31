"use client";
import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import { toast, ToastContainer } from "react-toastify";
import { AuthService } from "@/_services/auth.service";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";

const RegForm = () => {
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
    if (name === "type") {
      setError((prevError) => ({ ...prevError, name: undefined }));
    }
  };

  const onChangeHandlerFile = (e) => {
    setForm({
      ...form,
      kbis: e.target.files[0],
    });
  };

  const validateStep1 = () => {
    const errors = {};
    if (!form.type) errors.type = "Veuillez sélectionner un type";
    if (form.type === "entreprise" && !form.name) {
      errors.name = "Nom de l'entreprise est requis";
    }


    if (!form.contactName) errors.contactName = "Nom de la personne de contact est requis";
    if (!form.addressPartner) errors.addressPartner = "Adresse est requise";
    if (!form.email) errors.email = "Email est requis";
    if (!form.phoneNumber) errors.phoneNumber = "Numéro de téléphone est requis";
console.log(form.type === "entreprise" && !form.name)
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors = {};
    if (!form.siret) errors.siret = "Numéro SIRET est requis";
    if (!form.kbis) errors.kbis = "K-Bis est requis";
    if (!form.password) {
      errors.password = "Mot de passe est requis";
    } else if (form.password.length < 6) {
      errors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }

    if (!form.confirmpassword) {
      errors.confirmpassword = "Confirmez votre mot de passe";
    } else if (form.password !== form.confirmpassword) {
      errors.confirmpassword = "Les mots de passe ne correspondent pas";
    }

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

    Register(formData);

  };
  const Register = (data) => {

    setIsSubmitting(true);
    AuthService.Register(data)
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
          AuthService.login({
            email:form.email,
            password:form.password,
          })
                .then((ress) => {


                  dispatch(authActions.login({token: ress.token, router:router}))
                  toast.success("Bienvenue", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                })

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
             <label className="block text-sm font-medium text-gray-700">Type d'utilisateur</label>
            <select
              name="type"
              onChange={onChangeHandler}
              value={form.type}
              className="border p-2 w-full rounded"
            >
              <option value="">Sélectionner</option>
              <option value="entreprise">Entreprise</option>
              <option value="particulier">Particulier</option>
            </select>
            {error.type && <p className="text-red-500 text-sm">{error.type}</p>}

            {form.type === "entreprise" && (
              <Textinput
                label="Nom de l'entreprise"
                name="name"
                type="text"
                placeholder="Entrez le nom de l'entreprise"
                onChange={onChangeHandler}
                error={error.name}
              />
            )}
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
              label="Email"
              name="email"
              type="email"
              placeholder="Entrez l'email"
              onChange={onChangeHandler}
              error={error.email}
            />
            <Textinput
              label="Numéro de téléphone"
              name="phoneNumber"
              type="tel"
              placeholder="Entrez le numéro de téléphone"
              onChange={onChangeHandler}
              error={error.phoneNumber}
            />
            <Button type="button" text="Suivant" onClick={handleNext} />
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
            <Textinput
              label="Mot de passe"
              name="password"
              type="password"
              placeholder="Entrez votre mot de passe"
              onChange={onChangeHandler}
              error={error.password}
            />
            <Textinput
              label="Confirmer le mot de passe"
              name="confirmpassword"
              type="password"
              placeholder="Confirmez votre mot de passe"
              onChange={onChangeHandler}
              error={error.confirmpassword}
            />
            <div className="flex justify-between">
              <Button type="button" text="Précédent" onClick={handlePrevious} />
              <Button type="submit" text="Valider" isLoading={isSubmitting} />
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default RegForm;
