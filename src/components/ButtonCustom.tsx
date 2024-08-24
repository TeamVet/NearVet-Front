import { ButtonCustomOptionalProps, ButtonCustomProps } from "@/types/interfaces";
import Link from "next/link";



const ButtonCustom: React.FC<ButtonCustomProps & Partial<ButtonCustomOptionalProps>> = ({ href, type = 'button', text, onClick, size, color, bgcolor }) => {
  let sizeClass = `text-${size}`;
  let colorClass = `text-${color}`;
  let bgColorClass = `bg-${bgcolor}`;

  return (
    href ? (
      <Link href={href} aria-label={`Link para ${text}`} className={`px-5 py-2 m-auto rounded-lg  bg-detail text-white ${sizeClass} ${colorClass} ${bgColorClass}  hover:scale-105 `}>{text}</Link>
    ) : (
      <button type={type} onClick={onClick} aria-label={`Boton para ${text}`} className={`px-5 py-2 m-auto rounded-lg text-lg bg-detail text-white ${sizeClass} ${colorClass} ${bgColorClass} `}>{text}</button>
    )
  );
};


export default ButtonCustom;