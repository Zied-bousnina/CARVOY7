"use client";

import React from "react";
import Link from "next/link";
import ForgotPass from "@/components/partials/auth/forgot-pass";
import useDarkMode from "@/hooks/useDarkMode";

const ForgotPassPage = () => {
  const [isDark] = useDarkMode();
  return (
    <div className="loginwrapper">
      <div className="lg-inner-column">
        <div className="right-column relative">
          <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
            <div className="auth-box2 flex flex-col justify-center h-full">
              <div className="mobile-logo text-center mb-6 lg:hidden block">
                <Link href="/">
                  <img
                    src={
                      isDark
                        ? "/assets/images/logo/logo-white.svg"
                        : "/assets/images/logo/logo.svg"
                    }
                    alt=""
                    className="mx-auto"
                  />
                </Link>
              </div>
              <div className="text-center 2xl:mb-10 mb-5">
                <h4 className="font-medium mb-4">Mot de passe oublié ?</h4>
                <div className="text-slate-500 dark:text-slate-400 text-base">
                  Réinitialisez votre mot de passe avec Dashcode.
                </div>
              </div>
              <div className="font-normal text-base text-slate-500 dark:text-slate-400 text-center px-2 bg-slate-100 dark:bg-slate-600 rounded py-3 mb-4 mt-10">
                Entrez votre email et les instructions vous seront envoyées !
              </div>

              <ForgotPass />
              <div className="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-8 uppercase text-sm">
                Vous avez oublié ?
                <Link
                  href="/"
                  className="text-slate-900 dark:text-white font-medium hover:underline"
                >
                  Renvoyez-moi
                </Link>
                à la page de connexion
              </div>
            </div>
            <div className="auth-footer text-center">
              Copyright {new Date().getFullYear()}, Dashcode Tous droits réservés.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassPage;
