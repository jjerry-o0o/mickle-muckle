import FullCalendar from '@fullcalendar/react';
import multiMonthPlugin from '@fullcalendar/multimonth';

import '@/components/customUi/monthly-calendar.css';
import { useEffect, useRef, useState } from 'react';
import { useLedgerFetch } from '@/hooks/useLedgerFetch';

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MonthlyCalendar = () => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const calendarRef = useRef<FullCalendar | null>(null);
  const [currentYm, setCurrentYm] = useState('');
  // const { data: entries = [] } = useLedgerFetch.useLedgerEntriesByMonth(currentYm.replace('.', '-'));
  const { data: entries = [] } = useLedgerFetch.useLedgerEntriesDailySum(currentYm.replace('.', '-'));

  useEffect(() => {
    // wrapRef 사용하여 지금 컴포넌트의 범위 내에서만 querySelector 진행.
    const root = wrapRef.current;
    if (!root) return;
    const scroller = root.querySelector('.fc-scroller') as HTMLElement;
    const monthCards = Array.from(root.querySelectorAll('div[data-date]')) as HTMLElement[];

    // IntersectionObserver : 웹 API이며 요소의 가시성 여부를 비동기적으로 감지함.
    // (무한스크롤, 화면 리사이징, 이미지 로딩 지연, 애니매이션 효과 등에서 사용)
    // 두번째 인자 - observer 의 동작을 설정하는데 사용.
    //          - root: 영역, rootMargin: 영역의 축소/확대, threshold: 얼마나 보였을때 가시성 체크? (0.0 ~ 1.0)
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

  return (
    <div ref={wrapRef} className="flex flex-col h-full justify-center">
      {/* 캘린더 헤더 영역 */}
      <div className="flex justify-between mx-4 px-2 pb-4">
        <div className="customTitle">{currentYm}</div>
        <button
          type="button"
          className="customToday-Btn shadow-md"
          onClick={() => calendarRef.current?.getApi().today()}
        >
          Today
        </button>
      </div>
      {/* 캘린더 영역 */}
      <div className="border-2 mx-4 rounded-4xl overflow-auto mb-8 shadow-lg">
        <div className="flex f-full bg-background border-b">
          {WEEK_DAYS.map(day => (
            <p key={day} className="flex flex-1 w-full h-10 items-center justify-center">
              {day}
            </p>
          ))}
        </div>
        <FullCalendar
          ref={calendarRef}
          plugins={[multiMonthPlugin]}
          initialView="multiMonthYear"
          multiMonthMaxColumns={1}
          headerToolbar={{ left: '', right: '' }}
          events={entries}
          eventOrder={['-title']}
        />
      </div>
    </div>
  );
};

export default MonthlyCalendar;
