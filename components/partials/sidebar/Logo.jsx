import React, { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import useDarkMode from "@/hooks/useDarkMode";
import useSidebar from "@/hooks/useSidebar";
import useSemiDark from "@/hooks/useSemiDark";
import useSkin from "@/hooks/useSkin";
import { ProfileService } from "@/_services/profile.service";

const SidebarLogo = ({ menuHover }) => {

  const [isDark] = useDarkMode();
  const [collapsed, setMenuCollapsed] = useSidebar();
  // semi dark
  const [isSemiDark] = useSemiDark();
  // skin
  const [skin] = useSkin();
  const [UserProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  const FindProfile = () => {
    return ProfileService.GetProfile()
      .then((res) => {
       
        setUserProfile(res       ); // Update the state with the correct value
      })
      .catch((err) => {
        
      })
      .finally(() => {
       
      });
  };



  const groupAsyncFunctions = () => {
    setIsLoading(true);
    Promise.all([FindProfile()])
      .then(() => {})
      .catch((err) => {
        
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    
    groupAsyncFunctions();
  }, []); // Empty array to only run on mount


  return (
    <div
      className={` logo-segment flex justify-between items-center bg-white dark:bg-slate-800 z-[9] py-6  px-4
      ${menuHover ? "logo-hovered" : ""}
      ${
        skin === "bordered"
          ? " border-b border-r-0 border-slate-200 dark:border-slate-700"
          : " border-none"
      }

      `}
    >
      <Link href={`/${ UserProfile?.user?.role.toLowerCase()}`}>
        <div className="flex items-center space-x-4">
          <div className="logo-icon">
            {!isDark && !isSemiDark ? (
              <img src="/assets/images/logo/logo_carvoy.svg" alt="" />
            ) : (
              <img src="/assets/images/logo/logo-c-white.svg" alt="" />
            )}
          </div>

          {(!collapsed || menuHover) && (
            <div>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                CarVoy7
              </h1>
            </div>
          )}
        </div>
      </Link>

      {(!collapsed || menuHover) && (
        <div
          onClick={() => setMenuCollapsed(!collapsed)}
          className={`h-4 w-4 border-[1.5px] border-slate-900 dark:border-slate-700 rounded-full transition-all duration-150
          ${
            collapsed
              ? ""
              : "ring-2 ring-inset ring-offset-4 ring-black-900 dark:ring-slate-400 bg-slate-900 dark:bg-slate-400 dark:ring-offset-slate-700"
          }
          `}
        ></div>
      )}
    </div>
  );
};

export default SidebarLogo;
