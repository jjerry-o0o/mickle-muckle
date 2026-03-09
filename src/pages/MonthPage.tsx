import { MonthlyCalendar, LedgerList } from '@/components/customUi';

const MonthPage = () => {
  return (
    <div className="flex w-full h-full bg-[var(--background2)]">
      <div className="flex flex-col w-[60%] h-full">
        <MonthlyCalendar />
      </div>
      <div className="flex flex-col w-[40%] border border-black p-4">
        <LedgerList />
      </div>
    </div>
  );
};

export { MonthPage };
