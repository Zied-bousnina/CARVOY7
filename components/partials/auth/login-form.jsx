"use client";

import React, { useEffect, useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/ui/Checkbox";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { handleLogin, handlelogin2 } from "./store";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
// import AuthService from "@/_services/auth.service";
import { authActions } from "@/store/auth/authSlice";
import { AuthService } from "@/_services/auth.service";

const validationSchema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();
const LoginForm = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, seterrors] = useState("")

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {

      setIsLoading(true);
      AuthService.login(values)
        .then((res) => {


          dispatch(authActions.login({token: res.token, router:router}))
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
        .catch((err) => {seterrors(err)})
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  return (
    <>
      <ToastContainer />
      <form onSubmit={formik.handleSubmit} className="space-y-4 ">
        <Textinput
          id="email"
          variant="outlined"
          name="email"
          placeholder="Enter email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Textinput
          id="password"
          name="password"
          label="passwrod"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <div className="flex justify-between">
          <Checkbox
            value={checked}
            onChange={() => setChecked(!checked)}
            label="Keep me signed in"
          />

          <Link
            href="/forgot-password"
            className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
          >
            Mot de passe oublié ?{" "}
          </Link>
        </div>
        {errors && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Erreur!</strong>
            <span className="block sm:inline"> Informations d'identification invalides.</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                onClick={() => seterrors("")}
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.348 5.652a.5.5 0 0 0-.707 0L10 9.293 6.36 5.652a.5.5 0 0 0-.708.708L9.293 10l-3.64 3.64a.5.5 0 0 0 .708.708L10 10.707l3.64 3.64a.5.5 0 0 0 .708-.708L10.707 10l3.64-3.64a.5.5 0 0 0 0-.708z"
                />
              </svg>
            </span>
          </div>
        )
          }

        <button
          disabled={isLoading}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          type="submit"
          className="btn btn-dark block w-full text-center"
        >
          {isLoading ? (
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
            "Se connecter"
          )}
        </button>
      </form>
    </>
  );
};

export default LoginForm;

/*

  const onSubmit = (data) => {
    // const user = users.find(
    //   (user) => user.email === data.email && user.password === data.password
    // );
 if(data.email !="" && data.password!="") {
  const data2 =  {
    email: data.email,
    password: data.password,
  }

   dispatch(handlelogin2(data2, router))
   .then((res) => {

    if(res.type =="auth/handlelogin/rejected") {
      toast.error("Invalid credentials", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    }else if(
      res.type =="auth/handlelogin/fulfilled"
    ) {
      if(res?.payload?.role=="RH") {
        router.push("/rh")
      }else {

        if(res.payload?.status=="NOTEXIST") {
          router.push(`/register/${res.payload?.id}`)
        }else if(res.payload?.status=="PENDING") {
          router.push(`/pending/${res.payload?.id}`)
        }else if(res.payload?.status=="NOTVALIDATED"){
          router.push(`/declined/${res.payload?.id}`)
        }
      }
      // setTimeout(() => {
      //   router.push("/analytics");
      // }, 1500);

    }

    const user  = parseJwt(res.payload?.token)

    // if(user?.role=="ADMIN") {
    //   router.push("/admin")
    // } else if(user?.role=="RH") {
    //   // router.push("/consultant")
    //   router.push("/rh")
    // }



      // toast.success("Bienvenue", {
      //   position: "top-right",
      //   autoClose: 1500,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
      // setTimeout(() => {
      //   router.push("/analytics");
      // }, 1500);

  }
  )
  .catch((err) => {

    
  });

  }else {
    toast.error("Veuillez remplir les champs", {
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
    // if (user) {

    //   // setTimeout(() => {
    //   //   router.push("/analytics");
    //   // }, 1500);
    // } else {
    //   toast.error("Invalid credentials", {
    //     position: "top-right",
    //     autoClose: 1500,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // }
  };

*/
