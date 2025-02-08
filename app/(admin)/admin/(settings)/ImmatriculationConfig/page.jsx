"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import { toast, ToastContainer } from "react-toastify";
import { SocialService } from "@/_services/SocialLoginConfig.service"; // Modify if using a different service

const ImmatriculationConfig = () => {
  const [immatConfig, setImmatConfig] = useState({
    apiKey: "",
    provider: "apiplaqueimmatriculation", // Default provider
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch existing configuration on load
  useEffect(() => {
    SocialService.GetSocialConfig()
      .then((data) => {
        if (data.immatApi) {
          setImmatConfig(data.immatApi);
        }
        toast.info("Configuration existante chargée.", {
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
      .catch((error) => {
        console.error("Erreur lors du chargement de la configuration :", error.message);
        toast.error("Erreur lors du chargement de la configuration.", {
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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setImmatConfig({ ...immatConfig, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    SocialService.SaveSocialConfig({
      platform: "immatApi",
      apiKey: immatConfig.apiKey,
      provider: immatConfig.provider,
    })
      .then(() => {
        toast.success("Configuration API d'immatriculation enregistrée avec succès !", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Erreur lors de l'enregistrement :", error.message);
        toast.error("Une erreur s'est produite lors de l'enregistrement.", {
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
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div>
      <ToastContainer />
      <Card title="Configurer l'API d'Immatriculation">
        {!isEditing ? (
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div>
              <label className="block font-medium text-gray-700">API Key:</label>
              <p className="bg-gray-100 p-2 rounded text-sm">
                {immatConfig.apiKey ? immatConfig.apiKey : "Non configuré"}
              </p>
            </div>
            <div>
              <label className="block font-medium text-gray-700">Fournisseur:</label>
              <p className="bg-gray-100 p-2 rounded text-sm">{immatConfig.provider}</p>
            </div>
            <div>
              <label className="block font-medium text-gray-700">Callback URL:</label>
              <p className="bg-gray-100 p-2 rounded text-sm">/api/immat/callback</p>
            </div>
            <Button text="Modifier" className="btn-dark mt-4" onClick={() => setIsEditing(true)} />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 mt-4">
              <Textinput
                label="API Key"
                type="text"
                name="apiKey"
                value={immatConfig.apiKey}
                onChange={handleChange}
                placeholder="Exemple : XXXXXXXXXXXX"
              />
              <Textinput
                label="Fournisseur"
                type="text"
                name="provider"
                value={immatConfig.provider}
                onChange={handleChange}
                placeholder="Exemple : apiplaqueimmatriculation"
              />
            </div>

            <div className="text-right mt-4 space-x-2">
              <Button isLoading={isSubmitting} type="submit" text="Enregistrer" className="btn-dark" />
              <Button text="Annuler" className="btn-light" onClick={() => setIsEditing(false)} />
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};

export default ImmatriculationConfig;
