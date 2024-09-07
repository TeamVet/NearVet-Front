import clsx from "clsx";
import {
  ButtonCustomOptionalProps,
  ButtonCustomProps,
} from "@/types/interfaces";
import Link from "next/link";

const ButtonCustom: React.FC<
  ButtonCustomProps & Partial<ButtonCustomOptionalProps>
> = ({ href, type = "button", text, onClick, size, color, bgcolor }) => {
  const sizeClass = size ? `text-${size}` : "";
  const colorClass = color ? `text-${color}` : "";
  const bgColorClass = bgcolor ? `bg-${bgcolor}` : "bg-detail";

  return href ? (
    <Link
      href={href}
      aria-label={`Link para ${text}`}
      className={clsx(
        "px-5 py-2 m-auto rounded-lg text-white hover:scale-105 ",
        sizeClass,
        colorClass,
        bgColorClass
      )}
    >
      {text}
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClick}
      aria-label={`Boton para ${text}`}
      className={clsx(
        "px-5 py-2 m-auto rounded-lg  text-white hover:scale-105 ",
        sizeClass,
        colorClass,
        bgColorClass
      )}
    >
      {text}
    </button>
  );
};

export default ButtonCustom;
