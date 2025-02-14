import React, { useRef, useEffect, useState } from "react";

import Navmenu from "./Navmenu";
import { menuItems, menuItemsPartner } from "@/constant/data";
import SimpleBar from "simplebar-react";
import useSemiDark from "@/hooks/useSemiDark";
import useSkin from "@/hooks/useSkin";
import useDarkMode from "@/hooks/useDarkMode";
import Link from "next/link";
import useMobileMenu from "@/hooks/useMobileMenu";
import Icon from "@/components/ui/Icon";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "@/components/partials/auth/store";

const MobileMenu = ({ className = "custom-class" }) => {
  const scrollableNodeRef = useRef();
  const [scroll, setScroll] = useState(false);
  const userAuth = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

   const [menuItemsToDisplay, setMenuItemsToDisplay] = useState(menuItems);
   useEffect(() => {
    let updatedMenu = userAuth.role === "PARTNER" ? menuItemsPartner : menuItems;

    // Append Logout Button
    updatedMenu = [
      ...updatedMenu,
      {
        title: "Déconnexion",
        icon: "heroicons-outline:logout",
        action: () => dispatch(handleLogout(false)), // Call logout action
      },
    ];

    setMenuItemsToDisplay(updatedMenu);
  }, [userAuth.role, dispatch]);


  useEffect(() => {
    const handleScroll = () => {
      if (scrollableNodeRef.current.scrollTop > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    scrollableNodeRef.current.addEventListener("scroll", handleScroll);
  }, [scrollableNodeRef]);

  const [isSemiDark] = useSemiDark();
  // skin
  const [skin] = useSkin();
  const [isDark] = useDarkMode();
  const [mobileMenu, setMobileMenu] = useMobileMenu();
  const [Role, setRole] = useState("");

  useEffect(() => {
    if (userAuth.role === "PARTNER") {
      setRole("/partner");
    } else if (userAuth.role === "ADMIN") {
      setRole("/admin");
    }
  }, [userAuth.role]);
  return (
    <div
      className={`${className} fixed  top-0 bg-white dark:bg-slate-800 shadow-lg  h-full   w-[248px]`}
    >
      <div className="logo-segment flex justify-between items-center bg-white dark:bg-slate-800 z-[9] h-[85px]  px-4 ">
        <Link href={Role}>
          <div className="flex items-center space-x-4">
            <div className="logo-icon">
              {!isDark && !isSemiDark ? (
                <img src="/assets/images/logo/logo-c.svg" alt="" />
              ) : (
                <img src="/assets/images/logo/logo-c-white.svg" alt="" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                CarVoy7
              </h1>
            </div>
          </div>
        </Link>
        <button
          type="button"
          onClick={() => setMobileMenu(!mobileMenu)}
          className="cursor-pointer text-slate-900 dark:text-white text-2xl"
        >
          <Icon icon="heroicons:x-mark" />
        </button>
      </div>

      <div
        className={`h-[60px]  absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none ${
          scroll ? " opacity-100" : " opacity-0"
        }`}
      ></div>
      <SimpleBar
        className="sidebar-menu px-4 h-[calc(100%-80px)]"
        scrollableNodeProps={{ ref: scrollableNodeRef }}
      >
        <Navmenu menus={menuItemsToDisplay} />

      </SimpleBar>
    </div>
  );
};

export default MobileMenu;
