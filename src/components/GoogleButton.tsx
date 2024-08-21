import React from "react";
import { FcGoogle } from "react-icons/fc";

interface GoogleButtonProps {
  text?: string;
  onClick: () => void;
  size?: string;
  color?: string;
  bgcolor?: string;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({
  text = "Sign in with Google",
  onClick,
  size = "base",
  color = "black",
  bgcolor = "white",
}) => {
  const sizeClass = `text-${size}`;
  const colorClass = `text-${color}`;

  return (
    <button
      onClick={onClick}
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
