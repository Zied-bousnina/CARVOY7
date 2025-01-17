"use client";

import React, { Fragment } from "react";
import  { useEffect, useState } from "react";
import useDarkMode from "@/hooks/useDarkMode";
import Link from "next/link";
import useWidth from "@/hooks/useWidth";
import { ProfileService } from "@/_services/profile.service";
const Logo = ({notClicked}) => {
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();
  const [UserProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  const FindProfile = () => {
    return ProfileService.GetProfile()
      .then((res) => {
        console.log("setUserProfile list",res);
        setUserProfile(res       ); // Update the state with the correct value
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("done");
      });
  };



  const groupAsyncFunctions = () => {
    setIsLoading(true);
    Promise.all([FindProfile()])
      .then(() => {})
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log('profile')
    groupAsyncFunctions();
  }, []); // Empty array to only run on mount



  return (
    <div>
      <Link href={`/${ UserProfile?.user?.role.toLowerCase()}`}>
        <React.Fragment>
          {width >= breakpoints.xl ? (
            <img
              src={
                isDark
                  ? "/assets/images/logo/logo-white.svg"
                  : "/assets/images/logo/logo.svg"
              }
              alt=""
            />
          ) : (
            <img
              src={
                isDark
                  ? "/assets/images/logo/logo-c-white.svg"
                  : "/assets/images/logo/logo-c.svg"
              }
              alt=""
            />
          )}
        </React.Fragment>
      </Link>
    </div>
  );
};

export default Logo;
