"use client";
import { ThemeIcon } from "@/lib/icons";
import { NavItem, NavItemUser } from "@/lib/NavItems";
import Link from "next/link";
import { useEffect, useState } from "react";

const NavBar: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const handleLogOut = () => {};

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

  return (
    <nav className="dark:bg-navDarkBG dark:border-0 w-full flex flex-row justify-between px-5 py-2 border border-1 shadow-[rgba(0,_0,_0,_0.24)_0px_2px_4px]">
      <Link
        className="text-2xl font-bold text-detail text-center self-center"
        href={"/"}
      >
        Logo
      </Link>
      <div className="flex flex-row gap-4 ">
        {NavItemUser.map((item) =>
          item.name != "Salir" ? (
            <Link key={item.name} href={item.url} className="text-detail mx-2">
              <div className="flex flex-col gap-2 items-center text-2xl">
                {item.icon()}
                <p className="text-base">{item.name}</p>
              </div>
            </Link>
          ) : (
            <button
              key={item.name}
              className="text-detail mx-2"
              onClick={handleLogOut}
            >
              <div className="flex flex-col gap-2 items-center text-2xl">
                {item.icon()}
                <p className="text-base">{item.name}</p>
              </div>
            </button>
          )
        )}
        <ThemeIcon isDark={isDark} onChange={toggleTheme} />
      </div>
    </nav>
  );
};

export default NavBar;
