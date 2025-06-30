import React, { useEffect } from 'react';
import './EventManager.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import useEventManagerState from './hooks/useEventManagerState';
import fetchEventsWrapper from './utils/fetchEventsWrapper';

import EventModal from './components/EventModal';
import HeaderNav from './components/HeaderNav';

import {
  handleSubmit,
  handleEdit,
  handleDelete,
  clearForm,
  handleInputChange,
  handleEditChange,
  handleProfileUpdate,
  handleLogout
} from './functions';

import {
  CreateEventPage,
  ManageEventPage,
  CalendarPage,
  ProfilePage
} from './pages';

function EventManager() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    window.location.href = '/schooleventcalendar/login';
    return null;
  }

  const {
    events, setEvents,
    message, setMessage,
    loading, setLoading,
    selectedEvent, setSelectedEvent,
    formData, setFormData,
    editMode, setEditMode,
    editEventId, setEditEventId,
    editData, setEditData
  } = useEventManagerState();

  useEffect(() => {
    fetchEventsWrapper(setEvents, setLoading, setMessage);
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setEditData({
        firstname: storedUser.firstname || '',
        middlename: storedUser.middlename || '',
        lastname: storedUser.lastname || '',
        password: '',
        confirmPassword: ''
      });
    }
  }, []);

  const clearAll = () => clearForm(setFormData, setEditMode, setEditEventId);

  const submitHandler = (e) =>
    handleSubmit({
      e,
      formData,
      editMode,
      editEventId,
      setMessage,
      fetchEventsWrapper: () => fetchEventsWrapper(setEvents, setLoading, setMessage),
      clearForm: clearAll,
      navigate
    });

  return (
    <div className="event-manager-container">
      <HeaderNav username={user.username} />
      <main className="content">
        <div className="wrapper">
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onEdit={() => {
              setSelectedEvent(null);
              handleEdit(selectedEvent, setFormData, setEditMode, setEditEventId, navigate);
            }}
          />

          <Routes>
            <Route index element={<Navigate to="calendarview" replace />} />
            <Route
              path="createvent"
              element={
                <CreateEventPage
                  editMode={editMode}
                  message={message}
                  formData={formData}
                  handleInputChange={(e) => handleInputChange(e, setFormData)}
                  submitHandler={submitHandler}
                  clearAll={clearAll}
                />
              }
            />

            <Route
              path="managevent"
              element={
                <ManageEventPage
                  message={message}
                  loading={loading}
                  events={events}
                  onEdit={(event) =>
                    handleEdit(event, setFormData, setEditMode, setEditEventId, navigate)
                  }
                  onDelete={(eventId) =>
                    handleDelete(eventId, setMessage, () =>
                      fetchEventsWrapper(setEvents, setLoading, setMessage)
                    )
                  }
                />
              }
            />

            <Route
              path="calendarview"
              element={
                <CalendarPage
                  events={events}
                  onEventClick={(clickInfo) => {
                    const clicked = events.find(
                      (evt) => evt.eventId.toString() === clickInfo.event.id
                    );
                    setSelectedEvent(clicked);
                  }}
                />
              }
            />

            <Route
              path="profile"
              element={
                <ProfilePage
                  message={message}
                  editData={editData}
                  handleEditChange={(e) => handleEditChange(e, setEditData)}
                  handleProfileUpdate={(e) =>
                    handleProfileUpdate({ e, user, editData, setMessage })
                  }
                  username={user.username}
                  handleLogout={handleLogout}
                />
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default EventManager;
