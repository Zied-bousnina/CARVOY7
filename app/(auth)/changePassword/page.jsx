"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import useDarkMode from "@/hooks/useDarkMode";
import ChangePasswordForm from "@/components/partials/auth/ChangePassword-form";
import { toast, ToastContainer } from "react-toastify";

const ChangePassword = () => {
  const [isDark] = useDarkMode();

  useEffect(() => {
    // Show welcome message and prompt the user to change their password
    toast.info(
      "Bienvenue pour votre première connexion ! Veuillez changer votre mot de passe pour sécuriser votre compte.",
      {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  }, []);

  return (
    <>
      <div className="loginwrapper">
        <ToastContainer />
        <div className="lg-inner-column">
          <div className="right-column relative bg-white dark:bg-slate-800">
            <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
              <div className="auth-box h-full flex flex-col justify-center">
                <div className="mobile-logo text-center mb-6 lg:hidden block">
                  <Link href="/">
                    <img
                      src={
                        isDark
                          ? "/assets/images/logo/logo-white.svg"
                          : "/assets/images/logo/logo.svg"
                      }
                      alt="Carvoy7 Logo"
                      className="mx-auto"
                    />
                  </Link>
                </div>
                <div className="text-center 2xl:mb-10 mb-5">
                  <h4 className="font-medium">Bienvenue !</h4>
                  <div className="text-slate-500 dark:text-slate-400 text-base">
                    Pour votre sécurité, veuillez changer votre mot de passe
                    lors de cette première connexion.
                  </div>
                </div>
                <ChangePasswordForm />
              </div>
              <div className="auth-footer text-center">
                Copyright {new Date().getFullYear()}, Carvoy7 Tous droits
                réservés.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
