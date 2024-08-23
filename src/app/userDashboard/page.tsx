"use client";
import CardCustom from "@/components/cardCustom";
import Screen from "@/components/Screen";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import SectionContent from "../../components/sectionsModules/sectionContent";
import { userCards } from "@/helpers/dashBoardCards";

const UserDashboard: React.FC = () => {
  const { user } = useUser();
  const [section, setSection] = useState<string | null>(null)
  const handleSection = (typeSection: string) => {
    user ? setSection(typeSection) : setSection(typeSection) //setSection("sinUser");
  };

  return (<Screen>
    <h2 className="text-3xl">
      Hola {user?.name}! Qué quieres hacer?
    </h2>
    <div className="flex flex-row flex-wrap gap-4 m-auto my-5 justify-center">
      {userCards.map((item) => {
        return <CardCustom key={item.text} text={item.text} icon={item.icon} onClick={() => handleSection(item.text)} isSelect={section} />
      })}

    </div>
    <div className="min-h-[50lvh] mx-auto md:my-5 shadow-lg w-full md:w-2/3 rounded">

      {section && (
        <div className="mx-auto mt-5 min-h-28 dark:text-white">
          <SectionContent section={section} />
        </div>
      )}
    </div>
  </Screen >);
};

export default UserDashboard;