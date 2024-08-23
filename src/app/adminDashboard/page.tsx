"use client";
import Dashboard from "@/components/dashboardCustom";
import Screen from "@/components/Screen"
import { adminCards } from "@/helpers/dashBoardCards";
import SectionContent from "../../components/sectionsModules/sectionContent";

const AdminDashboard: React.FC = () => {
  return (<Screen>
    <Dashboard cards={adminCards} renderSection={SectionContent} />
  </Screen>);
};

export default AdminDashboard;