"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import Alert from "@/components/ui/Alert";
import { StripeService } from "@/_services/stripe.service";

const PaymentGetway = () => {
  const [config, setConfig] = useState(null); // Stores existing configuration
  const [form, setForm] = useState({
    publishableKey: "",
    secretKey: "",
    webhookSecret: "",
  });
  const [isEditing, setIsEditing] = useState(false); // Controls view/edit mode
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const router = useRouter();

  // Fetch existing configuration on load
  useEffect(() => {
    StripeService.GetStripeConfig()
      .then((data) => {
        console.log("dtata", data.data)
        if (data) {
          setConfig(data.data); // Save existing config to display
          toast.info("Configuration existante trouvée. Cliquez sur Modifier pour la mettre à jour.", {
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
      })
      .catch((err) => {
        console.error("Erreur lors du chargement de la configuration :", err.message);
      });
  }, []);

  // Handle input changes
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Submit configuration
  const onSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!form.publishableKey || !form.secretKey) {
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

    // Data submission using StripeService
    setIsSubmitting(true);
    StripeService.SaveStripeConfig(form)
      .then(() => {
        setIsSubmitting(false);
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
        setConfig(form); // Update config with the new values
        setIsEditing(false); // Return to view mode
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError(error || "Une erreur s'est produite.");
      });
  };

  // Render view mode
  if (!isEditing && config) {
    return (
      <div>
        <ToastContainer />
        <Card title="Configuration actuelle de la Passerelle de Paiement">
          <div style={{ padding: "20px" }}>
            <p>
              <strong>Clé Publishable :</strong> {config.publishableKey || "Non configurée"}
            </p>
            <p>
              <strong>Clé Secrète :</strong> {config.secretKey || "Non configurée"}
            </p>
            <p>
              <strong>Secret Webhook :</strong> {config.webhookSecret || "Non configuré"}
            </p>
            <Button
              onClick={() => {
                setIsEditing(true);
                setForm(config); // Pre-fill the form with existing data
              }}
              text="Modifier"
              className="btn-dark mt-4"
            />
          </div>
        </Card>
      </div>
    );
  }

  // Render edit mode
  return (
    <div>
      <ToastContainer />
      <Card title={config ? "Modifier la configuration Stripe" : "Ajouter une configuration Stripe"}>
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
            {/* Publishable Key */}
            <div>
              <Textinput
                label="Clé Publishable"
                type="text"
                placeholder="Exemple : pk_live_51HxxxxT4xxxxxxxxxxxxxxx"
                required
                name="publishableKey"
                value={form.publishableKey}
                onChange={onChangeHandler}
              />
            </div>

            {/* Secret Key */}
            <div>
              <Textinput
                label="Clé Secrète"
                type="text"
                placeholder="Exemple : sk_live_51HxxxxT4xxxxxxxxxxxxxxx"
                required
                name="secretKey"
                value={form.secretKey}
                onChange={onChangeHandler}
              />
            </div>

            {/* Webhook Secret */}
            <div>
              <Textinput
                label="Secret Webhook (Optionnel)"
                type="text"
                placeholder="Exemple : whsec_xxxxxxxxyyyyyyyyyzzzzzzzzz"
                name="webhookSecret"
                value={form.webhookSecret}
                onChange={onChangeHandler}
              />
            </div>
          </div>

          {error && (
            <Alert label={error + " !"} className="alert-outline-danger" />
          )}

          {/* Submit Button */}
          <div className="ltr:text-right rtl:text-left space-x-3 rtl:space-x-reverse">
            <Button
              isLoading={isSubmitting}
              type="submit"
              text="Enregistrer"
              className="btn-dark"
            />
            <Button
              onClick={() => setIsEditing(false)}
              text="Annuler"
              className="btn-light"
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default PaymentGetway;
