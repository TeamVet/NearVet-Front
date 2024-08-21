
import { IoPawSharp, IoPerson, IoHome, IoPersonCircle, IoLogOutSharp, IoMoonOutline, IoMoon, IoClipboardSharp, IoStorefrontSharp, IoMailSharp, IoMailOpenSharp } from "react-icons/io5";
export const PawIcon = () => <IoPawSharp color="#8E44AD" />;
export const HomeIcon = () => <IoHome color="#8E44AD" />;
export const LoginIcon = () => <IoPerson color="#8E44AD" />;
export const UserIcon = () => <IoPersonCircle color="#8E44AD" />;
export const LogOutIcon = () => <IoLogOutSharp color="#8E44AD" />;

export const ClipboardIcon = () => {
  return <IoClipboardSharp color="#8E44AD" />;
}

export const StoreIcon = () => {
  return <IoStorefrontSharp color="#8E44AD" />
}

export const MailIcon = (isMail: boolean) => {
  return isMail ? (<IoMailOpenSharp color="#8E44AD" />) : (<IoMailSharp color="#8E44AD" />)
}


interface ThemeIconProps {
  isDark: boolean;
  onChange: () => void;
}


export const ThemeIcon: React.FC<ThemeIconProps> = ({ isDark, onChange }) => {
  return (
    <button
      onClick={onChange}
      className="flex flex-col gap-2 items-center text-2xl"
    >
      {isDark ? <IoMoon color="#8E44AD" /> : <IoMoonOutline color="#8E44AD" />}
      <p className="text-base text-detail">{isDark ? "Claro" : "Oscuro"}</p>
    </button>
  );
}
