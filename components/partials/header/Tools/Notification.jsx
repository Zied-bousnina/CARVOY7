import React, { useEffect, useState } from "react";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { notifications } from "@/constant/data";
import { ProfileService } from "@/_services/profile.service";
import { UserService } from "@/_services/user.service";
import { formatDistanceToNow } from 'date-fns';
import { useSelector } from "react-redux";
const notifyLabel = (notifCount) => {
  return (
    <span className="relative lg:h-[32px] lg:w-[32px] lg:bg-slate-100 text-slate-900 lg:dark:bg-slate-900 dark:text-white cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center">
      <Icon icon="heroicons-outline:bell" className="animate-tada" />
      <span className="absolute lg:right-0 lg:top-0 -top-2 -right-2 h-4 w-4 bg-red-500 text-[8px] font-semibold flex flex-col items-center justify-center rounded-full text-white z-[99]">
       {notifCount}
      </span>
    </span>
  );
};

const Notification = () => {
  const [UserNotification, setUserNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userAuth = useSelector((state) => state.userAuth);
  const [Role, setRole] = useState("admin");
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



  const groupAsyncFunctions = () => {
    setIsLoading(true);
    Promise.all([FindCurrentUserNotification()])
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


  useEffect(() => {
    if (userAuth.role === "PARTNER") {
      setRole("partner");
    } else if (userAuth.role === "ADMIN") {
      setRole("admin");
    }
  }, [userAuth.role]);
  const sortedNotifications = UserNotification?.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const topThreeNotifications = sortedNotifications?.slice(0, 3);
  return (
    <Dropdown classMenuItems="md:w-[300px] top-[58px]" label={notifyLabel(UserNotification?.length)}>
      <div className="flex justify-between px-4 py-4 border-b border-slate-100 dark:border-slate-600">
        <div className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-6">
          Notifications
        </div>
        <div className="text-slate-800 dark:text-slate-200 text-xs md:text-right">
          <Link href={`/${Role}/notifications`} className="underline">
            View all
          </Link>
        </div>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {topThreeNotifications?.map((notification, i) => (
          <Menu.Item key={i}>
          {({ active }) => (
            <div
              className={`${
                active
                  ? "bg-slate-100 dark:bg-slate-700 dark:bg-opacity-70 text-slate-800"
                  : "text-slate-600 dark:text-slate-300"
              } block w-full px-4 py-2 text-sm cursor-pointer`}
            >
              <div className="flex ltr:text-left rtl:text-right">
                <div className="flex-none ltr:mr-3 rtl:ml-3">
                  <div className="h-8 w-8 bg-white rounded-full">
                    {/* <img
                      src={notification.user?.profileImage || 'default-image-url.jpg'} // Assuming there's a profile image or use a default
                      alt=""
                      className={`${
                        active ? "border-white" : "border-transparent"
                      } block w-full h-full object-cover rounded-full border`}
                    /> */}
                  </div>
                </div>
                <div className="flex-1">
                  <div
                    className={`${
                      active
                        ? "text-slate-600 dark:text-slate-300"
                        : "text-slate-600 dark:text-slate-300"
                    } text-sm`}
                  >
                    {notification.user?.contactName}
                  </div>
                  <div
                    className={`${
                      active
                        ? "text-slate-500 dark:text-slate-200"
                        : "text-slate-600 dark:text-slate-300"
                    } text-xs leading-4`}
                  >
                    {notification.user?.email}
                  </div>
                  <div
                    className={`${
                      active
                        ? "text-slate-500 dark:text-slate-200"
                        : "text-slate-600 dark:text-slate-300"
                    } text-xs leading-4`}
                  >
                    Status: {notification.status}
                  </div>
                  <div
                    className={`${
                      active
                        ? "text-slate-500 dark:text-slate-200"
                        : "text-slate-600 dark:text-slate-300"
                    } text-xs leading-4`}
                  >
                    Address: {notification.address?.display_name}
                  </div>
                  <div
                    className={`${
                      active
                        ? "text-slate-500 dark:text-slate-200"
                        : "text-slate-600 dark:text-slate-300"
                    } text-xs leading-4`}
                  >
                    Destination: {notification.destination?.display_name}
                  </div>
                  <div className="text-slate-400 dark:text-slate-400 text-xs mt-1">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </div>
                </div>
                {notification.newMissionPartner && (
                  <div className="flex-0">
                    <span className="h-[10px] w-[10px] bg-danger-500 border border-white dark:border-slate-400 rounded-full inline-block"></span>
                  </div>
                )}
              </div>
            </div>
          )}
        </Menu.Item>
        ))}
      </div>
    </Dropdown>
  );
};

export default Notification;
