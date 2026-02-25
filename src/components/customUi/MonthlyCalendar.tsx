import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

// import '@fullcalendar/core/index.css';
// import '@fullcalendar/daygrid/index.css';

const MonthlyCalendar = () => {
  return (
    <div className="min-h-[700px]">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{ left: 'prev,next today', center: 'title', right: '' }}
      />
    </div>
  );
};

export default MonthlyCalendar;
