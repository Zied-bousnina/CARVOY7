import React, { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { useSelector } from "react-redux";
import { UserService } from "@/_services/user.service";
import { ProfileService } from "@/_services/profile.service";

const MobileFooter = () => {
  const router = useRouter();
  const userAuth = useSelector((state) => state.userAuth);
  const [UserNotification, setUserNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [UserProfile, setUserProfile] = useState({});

   const [menuItemsToDisplay, setMenuItemsToDisplay] = useState("");
    useEffect(() => {
      if (userAuth.role === "PARTNER") {
        setMenuItemsToDisplay("/partner");
      } else if (userAuth.role === "ADMIN") {
        setMenuItemsToDisplay("/admin");
      }
    }, [userAuth.role]);
    const FindCurrentUserNotification = () => {
      return UserService.GetCurrentUser()
        .then((res) => {
          console.log("setUserNotification list",res);
          setUserNotification(res?.user?.Newsocket
          ); // Update the state with the correct value
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          console.log("done");
        });
    };
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
      Promise.all([FindCurrentUserNotification(),FindProfile()])
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
    <div className="bg-white bg-no-repeat custom-dropshadow footer-bg dark:bg-slate-700 flex justify-around items-center backdrop-filter backdrop-blur-[40px] fixed left-0 w-full z-[9999] bottom-0 py-[12px] px-4">

      <Link
        href={`${menuItemsToDisplay}/profile`}
        className="relative bg-white bg-no-repeat backdrop-filter backdrop-blur-[40px] rounded-full footer-bg dark:bg-slate-700 h-[65px] w-[65px] z-[-1] -mt-[40px] flex justify-center items-center"
      >
        <div className="h-[50px] w-[50px] rounded-full relative left-[0px] top-[0px] custom-dropshadow">
          <img
            src={UserProfile?.avatar || '/default-avatar.png'}
            alt=""
            className={` w-full h-full rounded-full
          ${
            router.pathname === "profile"
              ? "border-2 border-primary-500"
              : "border-2 border-slate-100"
          }
              `}
          />

        </div>
      </Link>
      <Link
      href={`${menuItemsToDisplay}/notifications`}
      >
        <div>
          <span
            className={` relative cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center mb-1
      ${
        router.pathname === `${menuItemsToDisplay}/notifications`
          ? "text-primary-500"
          : "dark:text-white text-slate-900"
      }
          `}
          >
            <Icon icon="heroicons-outline:bell" />
            <span className="absolute right-[17px] lg:top-0 -top-2 h-4 w-4 bg-red-500 text-[8px] font-semibold flex flex-col items-center justify-center rounded-full text-white z-[99]">
           { UserNotification?.length}
            </span>
          </span>
          <span
            className={` block text-[11px]
         ${
           router.pathname === `${menuItemsToDisplay}/notifications`
             ? "text-primary-500"
             : "text-slate-600 dark:text-slate-300"
         }
        `}
          >
            Notifications
          </span>
        </div>
      </Link>
    </div>
  );
};

export default MobileFooter;
