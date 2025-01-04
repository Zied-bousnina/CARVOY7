import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFormik } from "formik";
import { AuthService } from "@/_services/auth.service";
import { ToastContainer, toast } from "react-toastify";
const schema = yup
  .object({
    email: yup.string().email("Email invalide").required("L'email est requis"),
  })
  .required();

const ForgotPass = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      setIsLoading(true);
      setErrors({});
      setSuccess("");
      AuthService.forgotPassword(values)
        .then((res) => {
          // Handle success response

          setSuccess("Un lien de réinitialisation a été envoyé à votre adresse e-mail !");
          toast.success("Un lien de réinitialisation a été envoyé à votre adresse e-mail !", {
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
        .catch((err) => {
          // Handle error response

          if ( err.error) {
            setErrors({ message: err.error });
            toast.error(err.error, {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            setErrors({ message: "Une erreur interne est survenue. Veuillez réessayer plus tard." });
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
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <ToastContainer />
      <Textinput
        name="email"
        label="Email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        placeholder="Entrez votre email"
      />

      {errors.message && (
        <div className="text-red-600 text-sm mt-2">
          {errors.message}
        </div>
      )}
      {
        success && (
          <div className="text-green-600 text-sm mt-2">
            {success}
          </div>
        )
      }

      <button className="btn btn-dark block w-full text-center" disabled={isLoading}>
        {isLoading ? "Chargement..." : "Envoyer un email de récupération"}
      </button>
    </form>
  );
};

export default ForgotPass;
