"use client";

import type {} from "ldrs";
import { useEffect, useState } from "react";

const Loading: React.FC = () => {
  const [texto, setTexto] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function getLoader() {
      const { cardio } = await import("ldrs");
      cardio.register();
    }
    getLoader();

    const timeoutId = setTimeout(() => {
      setTexto("Está tardando mucho... pero seamos pacientes!");
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <main className="fixed top-0 left-0 z-20 bg-black bg-opacity-70 h-screen w-screen items-center justify-center flex">
      <div className="bg-opacity-60 p-10 rounded-lg flex flex-col items-center relative">
        <div className="fixed mx-auto top-[30lvh]">
          <l-cardio size="100" stroke="4" speed="2" color="violet"></l-cardio>
        </div>
        {texto && (
          <div
            className={`transition-opacity duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            } bg-white rounded px-5 py-2 m-2`}
          >
            <span className="text-detail md:text-3xl font-semibold">
              {texto}
            </span>
          </div>
        )}
      </div>
    </main>
  );
};

export default Loading;
