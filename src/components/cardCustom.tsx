import { CardCustomProps } from "@/types/interfaces";

const CardCustom: React.FC<Partial<CardCustomProps>> = ({
  children,
  text,
  icon,
  onClick,
  isSelect,
  size,
}) => {
  let select =
    "bg-purpleBackground text-black dark:bg-darkBackgroundFront";
  if (isSelect === text) {
    select = "bg-lightBG dark:bg-gray-700";
  }
  return (
    <button
      onClick={onClick}
      className={`flex flex-col gap-4 items-center justify-center p-4 pb-8 border dark:border-gray-700 border-gray-200 shadow-md text-lg ${select} rounded-lg sm:min-w-[50vw] md:min-w-[40vw] lg:min-w-[30vw] lg:max-w-[35vw] xl:min-w-[25vw] 2xl:min-w-[25vw] shadow-md dark:border-1 hover:bg-lightBG dark:hover:bg-gray-700`}
    >
      {icon}
      {text && <p className="text-lightHline dark:text-darkHline">{text}</p>}
      {children}
    </button>
  );
};

export default CardCustom;
