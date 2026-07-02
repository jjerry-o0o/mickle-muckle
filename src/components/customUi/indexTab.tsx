import { Link } from 'react-router-dom'

interface indexTabProps {
  linkTo: string;
  menuName: string;
  borderColor: string;
  textColor: string;
  extraClass?: string;
}

const IndexTab = ({ linkTo, menuName, borderColor, textColor, extraClass = '' }: indexTabProps) => {
  return (
    <Link
      to={linkTo}
      className={`w-[42px] rounded-l-[16px] border-[3px] flex items-center justify-center py-[14px] bg-white ${extraClass}`}
      style={{ borderColor }}
    >
      <span
        className="[writing-mode:vertical-rl] rotate-180 font-['Inter'] font-bold text-[14px] tracking-[0.04em] whitespace-nowrap"
        style={{ color: textColor }}
      >
        {menuName}
      </span>
    </Link>
  )
}

export default IndexTab
