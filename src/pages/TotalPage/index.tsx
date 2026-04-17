import AssetList from '@/pages/TotalPage/components/AssetList';
import AssetDashboard from '@/pages/TotalPage/components/AssetDashboard';

const TotalPage = () => {
  return (
    <div className="flex w-full h-full bg-background2">
      <div className="flex flex-col w-[30%] h-full">
        <AssetList />
      </div>
      <div className="flex flex-col w-[70%] h-full">
        <AssetDashboard />
      </div>
    </div>
  );
};

export { TotalPage };
