import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="w-20 h-full bg-sidebar flex flex-col justify-between">
      <button className="border-2 w-14 h-14 rounded-4xl mx-auto">프로필</button>
      <div className="flex flex-col flex-1 gap-3 border">
        <Link to="/" className="border-2 w-16 h-16 rounded-4xl mx-auto">
          월별
        </Link>
        <Link to="/total" className="border-2 w-16 h-16 rounded-4xl mx-auto">
          전재산
        </Link>
        <Link to="/finance" className="border-2 w-16 h-16 rounded-4xl mx-auto">
          재테크
        </Link>
      </div>
      <button className="border-2 w-14 h-14 rounded-4xl mx-auto">설정</button>
    </div>
  );
};

export { SideBar };
