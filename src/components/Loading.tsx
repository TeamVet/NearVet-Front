"use client";
import useLoading from "@/hooks/LoadingHook";

import { cardio } from "ldrs";

const Loading: React.FC = () => {
  const { loading } = useLoading();
  cardio.register();

  return (
    <main className="fixed top-0 left-0 z-20 bg-black bg-opacity-70 h-screen w-screen	items-center justify-center flex">
      <div className="bg-opacity-60  p-10 rounded-lg">
        <l-cardio size="100" stroke="4" speed="2" color="violet"></l-cardio>
      </div>
    </main>
  );
};

export default Loading;
