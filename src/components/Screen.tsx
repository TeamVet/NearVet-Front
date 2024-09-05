"use client";
import { ScreenProps } from "@/types/interfaces";
const Screen: React.FC<ScreenProps> = ({ children }) => {
  return (
    <main
      className={`w-full lg:w-full flex flex-col py-[5lvh] mx-auto min-h-[100lvh] items-center text-center lg:rounded-md dark:bg-darkBG`}
    >
      {children}
    </main>
  );
};

export default Screen;
