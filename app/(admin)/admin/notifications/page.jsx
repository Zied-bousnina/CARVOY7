"use client";
import React, { Fragment } from "react";
import  { useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { notifications } from "@/constant/data";
import Card from "@/components/ui/Card";
import { UserService } from "@/_services/user.service";
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from "next/navigation";

const NotificationPage = () => {
  const [UserNotification, setUserNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const FindCurrentUserNotification = () => {
    return UserService.GetCurrentUser()
      .then((res) => {

        setUserNotification(res?.user?.Newsocket
        ); // Update the state with the correct value
      })
      .catch((err) => {

      })
      .finally(() => {

      });
  };



  const groupAsyncFunctions = () => {
    setIsLoading(true);
    Promise.all([FindCurrentUserNotification()])
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
  const sortedNotifications = UserNotification?.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
    <div>
      <Card bodyClass="p-0">
        <div className="flex justify-between px-4 py-4 border-b border-slate-100 dark:border-slate-600">
          <div className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-6">
            All Notifications
          </div>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <Menu as={Fragment}>
            {!isLoading && sortedNotifications?.map((notification, i) => (
              <Menu.Item key={i}>
  {({ active }) => (
    <div
      className={`${
        active
          ? "bg-slate-100 dark:bg-slate-700 dark:bg-opacity-70 text-slate-800"
          : "text-slate-600 dark:text-slate-300"
      } block w-full px-4 py-2 text-sm cursor-pointer`}
      onClick={() => {
        // Handle notification click
        router.push(`/admin/missionDetails/${notification?._id}`);

      }
      }
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
          </Menu>
        </div>
      </Card>
    </div>
  );
};

export default NotificationPage;
