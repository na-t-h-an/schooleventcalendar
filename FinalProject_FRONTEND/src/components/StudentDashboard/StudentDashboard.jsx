import { Routes, Route, Navigate } from "react-router-dom";
import "./StudentDashboard.css";

import useStudentUser from "./hooks/useStudentUser";
import useStudentState from "./hooks/useStudentState";
import useStudentEffects from "./hooks/useStudentEffects";

import StudentHeader from "./components/StudentHeader";

import {
  BrowseEventsPage,
  JoinedEventsPage,
  CalendarPage,
  ProfilePage,
} from "./pages";

import {
  fetchJoinedEvents,
  handleRegister,
  handleLeaveEvent,
  handleEditChange,
  handleProfileUpdate,
  handleLogout,
} from "./functions";

function StudentDashboard() {
  const { user, username } = useStudentUser();
  const studentState = useStudentState();

  useStudentEffects(user, studentState);

  if (user.typeUser !== 'S') {
    window.location.href = '/schooleventcalendar/login';
    return null;
  }

  console.log(`Access granted: Logged in as '${user.username}' (type '${user.typeUser}')`);

  const {
    events,
    joinedEvents,
    loading,
    message,
    selectedEvent,
    setSelectedEvent,
    editData,
    setEditData,
    setJoinedEvents,
    setLoading,
    setMessage,
  } = studentState;

  const calendarEvents = events.map((evt) => ({
    id: evt.eventId,
    title: evt.eventName,
    start: `${evt.eventSchedule}T${evt.startTime}`,
    end: `${evt.eventSchedule}T${evt.endTime}`,
    extendedProps: {
      description: evt.eventDescription,
      location: evt.eventLocation,
      status: evt.eventIsActive ? "Active" : "Inactive",
    },
  }));

  return (
    <div className="landingPage">
      <StudentHeader />
      <div className="content">
        <div className="wrapper">
          <Routes>
            <Route index element={<Navigate to="calendarview" replace />} />

            <Route
              path="browseevents"
              element={
                <BrowseEventsPage
                  events={events}
                  message={message}
                  loading={loading}
                  onJoin={(eventId) =>
                    handleRegister(eventId, username, setMessage, () =>
                      fetchJoinedEvents(
                        username,
                        setJoinedEvents,
                        setLoading,
                        setMessage
                      )
                    )
                  }
                />
              }
            />

            <Route
              path="joinedevents"
              element={
                <JoinedEventsPage
                  events={joinedEvents}
                  message={message}
                  loading={loading}
                  onLeave={(eventId) =>
                    handleLeaveEvent(eventId, username, setMessage, () =>
                      fetchJoinedEvents(
                        username,
                        setJoinedEvents,
                        setLoading,
                        setMessage
                      )
                    )
                  }
                />
              }
            />

            <Route
              path="calendarview"
              element={
                <CalendarPage
                  calendarEvents={calendarEvents}
                  selectedEvent={selectedEvent}
                  setSelectedEvent={setSelectedEvent}
                  message={message}
                  onJoin={(eventId) =>
                    handleRegister(eventId, username, setMessage, () =>
                      fetchJoinedEvents(
                        username,
                        setJoinedEvents,
                        setLoading,
                        setMessage
                      )
                    )
                  }
                />
              }
            />

            <Route
              path="profile"
              element={
                <ProfilePage
                  username={username}
                  editData={editData}
                  onChange={(e) => handleEditChange(e, setEditData, editData)}
                  onSubmit={(e) =>
                    handleProfileUpdate({ e, user, editData, setMessage })
                  }
                  message={message}
                  onLogout={handleLogout}
                />
              }
            />
            <Route path="*" element={<Navigate to="calendarview" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
