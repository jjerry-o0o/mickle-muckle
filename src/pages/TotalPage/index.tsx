import TotalList from '@/pages/TotalPage/components/TotalList';

const TotalPage = () => {
  return (
    <div className="flex w-full h-full bg-background2">
      <div className="flex flex-col w-[30%] h-full border border-gray-200 bg-background">
        <TotalList />
      </div>
      <div className="flex flex-col w-[30%] h-full border border-gray-200 bg-background"></div>
    </div>
  );
};

export { TotalPage };
