import { Link } from 'react-router-dom';
import { IndexTab } from '@/components/customUi';

const SideBar = () => {
  return (
    <div className="w-12 h-full flex flex-col justify-between bg-background border-r">
      <div className="flex flex-col items-end gap-3">
        <IndexTab linkTo="/" menuName="Month" color="F97316"></IndexTab>
        <IndexTab linkTo="/total" menuName="TotalAssets" color="F97316"></IndexTab>
        <IndexTab linkTo="/finance" menuName="Finance" color="F97316"></IndexTab>
      </div>
      <button className="border-2 w-6 h-22 text_vertical">Setting</button>
    </div>
  );
};

export { SideBar };
