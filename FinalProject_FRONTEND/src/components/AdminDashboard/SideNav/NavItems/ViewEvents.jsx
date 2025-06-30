import React, { useContext, useEffect } from 'react';
import { DashboardContext } from '../../DashboardContext';

export default function ViewEvents() {
  const {
    events, fetchEvents, loading,
    renderTable
  } = useContext(DashboardContext);

  useEffect(() => {
    fetchEvents();
  }, []);

  return loading ? <p>Loading...</p> : renderTable(events, 'event');
}
