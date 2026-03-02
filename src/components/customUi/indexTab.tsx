import { Link } from 'react-router-dom';

interface indexTabProps {
  linkTo: string;
  menuName: string;
  color: string;
}

const IndexTab = ({ linkTo, menuName, color }: indexTabProps) => {
  return (
    <Link to={linkTo} className="border-2 w-6 h-20 text_vertical" style={{ background: color }}>
      {menuName}
    </Link>
  );
};

export { IndexTab };
