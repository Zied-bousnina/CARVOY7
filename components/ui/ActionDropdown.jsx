import React from "react";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";

const ActionDropdown = ({ actions }) => {
  return (
    <Dropdown
      classMenuItems="right-0 w-[140px] top-[110%] z-50"
      label={
        <span className="text-xl text-center block w-full">
          <Icon icon="heroicons-outline:dots-vertical" />
        </span>
      }
    >
      <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[200px] overflow-y-auto">
        {actions.map((item, i) => (
          <div
            key={i}
            onClick={item.doit}
            className={`${
              item.name === "delete"
                ? "bg-danger-500 text-danger-500 bg-opacity-30 hover:bg-opacity-100 hover:text-white"
                : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
            } w-full px-4 py-2 text-sm cursor-pointer flex space-x-2 items-center`}
          >
            <span className="text-base">
              <Icon icon={item.icon} />
            </span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </Dropdown>
  );
};

export default ActionDropdown;