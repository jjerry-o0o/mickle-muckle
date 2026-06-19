import MonthlyCalendar from '@/pages/MonthPage/components/MonthlyCalendar';
import LedgerList from '@/pages/MonthPage/components/LedgerList';
import { useState } from 'react';

const MonthPage = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateClick = (date: string) => {
    if (selectedDate && selectedDate === date) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
    }
  };

  return (
    <div className="flex w-full h-full bg-[#f8fafc]">
      <main className="flex-1 min-w-0 flex flex-col gap-4 p-[22px] overflow-hidden">
        <MonthlyCalendar onDateClick={handleDateClick} selectedDate={selectedDate} />
      </main>
      <LedgerList selectedDate={selectedDate} />
    </div>
  );
};

export { MonthPage };
