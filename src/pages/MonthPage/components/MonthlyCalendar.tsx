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

            setTimeout(() => {
              dateBadge.classList.remove('on');
              setTimeout(() => dateBadge.remove(), 250);
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
    <div ref={wrapRef} className="flex flex-col h-full">
      {/* 캘린더 헤더 */}
      <div className="flex items-baseline justify-between shrink-0 mb-4">
        <div className="flex items-baseline gap-4">
          <p className="customTitle">{currentYm}</p>
          <span className="flex gap-3 font-['Inter'] font-bold text-[15px]">
            <span className="text-income">+ {totalAmount.income.toLocaleString()}</span>
            <span className="text-expense">- {totalAmount.expense.toLocaleString()}</span>
          </span>
        </div>
        <button
          type="button"
          className="customToday-Btn"
          onClick={() => calendarRef.current?.getApi().today()}
        >
          Today
        </button>
      </div>

      {/* 캘린더 본체 */}
      <section className="flex-1 bg-white border border-[rgba(229,231,235,0.9)] rounded-[20px] shadow-[0px_10px_30px_0px_rgba(17,24,39,0.08)] flex flex-col overflow-hidden">
        <div className="grid grid-cols-7 border-b border-[#e5e7eb] bg-gradient-to-b from-white to-[#fbfdff] shrink-0">
          {WEEK_DAYS.map(day => (
            <p
              key={day}
              className="p-[12px_14px] font-['Inter'] font-bold text-[12px] tracking-[0.04em] uppercase text-[#6b7280] text-center"
            >
              {day}
            </p>
          ))}
        </div>
        <div className="flex-1 overflow-hidden">
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
      </section>
    </div>
  );
};

export default MonthlyCalendar;
