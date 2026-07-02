import type { ReactNode } from 'react'

interface HeaderButtonItem {
  label: string;
  onClick: () => void;
  icon: ReactNode;
  color: string;
}

interface ListHeaderButtonProps {
  buttons: HeaderButtonItem[];
}

const ListHeaderButton = ({ buttons }: ListHeaderButtonProps) => {
  return (
    <div className="flex gap-2">
      {buttons.map(button => (
        <button
          key={button.label}
          type="button"
          className={`font-['Inter'] font-semibold text-[12.5px] rounded-[10px] px-3 py-[7px] bg-white border transition-colors flex items-center gap-1.5 ${
            button.color === '--income'
              ? 'border-income/30 text-income hover:bg-income/10'
              : 'border-expense/30 text-expense hover:bg-expense/10'
          }`}
          onClick={button.onClick}
        >
          {button.icon}
          {button.label}
        </button>
      ))}
    </div>
  )
}

export default ListHeaderButton
