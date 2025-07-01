// src/components/EventManager/EventManagerHandlers.js
export const createEventHandlers = ({
  setFormData,
  setEditMode,
  setEditEventId,
  formData,
  editMode,
  editEventId,
  setMessage,
  navigate,
  fetchEventsWrapper,
  user,
  editData
}) => {
  const clearAll = () => {
    setFormData({
      title: '',
      description: '',
      eventDate: '',
      startTime: '',
      endTime: '',
      location: ''
    });
    setEditMode(false);
    setEditEventId(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    import('./functions/handleSubmit').then(({ handleSubmit }) =>
      handleSubmit({
        e,
        formData,
        editMode,
        editEventId,
        setMessage,
        fetchEventsWrapper,
        clearForm: clearAll,
        navigate
      })
    );
  };

  const updateProfile = (e) => {
    e.preventDefault();
    import('./functions/handleProfileUpdate').then(({ handleProfileUpdate }) =>
      handleProfileUpdate({
        e,
        user,
        editData,
        setMessage
      })
    );
  };

  return { clearAll, submitHandler, updateProfile };
};
