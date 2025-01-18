"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import { toast, ToastContainer } from "react-toastify";
import { SocialService } from "@/_services/SocialLoginConfig.service";

const SocialLoginConfig = () => {
  const [googleConfig, setGoogleConfig] = useState({
    clientId: "",
    clientSecret: "",
  });
  const [linkedinConfig, setLinkedinConfig] = useState({
    clientId: "",
    clientSecret: "",
  });
  const [activeTab, setActiveTab] = useState("google");
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch existing configuration on load
  useEffect(() => {
    SocialService.GetSocialConfig()
      .then((data) => {
        if (data.google) setGoogleConfig(data.google);
        if (data.linkedin) setLinkedinConfig(data.linkedin);

        toast.info("Configurations existantes chargées.", {
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
        console.error("Error fetching config:", error.message);
        toast.error("Erreur lors du chargement des configurations.", {
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

  const handleChange = (e, platform) => {
    const { name, value } = e.target;
    if (platform === "google") {
      setGoogleConfig({ ...googleConfig, [name]: value });
    } else {
      setLinkedinConfig({ ...linkedinConfig, [name]: value });
    }
  };

  const handleSubmit = (e, platform) => {
    e.preventDefault();
    const config = platform === "google" ? googleConfig : linkedinConfig;

    if (!config.clientId || !config.clientSecret) {
      toast.error("Veuillez remplir tous les champs obligatoires.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    setIsSubmitting(true);
    SocialService.SaveSocialConfig({ ...config, platform })
      .then(() => {
        toast.success("Configuration enregistrée avec succès !", {
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
        console.error("Error saving config:", error.message);
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
      <div className="tabs flex mb-4">
        <button
          className={`tab px-4 py-2 ${activeTab === "google" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("google")}
        >
          Google
        </button>
        <button
          className={`tab px-4 py-2 ${activeTab === "linkedin" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("linkedin")}
        >
          LinkedIn
        </button>
      </div>

      {activeTab === "google" && (
        <Card title="Configurer Google">
          {!isEditing ? (
            <div className="grid grid-cols-1 gap-4 mt-4">
              <div>
                <label className="block font-medium text-gray-700">Google Client ID:</label>
                <p className="bg-gray-100 p-2 rounded text-sm">{googleConfig.clientId || "Non configuré"}</p>
              </div>
              <div>
                <label className="block font-medium text-gray-700">Google Client Secret:</label>
                <p className="bg-gray-100 p-2 rounded text-sm">{googleConfig.clientSecret ||"Non configuré"}</p>
              </div>
              <div>
                <label className="block font-medium text-gray-700">Google Callback URL:</label>
                <p className="bg-gray-100 p-2 rounded text-sm">/api/users/google/callback</p>
              </div>
              <Button
                text="Modifier"
                className="btn-dark mt-4"
                onClick={() => setIsEditing(true)}
              />
            </div>
          ) : (
            <form onSubmit={(e) => handleSubmit(e, "google")}>
              <div className="grid grid-cols-1 gap-4 mt-4">
                <Textinput
                  label="Google Client ID"
                  type="text"
                  required
                  name="clientId"
                  value={googleConfig.clientId}
                  onChange={(e) => handleChange(e, "google")}
                />
                <Textinput
                  label="Google Client Secret"
                  type="text"
                  required
                  name="clientSecret"
                  value={googleConfig.clientSecret}
                  onChange={(e) => handleChange(e, "google")}
                />
              </div>

              <div className="text-right mt-4 space-x-2">
                <Button isLoading={isSubmitting} type="submit" text="Enregistrer" className="btn-dark" />
                <Button
                  text="Annuler"
                  className="btn-light"
                  onClick={() => setIsEditing(false)}
                />
              </div>
            </form>
          )}
        </Card>
      )}

      {activeTab === "linkedin" && (
        <Card title="Configurer LinkedIn">
          {!isEditing ? (
            <div className="grid grid-cols-1 gap-4 mt-4">
              <div>
                <label className="block font-medium text-gray-700">LinkedIn Client ID:</label>
                <p className="bg-gray-100 p-2 rounded text-sm">{linkedinConfig.clientId || "Non configuré"}</p>
              </div>
              <div>
                <label className="block font-medium text-gray-700">LinkedIn Client Secret:</label>
                <p className="bg-gray-100 p-2 rounded text-sm">{linkedinConfig.clientSecret || "Non configuré"}</p>
              </div>
              <div>
                <label className="block font-medium text-gray-700">LinkedIn Callback URL:</label>
                <p className="bg-gray-100 p-2 rounded text-sm">/api/users/linkedin/callback</p>
              </div>
              <Button
                text="Modifier"
                className="btn-dark mt-4"
                onClick={() => setIsEditing(true)}
              />
            </div>
          ) : (
            <form onSubmit={(e) => handleSubmit(e, "linkedin")}>
              <div className="grid grid-cols-1 gap-4 mt-4">
                <Textinput
                  label="LinkedIn Client ID"
                  type="text"
                  required
                  name="clientId"
                  value={linkedinConfig.clientId}
                  onChange={(e) => handleChange(e, "linkedin")}
                />
                <Textinput
                  label="LinkedIn Client Secret"
                  type="text"
                  required
                  name="clientSecret"
                  value={linkedinConfig.clientSecret}
                  onChange={(e) => handleChange(e, "linkedin")}
                />
              </div>

              <div className="text-right mt-4 space-x-2">
                <Button isLoading={isSubmitting} type="submit" text="Enregistrer" className="btn-dark" />
                <Button
                  text="Annuler"
                  className="btn-light"
                  onClick={() => setIsEditing(false)}
                />
              </div>
            </form>
          )}
        </Card>
      )}
    </div>
  );
};

export default SocialLoginConfig;
