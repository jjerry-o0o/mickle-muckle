import FullCalendar from '@fullcalendar/react';
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction';

import '@/pages/MonthPage/components/monthly-calendar.css';
import { useEffect, useRef, useState } from 'react';
import { useLedgerFetch } from '@/hooks/useLedgerFetch';

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface MonthlyCalendarProps {
  selectedDate: string | null;
  onDateClick: (date: string) => void;
}
const MonthlyCalendar = ({ selectedDate, onDateClick }: MonthlyCalendarProps) => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const calendarRef = useRef<FullCalendar | null>(null);
  const [currentYm, setCurrentYm] = useState('');
  const { data: MonthData } = useLedgerFetch.useLedgerEntriesDailySum(currentYm.replace('.', '-'));
  const { events = [], totalAmount = { income: 0, expense: 0 } } = MonthData ?? {};

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const scroller = root.querySelector('.fc-scroller') as HTMLElement;
    const monthCards = Array.from(root.querySelectorAll('div[data-date]')) as HTMLElement[];

    const observer = new IntersectionObserver(
      monthCards => {
        monthCards.forEach(card => {
          if (card.isIntersecting && card.target instanceof HTMLElement) {
            const date = card.target.dataset.date?.replace('-', '.');
            if (!date) return;
            setCurrentYm(date);

            const dateBadge = document.createElement('div');
            dateBadge.className = 'fc-visible-badge';
            dateBadge.textContent = date;
            card.target.appendChild(dateBadge);
            dateBadge.classList.add('on');

            // 1초 유지 후 사라짐
            setTimeout(() => {
              dateBadge.classList.remove('on');
              setTimeout(() => dateBadge.remove(), 250); // transition 시간과 맞춤
            }, 1000);
          }
        });
      },
      { root: scroller, threshold: 0.8 },
    );

    monthCards.forEach(card => observer.observe(card));
  }, []);

  useEffect(() => {
    const root = wrapRef.current;
    const selectedDayCell = root?.querySelector(`[data-date="${selectedDate}"]`) as HTMLElement;
    root?.querySelectorAll('.fc-day-selected').forEach(element => {
      element.classList.remove('fc-day-selected');
    });
    if (selectedDate) {
      selectedDayCell.classList.add('fc-day-selected');
    }
  }, [selectedDate]);

  return (
    <div ref={wrapRef} className="flex flex-col h-full justify-center">
      {/* 캘린더 헤더 영역 */}
      <div className="flex justify-between mt-8 mx-4 px-2 pb-4 shrink-0">
        <div className="flex gap-2 items-baseline">
          <p className="customTitle">{currentYm}</p>
          <span className="text-lg text-[var(--income-deep)]">+ {totalAmount.income.toLocaleString()}</span>
          <span className="text-lg text-[var(--expense-deep)]">- {totalAmount.expense.toLocaleString()}</span>
        </div>
        <button
          type="button"
          className="customToday-Btn shadow-md"
          onClick={() => calendarRef.current?.getApi().today()}
        >
          Today
        </button>
      </div>
      {/* 캘린더 영역 */}
      <div className="flex-1 border-2 mx-4 rounded-4xl overflow-auto mb-8 shadow-lg no-scrollbar">
        <div className="flex f-full bg-background border-b shrink-0">
          {WEEK_DAYS.map(day => (
            <p key={day} className="flex flex-1 w-full h-10 items-center justify-center">
              {day}
            </p>
          ))}
        </div>
        <FullCalendar
          ref={calendarRef}
          plugins={[multiMonthPlugin, interactionPlugin]}
          initialView="multiMonthYear"
          multiMonthMaxColumns={1}
          headerToolbar={false}
          events={events}
          eventOrder={['-title']}
          dateClick={info => onDateClick(info.dateStr)}
        />
      </div>
    </div>
  );
};

export default MonthlyCalendar;
