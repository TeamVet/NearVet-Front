"use client";
import CardCustom from "@/components/cardCustom";
import Screen from "@/components/Screen";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { UserCard, SectionContentProps } from "@/types/interfaces";

interface DashboardProps {
  cards: UserCard[];
  renderSection: (props: SectionContentProps) => React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ cards, renderSection }) => {
  const { user } = useUser();
  const [section, setSection] = useState<string | null>(null);

  const handleSection = (typeSection: string) => {
    setSection(typeSection);
  };

  return (
    <Screen>
      <h2 className="text-3xl">
        ¡Hola {user?.name}! ¿Qué quieres hacer?
      </h2>
      <div className="flex flex-row flex-wrap gap-4 m-auto my-5">
        {cards.map((item) => (
          <CardCustom
            key={item.text}
            text={item.text}
            icon={item.icon}
            onClick={() => handleSection(item.text)}
            isSelect={section}
          />
        ))}
      </div>
      <div className="min-h-[50lvh] mx-auto my-5 shadow-lg w-full rounded">
        {section && (
          <div className="mx-auto mt-5 min-h-28 dark:text-white ">
            {renderSection({ section })}
          </div>
        )}
      </div>
    </Screen>
  );
};

export default Dashboard;
