import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import '@/components/customUi/monthly-calendar.css';

const MonthlyCalendar = () => {
  return (
    <div className="min-h-[700px]">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        customButtons={{
          customToday: {
            text: '오늘',
          },
        }}
        headerToolbar={{ left: 'title', center: '', right: 'customToday prev,next' }}
      />
    </div>
  );
};

export default MonthlyCalendar;
