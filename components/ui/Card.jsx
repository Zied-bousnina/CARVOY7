import React from "react";
import useSkin from "@/hooks/useSkin";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import { Menu } from "@headlessui/react";
const actions = [
  {
    name: "mission",
    action:false
  },
  {
    name:"by partners",
    action:true
  }

];
const Card = ({
  children,
  title,
  subtitle,
  headerslot=true,
  className = "custom-class  bg-white ",
  bodyClass = "p-6",
  noborder,
  titleClass = "custom-class ",
  setMissionByPartner
}) => {
  const [skin] = useSkin();

  return (
    <div
      className={`
        card rounded-md   dark:bg-slate-800   ${
          skin === "bordered"
            ? " border border-slate-200 dark:border-slate-700"
            : "shadow-base"
        }

    ${className}
        `}
    >
      {(title || subtitle) && (
        <header className={`card-header ${noborder ? "no-border" : ""}`}>
          <div>
            {title && <div className={`card-title ${titleClass}`}>{title}</div>}
            {subtitle && <div className="card-subtitle">{subtitle}</div>}
          </div>
      {headerslot &&
          <Dropdown
        classMenuItems=" w-[140px]"
        label={
          <span className="text-lg inline-flex h-6 w-6 flex-col items-center justify-center border border-slate-200 dark:border-slate-700 rounded dark:text-slate-400">
            <Icon icon="heroicons-outline:dots-horizontal" />
          </span>
        }
      >
        <div>
          {actions.map((item, i) => (
            <Menu.Item key={i}
            onClick={()=>setMissionByPartner(item.action)}

            >
              <div
                className="`

                  hover:bg-secondary-500 dark:hover:bg-slate-600 dark:bg-opacity-60 hover:text-white text-slate-900 dark:text-slate-300
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center `"
              >
                <span>{item.name}</span>
              </div>
            </Menu.Item>
          ))}
        </div>
      </Dropdown>
      }
        </header>
      )}
      <main className={`card-body ${bodyClass}`}>{children}</main>
    </div>
  );
};

export default Card;
