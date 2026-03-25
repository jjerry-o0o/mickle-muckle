import MonthlyCalendar from '@/pages/MonthPage/components/MonthlyCalendar';
import LedgerList from '@/pages/MonthPage/components/LedgerList';

const MonthPage = () => {
  return (
    <div className="flex w-full h-full bg-background2">
      <div className="flex flex-col w-[70%] h-full">
        <MonthlyCalendar />
      </div>
      <div className="flex flex-col w-[30%] min-w-[480px] border border-black p-4 bg-background">
        <LedgerList />
      </div>
    </div>
  );
};

export { MonthPage };
