import { MonthlyCalendar, LedgerList } from '@/components/customUi';
import { useLedgerFetch } from '@/hooks/useLedgerFetch';

const MonthPage = () => {
  // const { data } = useLedgerFetch.useLedgerEntry(1);
  return (
    <div className="flex w-full h-full bg-background2">
      <div className="flex flex-col w-[65%] h-full">
        <MonthlyCalendar />
      </div>
      <div className="flex flex-col w-[35%] border border-black p-4 bg-background">
        <LedgerList />
      </div>
    </div>
  );
};

export { MonthPage };
