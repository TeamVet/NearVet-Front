"use client";
import Dashboard from "@/components/dashboardCustom";
import Screen from "@/components/Screen";
import { vetCards } from "@/helpers/dashBoardCards";
import SectionContent from "../../components/sectionsModules/sectionContent";
import { useUser } from "@/context/UserContext";

const VetDashboard: React.FC = () => {
  const { user } = useUser();
  return (
    <Screen width="full">
      <h2 className="text-3xl dark:text-darkHline">
        ¡Hola {user?.name}! ¿Qué quieres hacer?
      </h2>
      <Dashboard cards={vetCards} renderSection={SectionContent} />
    </Screen>
  );
};

export default VetDashboard;
