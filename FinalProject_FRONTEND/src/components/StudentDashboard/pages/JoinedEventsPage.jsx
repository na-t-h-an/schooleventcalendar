import StudentEventTable from '../components/StudentEventTable';
import MessageAlert from '@/components/EventManager/components/MessageAlert'; // or local version

const JoinedEventsPage = ({ events, message, loading, onLeave }) => (
  <div>
    <h2>Joined Events</h2>
    <MessageAlert message={message} />
    {loading ? (
      <p>Loading...</p>
    ) : events.length === 0 ? (
      <p>No joined events found.</p>
    ) : (
      <StudentEventTable events={events} type="joined" onAction={onLeave} />
    )}
  </div>
);

export default JoinedEventsPage;
