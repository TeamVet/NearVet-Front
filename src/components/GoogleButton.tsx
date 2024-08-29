"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

interface GoogleButtonProps {
  text?: string;
  size?: string;
  color?: string;
  bgcolor?: string;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({
  text = "Sign in with Google",
  size = "base",
  color = "black",
  bgcolor = "white",
}) => {
  const sizeClass = `text-${size}`;
  const colorClass = `text-${color}`;
  const router = useRouter();
  const {} = useUser();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    async function fetchAuth() {
      const response = await fetch(
        "https://nearvet-latest.onrender.com/authGlobal/google",
        {
          method: "POST",
        }
      );
      const data = await response.json();
      if (data.url) {
        router.push(data.url);
        //TODO implementar logica para loguearnos con la infor que vuelve
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:shadow-md ${sizeClass} ${colorClass}`}
      style={{ backgroundColor: bgcolor }}
      aria-label={text}
    >
      <FcGoogle className="mr-2" size={24} />
      {text}
    </button>
  );
};

export default GoogleButton;
