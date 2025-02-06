"use client"
import React, {useState} from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const PageNotFound = () => {
  const userAuth = useSelector((state) => state.userAuth);

   const [menuItemsToDisplay, setMenuItemsToDisplay] = useState("");
    useEffect(() => {
      if (userAuth.role === "PARTNER") {
        setMenuItemsToDisplay("/partner");
      } else if (userAuth.role === "ADMIN") {
        setMenuItemsToDisplay("/admin");
      }
    }, [userAuth.role]);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center py-20 dark:bg-slate-900">
      <img src="/assets/images/all-img/404-2.svg" alt="" />
      <div className="max-w-[546px] mx-auto w-full mt-12">
        <h4 className="text-slate-900 mb-4">Oops! Page introuvable</h4>
        <div className="dark:text-white text-base font-normal mb-10">
        Il semble que la page que vous recherchez n'existe pas ou a été déplacée. Veuillez vérifier l'URL ou revenez à la page d'accueil.
        </div>
      </div>
      <div className="max-w-[300px] mx-auto w-full">
        <Link
          href={menuItemsToDisplay}
          className="btn bg-white hover:bg-opacity-75 transition-all duration-150 block text-center"
        >
          Retour A L'accueil
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
