// Import React's useEffect hook for running side effects in functional components
import { useEffect } from 'react';

// Import a utility function to fetch all events for the student dashboard
import { fetchEventsWrapper } from '@/components/StudentDashboard/utils/fetchEventsWrapper';

// Import a utility function to fetch events that the student has joined
import { fetchJoinedEventsWrapper } from '@/components/StudentDashboard/utils/fetchJoinedEventsWrapper';

// Custom hook that runs side effects based on the currently active student dashboard section
export default function useStudentEffects(user, {
  activeSection,       
  setEvents,           
  setJoinedEvents,     
  setLoading,          
  setMessage,          
  setEditData          
}) {
  // Extract username from user object 
  const username = user?.username;

  // React hook that triggers side effects when 'activeSection' or 'username' changes
  useEffect(() => {
    // Clear any existing message each time section changes
    setMessage('');

    // If the user is viewing available events or the calendar, fetch all events
    if (activeSection === 'viewEvents' || activeSection === 'calendar') {
      fetchEventsWrapper(setEvents, setLoading, setMessage);
    }

    // If viewing 'My Registrations', fetch events the student has already joined
    if (activeSection === 'myRegistrations') {
      fetchJoinedEventsWrapper(username, setJoinedEvents, setLoading, setMessage);
    }

    // If viewing the profile section, initialize the edit form with user data
    if (activeSection === 'profile') {
      setEditData({
        firstname: user.firstname || '',
        middlename: user.middlename || '',
        lastname: user.lastname || '',
        password: '',          // Empty
        confirmPassword: ''    // Empty
      });
    }

  // This runs effect again when activeSection or username changes
  }, [activeSection, username]);
}
