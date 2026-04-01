import type { ReactNode } from 'react';

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
    <div className="flex gap-2.5">
      {buttons.map(button => (
        <button
          key={button.label}
          type="button"
          className={`flex font-bold text-[var(${button.color})] text-start`}
          onClick={button.onClick}
        >
          <span className="inline-flex items-center gap-2">
            {button.icon}
            {button.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ListHeaderButton;
