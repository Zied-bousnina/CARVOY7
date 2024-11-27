import React, { useEffect, useState } from "react";
import Link from "next/link";
import useDarkMode from "@/hooks/useDarkMode";

import MainLogo from "@/assets/images/logo/logo.svg";
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import { ProfileService } from "@/_services/profile.service";
const MobileLogo = () => {
  const [isDark] = useDarkMode();
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
    <Link href={`/${ UserProfile?.user?.role.toLowerCase()}`}>
      <img src={isDark ? LogoWhite : MainLogo} alt="" />
    </Link>
  );
};

export default MobileLogo;
