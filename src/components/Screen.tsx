"use client"
import { ScreenProps } from "@/types/interfaces";
const Screen: React.FC<ScreenProps> = ({ children }) => {

  return (<main className={`shadow-lg w-full lg:w-5/6 flex flex-col mx-auto my-5 p-5 h-[100lvh] text-center rounded-md dark:bg-darkBG`} >
    {children}
  </main>);
};

export default Screen;