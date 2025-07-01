import { useEffect } from 'react';
import { fetchEventsWrapper } from '@/components/StudentDashboard/utils/fetchEventsWrapper';
import { fetchJoinedEventsWrapper } from '@/components/StudentDashboard/utils/fetchJoinedEventsWrapper';

export default function useStudentEffects(user, {
  activeSection,
  setEvents,
  setJoinedEvents,
  setLoading,
  setMessage,
  setEditData
}) {
  const username = user?.username;

  useEffect(() => {
    setMessage('');
    if (activeSection === 'viewEvents' || activeSection === 'calendar') {
      fetchEventsWrapper(setEvents, setLoading, setMessage);
    }
    if (activeSection === 'myRegistrations') {
      fetchJoinedEventsWrapper(username, setJoinedEvents, setLoading, setMessage);
    }
    if (activeSection === 'profile') {
      setEditData({
        firstname: user.firstname || '',
        middlename: user.middlename || '',
        lastname: user.lastname || '',
        password: '',
        confirmPassword: ''
      });
    }
  }, [activeSection, username]);
}
