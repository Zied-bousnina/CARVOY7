"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import { toast, ToastContainer } from "react-toastify";
import { SocialService } from "@/_services/SocialLoginConfig.service"; // Modify if using a different service

const GoogleMapsConfig = () => {
  const [googleMapsConfig, setGoogleMapsConfig] = useState({
    apiKey: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch existing configuration on load
  useEffect(() => {
    SocialService.GetSocialConfig()
      .then((data) => {
        if (data.googleMaps) {
          setGoogleMapsConfig(data.googleMaps);
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
    setGoogleMapsConfig({ ...googleMapsConfig, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!googleMapsConfig.apiKey) {
    //   toast.error("Veuillez entrer votre clé API Google Maps.", {
    //     position: "top-right",
    //     autoClose: 1500,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    //   return;
    // }

    setIsSubmitting(true);
    SocialService.SaveSocialConfig({ platform: "googleMaps", apiKey: googleMapsConfig.apiKey })
      .then(() => {
        toast.success("Configuration Google Maps enregistrée avec succès !", {
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
      <Card title="Configurer Google Maps">
        {!isEditing ? (
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div>
              <label className="block font-medium text-gray-700">Google Maps API Key:</label>
              <p className="bg-gray-100 p-2 rounded text-sm">
                {googleMapsConfig.apiKey ? googleMapsConfig.apiKey : "Non configuré"}
              </p>
            </div>
            <div>
              <label className="block font-medium text-gray-700">Google Maps Callback URL:</label>
              <p className="bg-gray-100 p-2 rounded text-sm">/api/maps/callback</p>
            </div>
            <Button text="Modifier" className="btn-dark mt-4" onClick={() => setIsEditing(true)} />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 mt-4">
              <Textinput
                label="Google Maps API Key"
                type="text"

                name="apiKey"
                value={googleMapsConfig.apiKey}
                onChange={handleChange}
                placeholder="Exemple : AIzSyDxxxxxx"
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

export default GoogleMapsConfig;
