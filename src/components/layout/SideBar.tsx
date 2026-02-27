import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="w-12 h-full bg-sidebar flex flex-col justify-between">
      <div className="flex flex-col flex-1 gap-3">
        <Link to="/" className="border-2 w-6 h-20 text_vertical">
          Month
        </Link>
        <Link to="/total" className="border-2 w-6 h-26 text_vertical">
          TotalAssets
        </Link>
        <Link to="/finance" className="border-2 w-6 h-20 text_vertical">
          Finance
        </Link>
      </div>
      <button className="border-2 w-6 h-22 text_vertical">Setting</button>
    </div>
  );
};

export { SideBar };
