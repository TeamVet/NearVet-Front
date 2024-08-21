"use client"
import { ThemeIcon } from "@/lib/icons";
import { NavItem, NavItemUser, NavItemAdmin, NavItemVet } from "@/helpers/NavItems";

import Link from "next/link";



const NavBar: React.FC = () => {

  const handleLogOut = () => { } // logica para manejar el logout
  const isMail = true //necesitamos un handler para el mail, para saber si es un mail o no
  return (<nav className="w-full flex flex-row shadow-md  justify-between px-5 py-2">
    <Link className="text-2xl font-bold text-detail text-center self-center" href={"/"}>Logo</Link>
    <div className="flex flex-row gap-4 ">

      {/* aca usamos la logica de mapear navitem segun este logueado o no, y el rol que tiene 
      NO LOGUEADO= NavItem
      USER = NavItemUser
      ADMIN = NavItemAdmin
      VETERINARIO = NavItemVet
      */}
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

      <ThemeIcon isDark={false} />

    </div>
  </nav>);
};

export default NavBar;