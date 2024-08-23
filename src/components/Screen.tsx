"use client"
import { ScreenProps } from "@/types/interfaces";
const Screen: React.FC<ScreenProps> = ({ children }) => {

  return (<main className={`w-full lg:w-5/6 flex flex-col pt-[5lvh] mx-auto my-5 min-h-[100lvh] items-center text-center rounded-md dark:bg-darkBG`} >
    {children}
  </main>);
};

export default Screen;