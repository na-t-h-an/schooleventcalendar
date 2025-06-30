import MessageAlert from '../components/MessageAlert';
import EventTable from '../components/EventTable';

const ManageEventPage = ({ message, loading, events, onEdit, onDelete }) => (
  <>
    <h2>Manage Events</h2>
    <MessageAlert message={message} />
    {loading ? (
      <p>Loading events...</p>
    ) : events.length === 0 ? (
      <p>No events found.</p>
    ) : (
      <EventTable events={events} onEdit={onEdit} onDelete={onDelete} />
    )}
  </>
);

export default ManageEventPage;
