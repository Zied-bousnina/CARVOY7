import React, { useEffect, useState } from "react";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "@/components/partials/auth/store";
import { useRouter } from "next/navigation";
import { ProfileService } from "@/_services/profile.service";
import Image from "next/image";

const ProfileLabel = (UserProfile) => {
  console.log(UserProfile)
  return (
    <div className="flex items-center">
      <div className="flex-1 ltr:mr-[10px] rtl:ml-[10px]">
        <div className="lg:h-8 lg:w-8 h-7 w-7 rounded-full">
        <Image
            src={UserProfile?.avatar || '/default-avatar.png'} // Fallback image
            alt="Profile"
            width={32} // Set width
            height={32} // Set height
            className="block w-full h-full object-cover rounded-full"
            onError={(e) => {
              e.target.src = '/default-avatar.png'; // Fallback image on error
            }}
            unoptimized
          />
        </div>
      </div>
      <div className="flex-none text-slate-600 dark:text-white text-sm font-normal items-center lg:flex hidden overflow-hidden text-ellipsis whitespace-nowrap">
        <span className="overflow-hidden text-ellipsis whitespace-nowrap w-[85px] block">
        {UserProfile?.user?.name ?
          UserProfile?.user?.name
          : UserProfile?.user?.contactName
        }
        </span>
        <span className="text-base inline-block ltr:ml-[10px] rtl:mr-[10px]">
          <Icon icon="heroicons-outline:chevron-down"></Icon>
        </span>
      </div>
    </div>
  );
};

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
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



  const ProfileMenu = [
    {
      label: "Profile",
      icon: "heroicons-outline:user",

      action: () => {
        router.push(`/${UserProfile?.user?.role.toLowerCase()}/profile`);
      },
    },
    {
      label: "Chat",
      icon: "heroicons-outline:chat",
      action: () => {
        console.log(UserProfile)
        router.push(`/${UserProfile?.user?.role.toLowerCase()}/chat`);
      },
    },

    ...(UserProfile?.user?.role.toLowerCase() === "admin"
    ? [
        {
          label: "Todo",
          icon: "heroicons-outline:clipboard-check",
          action: () => {
            router.push(`/${UserProfile?.user?.role.toLowerCase()}/todo`);
          },
        },
      ]
    : []),
    // {
    //   label: "Settings",
    //   icon: "heroicons-outline:cog",
    //   action: () => {
    //     router.push(`/${UserProfile?.user?.role.toLowerCase()}/profile`);
    //   },
    // },
    // {
    //   label: "Price",
    //   icon: "heroicons-outline:credit-card",
    //   action: () => {
    //     router.push(`/${UserProfile?.user?.role.toLowerCase()}/profile`);
    //   },
    // },
    // {
    //   label: "Faq",
    //   icon: "heroicons-outline:information-circle",
    //   action: () => {
    //     router.push(`/${UserProfile?.user?.role.toLowerCase()}/profile`);
    //   },
    // },
    {
      label: "Logout",
      icon: "heroicons-outline:login",
      action: () => {
        dispatch(handleLogout(false));
      },
    },
  ];

  return (
    <Dropdown label={ProfileLabel(UserProfile)} classMenuItems="w-[180px] top-[58px]">
      {ProfileMenu.map((item, index) => (
        <Menu.Item key={index}>
          {({ active }) => (
            <div
              onClick={() => item.action()}
              className={`${
                active
                  ? "bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-300 dark:bg-opacity-50"
                  : "text-slate-600 dark:text-slate-300"
              } block     ${
                item.hasDivider
                  ? "border-t border-slate-100 dark:border-slate-700"
                  : ""
              }`}
            >
              <div className={`block cursor-pointer px-4 py-2`}>
                <div className="flex items-center">
                  <span className="block text-xl ltr:mr-3 rtl:ml-3">
                    <Icon icon={item.icon} />
                  </span>
                  <span className="block text-sm">{item.label}</span>
                </div>
              </div>
            </div>
          )}
        </Menu.Item>
      ))}
    </Dropdown>
  );
};

export default Profile;
