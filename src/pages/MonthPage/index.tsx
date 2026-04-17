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
    <div className="flex w-full h-full bg-background2">
      <div className="flex flex-col w-[70%] h-full">
        <MonthlyCalendar onDateClick={handleDateClick} selectedDate={selectedDate} />
      </div>
      <div className="flex flex-col w-[30%] min-w-[480px]">
        <LedgerList selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export { MonthPage };
