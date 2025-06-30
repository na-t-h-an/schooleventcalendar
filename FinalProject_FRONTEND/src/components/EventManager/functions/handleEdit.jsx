export const handleEdit = (event, setFormData, setEditMode, setEditEventId, navigate) => {
  const formatTime = (timeStr) => timeStr.slice(0, 5);

  setFormData({
    title: event.eventName,
    description: event.eventDescription,
    eventDate: event.eventSchedule,
    startTime: formatTime(event.startTime),
    endTime: formatTime(event.endTime),
    location: event.eventLocation
  });

  setEditMode(true);
  setEditEventId(event.eventId);
  navigate('/schooleventcalendar/eventmanager/createvent');
};
