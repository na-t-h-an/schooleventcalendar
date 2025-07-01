import StudentEventTable from '../components/StudentEventTable';
import MessageAlert from '@/components/EventManager/components/MessageAlert'; // or local version

const BrowseEventsPage = ({ events, message, loading, onJoin }) => (
  <div>
    <h2>Browse Events</h2>
    <MessageAlert message={message} />
    {loading ? (
      <p>Loading...</p>
    ) : (
      <StudentEventTable events={events} type="all" onAction={onJoin} />
    )}
  </div>
);

export default BrowseEventsPage;
