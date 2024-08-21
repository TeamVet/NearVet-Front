"use client";
import { ThemeIcon } from "@/lib/icons";
import { NavItem, NavItemUser, NavItemAdmin, NavItemVet } from "@/helpers/NavItems";
import { useEffect, useState } from "react";

import Link from "next/link";
import { useUser } from "@/app/context/UserContext";


const NavBar: React.FC = () => {
  const { logoutContext, user } = useUser();
  const handleLogOut = () => { logoutContext }
  const [isDark, setIsDark] = useState(false);


  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };
  const isMail = true //necesitamos un handler para el mail, para saber si hay un mail o no para el usuario

  let navItems;
  if (!user) {
    navItems = NavItem; // No logueado
  } else {
    switch (user.role) {
      case "user":
        navItems = NavItemUser;
        break;
      case "admin":
        navItems = NavItemAdmin;
        break;
      case "vet":
        navItems = NavItemVet;
        break;
      default:
        navItems = NavItem; // fallback
        break;
    }
  }

  return (<nav className="dark:bg-navDarkBG dark:border-0 w-full flex flex-row justify-between px-5 py-2 border border-1 shadow-[rgba(0,_0,_0,_0.24)_0px_2px_4px]">
    <Link className="text-2xl font-bold text-detail text-center self-center" href={"/"}>Logo</Link>
    <div className="flex flex-row gap-4 ">
      {NavItemVet.map((item) => (

        item.name != "Salir" ? (
          <Link key={item.name} href={item.url} className="text-detail mx-2">

            <div className="flex flex-col gap-2 items-center text-2xl">
              {
                item.icon(isMail)
              }
              <p className="text-base">

                {item.name}
              </p>
            </div>
          </Link>) : (
          <button key={item.name} className="text-detail mx-2" onClick={handleLogOut}>
            <div className="flex flex-col gap-2 items-center text-2xl">
              {
                item.icon(isMail)
              }
              <p className="text-base">

                {item.name}
              </p>
            </div>
          </button>)))}

      <ThemeIcon isDark={isDark} onChange={toggleTheme} />

    </div>
  </nav>);
}


export default NavBar