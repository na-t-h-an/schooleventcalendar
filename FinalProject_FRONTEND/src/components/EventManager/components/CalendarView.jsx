import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

const CalendarView = ({ events, onEventClick }) => {
  const calendarEvents = events.map(evt => ({
    id: evt.eventId.toString(),
    title: evt.eventName,
    start: `${evt.eventSchedule}T${evt.startTime}`,
    end: `${evt.eventSchedule}T${evt.endTime}`
  }));

  return (
    <FullCalendar
      plugins={[bootstrap5Plugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={calendarEvents}
      height="auto"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      eventClick={onEventClick}
    />
  );
};

export default CalendarView;
