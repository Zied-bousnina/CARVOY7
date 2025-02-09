"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import Card from "@/components/ui/Card";
import { UserService } from "@/_services/user.service";
import { formatDistanceToNow } from "date-fns";

const ActivityPage = () => {
  const [userActivities, setUserActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserActivities = () => {
    setIsLoading(true);
    return UserService.GetUserActivity() // Fetch user activities
      .then((res) => {
        setUserActivities(res?.activities || []); // Ensure it's an array
      })
      .catch((err) => {
        console.error("Error fetching activities:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchUserActivities();
  }, []);

  const sortedActivities = userActivities?.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div>
      <Card bodyClass="p-0">
        <div className="flex justify-between px-4 py-4 border-b border-slate-100 dark:border-slate-600">
          <div className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-6">
            Recent Activities
          </div>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <Menu as={Fragment}>
            {!isLoading && sortedActivities?.map((activity, i) => (
              <Menu.Item key={i}>
                {({ active }) => (
                  <div
                    className={`${
                      active
                        ? "bg-slate-100 dark:bg-slate-700 dark:bg-opacity-70 text-slate-800"
                        : "text-slate-600 dark:text-slate-300"
                    } block w-full px-4 py-2 text-sm`}
                  >
                    <div className="flex ltr:text-left rtl:text-right">
                      <div className="flex-1">
                        <div
                          className={`${
                            active
                              ? "text-slate-600 dark:text-slate-300"
                              : "text-slate-600 dark:text-slate-300"
                          } text-sm`}
                        >
                          {activity.action} {/* Display action */}
                        </div>
                        <div
                          className={`${
                            active
                              ? "text-slate-500 dark:text-slate-200"
                              : "text-slate-600 dark:text-slate-300"
                          } text-xs leading-4`}
                        >
                          {activity.details ? JSON.stringify(activity.details) : "No details available"}
                        </div>
                        <div className="text-slate-400 dark:text-slate-400 text-xs mt-1">
                        {activity.createdAt ? formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true }) : "Unknown time"}
                        </div>
                      </div>
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

export default ActivityPage;
