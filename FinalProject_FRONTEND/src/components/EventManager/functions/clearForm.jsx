export const clearForm = (setFormData, setEditMode, setEditEventId) => {
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
