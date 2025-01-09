"use client";

import React from "react";
import Link from "next/link";
import useDarkMode from "@/hooks/useDarkMode";
import RegForm from "@/components/partials/auth/reg-from";
import Social from "@/components/partials/auth/social";

const Register = () => {
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
                      alt=""
                      className="mx-auto"
                    />
                  </Link>
                </div>
                <div className="text-center 2xl:mb-10 mb-5">
                  <h4 className="font-medium">S'inscrire</h4>
                  <div className="text-slate-500 dark:text-slate-400 text-base">
                    Créez un compte pour commencer à utiliser CarVoy7
                  </div>
                </div>
                <RegForm />
                <div className=" relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6">
                  <div className=" absolute inline-block  bg-white dark:bg-slate-800 left-1/2 top-1/2 transform -translate-x-1/2 px-4 min-w-max text-sm  text-slate-500  dark:text-slate-400font-normal ">
                    Ou continuez avec
                  </div>
                </div>
                <div className="max-w-[242px] mx-auto mt-8 w-full">
                  <Social />
                </div>
                <div className="max-w-[225px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-6 uppercase text-sm">
                  Déjà enregistré ?
                  <Link
                    href="/"
                    className="text-slate-900 dark:text-white font-medium hover:underline"
                  >
                    Se connecter
                  </Link>
                </div>
              </div>
              <div className="auth-footer text-center">
                Copyright {new Date().getFullYear()}, Carvoy7 Tous droits réservés.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
