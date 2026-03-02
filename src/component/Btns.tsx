
interface BtnProps {
    title: string;
    onClick?: () => void
}

export const SolidBlueBtn = ({ title, onClick, ...props }: BtnProps) => {
  return (
    <button 
        {...props}
        onClick={onClick} 
        className="w-full bg-[#1E6FFF] text-white cursor-pointer px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200"
    >
        {title}
    </button>
  )
}

export const SolidGrayBtn = ({ title, onClick, ...props }: BtnProps) => {
  return (
    <button 
        {...props}
        onClick={onClick} 
        className="w-full bg-neutral-100 border border-neutral-200 text-neutral-800 cursor-pointer px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200"
    >
        {title}
    </button>
  )
}