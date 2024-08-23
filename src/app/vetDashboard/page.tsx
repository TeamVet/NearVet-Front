"use client";
import Dashboard from "@/components/dashboardCustom";
import Screen from "@/components/Screen"
import { vetCards } from "@/helpers/dashBoardCards";
import SectionContent from "../../components/sectionsModules/sectionContent";

const VetDashboard: React.FC = () => {
  return (<Screen>
    <Dashboard cards={vetCards} renderSection={SectionContent} />
  </Screen>);
};

export default VetDashboard;