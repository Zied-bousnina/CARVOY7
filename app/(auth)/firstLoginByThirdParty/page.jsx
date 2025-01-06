"use client";

import React from "react";
import Link from "next/link";
import useDarkMode from "@/hooks/useDarkMode";
import RegForm from "@/components/partials/auth/reg-from";
import CompleteInfoForm from "@/components/partials/auth/CompletInfo-form";

const CompleteProfile = () => {
  const [isDark] = useDarkMode();

  return (
    <>
      <div className="loginwrapper">
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
                  <h4 className="font-medium">Complétez votre profil</h4>
                  <div className="text-slate-500 dark:text-slate-400 text-base">
                    Ajoutez vos informations manquantes pour finaliser
                    l'inscription.
                  </div>
                </div>
                {/* Use RegForm component for the form */}
                <CompleteInfoForm />
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

export default CompleteProfile;
