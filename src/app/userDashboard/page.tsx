"use client";
import CardCustom from "@/components/cardCustom";
import Screen from "@/components/Screen";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import SectionContent from "../../components/sectionsModules/sectionContent";
import { userCards } from "@/helpers/dashBoardCards";
import Dashboard from "@/components/dashboardCustom";

const UserDashboard: React.FC = () => {
  const { user } = useUser();
  return (
    <Screen>
      <h2 className="text-3xl dark:text-darkHline">
        ¡Hola {user?.name}! ¿Qué quieres hacer?
      </h2>
      <Dashboard cards={userCards} renderSection={SectionContent} />
    </Screen>
  );
};

export default UserDashboard;
