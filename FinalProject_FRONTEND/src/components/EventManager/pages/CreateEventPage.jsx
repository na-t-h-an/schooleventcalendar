import MessageAlert from '../components/MessageAlert';
import EventForm from '../components/EventForm';

const CreateEventPage = ({
  editMode,
  message,
  formData,
  handleInputChange,
  submitHandler,
  clearAll
}) => (
  <>
    <h2>{editMode ? 'Edit Event' : 'Create New Event'}</h2>
    <MessageAlert message={message} />
    <EventForm
      formData={formData}
      onChange={(e) => handleInputChange(e)}
      onSubmit={submitHandler}
      onClear={clearAll}
      editMode={editMode}
    />
  </>
);

export default CreateEventPage;
