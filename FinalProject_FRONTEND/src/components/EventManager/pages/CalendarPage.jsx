import CalendarView from '../components/CalendarView';

const CalendarPage = ({ events, onEventClick }) => (
  <CalendarView events={events} onEventClick={onEventClick} />
);

export default CalendarPage;
