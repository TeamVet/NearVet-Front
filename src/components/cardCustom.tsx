import { CardCustomProps } from "@/types/interfaces";

const CardCustom: React.FC<Partial<CardCustomProps>> = ({ children, text, icon, onClick, isSelect, size }) => {

  let select = 'bg-white dark:bg-darkBG text-black dark:text-white'
  let minSize = `min-w-[${size}]`
  if (isSelect === text) {
    select = 'bg-green-700 dark:bg-green-700 text-white'
  }
  return (<button onClick={onClick} className={`flex flex-col gap-4 items-center justify-center p-4 rounded-md border border-gray-300 shadow-md hover:scale-110 text-lg ${select} ${minSize} `}>
    {icon}
    {text && <p className="text-black dark:text-white">{text}</p>}
    {children}
  </button>);
};

export default CardCustom;