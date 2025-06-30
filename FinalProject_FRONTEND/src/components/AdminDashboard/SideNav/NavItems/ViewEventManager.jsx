import React, { useContext, useEffect } from 'react';
import { DashboardContext } from '../../DashboardContext';

export default function ViewEventManager() {
  const {
    eventManagers, fetchEventManagers, loading,
    renderTable
  } = useContext(DashboardContext);

  useEffect(() => {
    fetchEventManagers();
  }, []);

  return loading ? <p>Loading...</p> : renderTable(eventManagers, 'eventManager');
}
