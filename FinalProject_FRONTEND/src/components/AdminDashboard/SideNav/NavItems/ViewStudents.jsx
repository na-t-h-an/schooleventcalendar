import React, { useContext, useEffect } from 'react';
import { DashboardContext } from '../../DashboardContext';

export default function ViewStudents() {
  const {
    students, fetchStudents, loading,
    renderTable
  } = useContext(DashboardContext);

  useEffect(() => {
    fetchStudents();
  }, []);

  return loading ? <p>Loading...</p> : renderTable(students, 'student');
}
