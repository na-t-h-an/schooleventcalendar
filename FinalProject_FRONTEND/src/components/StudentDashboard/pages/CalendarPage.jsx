import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import MessageAlert from '@/components/EventManager/components/MessageAlert';
import StudentEventModal from '../components/StudentEventModal';

const CalendarPage = ({ calendarEvents, selectedEvent, setSelectedEvent, message, onJoin }) => (
  <div>
    <h2>Event Calendar</h2>
    <MessageAlert message={message} />
    <FullCalendar
      plugins={[bootstrap5Plugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={calendarEvents}
      eventClick={(info) => setSelectedEvent(info.event)}
      headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
    />
    <StudentEventModal event={selectedEvent} onJoin={onJoin} onClose={() => setSelectedEvent(null)} />
  </div>
);

export default CalendarPage;
