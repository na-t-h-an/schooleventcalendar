import React, { useContext, useEffect } from 'react';
import { DashboardContext } from '../../DashboardContext';
import RegisterForm from '../../../Register/components/RegisterForm';

export default function CreateStudent({ onBack }) {
  const {
    studentData,
    setStudentData,
    editMode,
    handleUserSubmit,
    resetForms,
    setEditMode,
    setEditId,
    message,
    loading,
    activeSection,
    setActiveSection
  } = useContext(DashboardContext);

  // Automatically go back if not in editMode and the view is already on the student list
  useEffect(() => {
    if (!editMode && activeSection === 'viewStudents') {
      onBack(); 
    }
  }, [editMode, activeSection]);

  const handleCancel = () => {
    resetForms();
    setEditMode(false);
    setEditId(null);
    setActiveSection('viewStudents'); // ✅ ensures it returns to student table
    onBack(); // ✅ hides the form
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleUserSubmit(e, true); // true = isStudent

    // ✅ Let DashboardContext change activeSection and then hide form
    onBack();
  };

  return (
  <div className="create-student-form-wrapper"> {/* Used to hide Cancel button via CSS */}
    <RegisterForm
      formTitle={editMode ? 'Edit Student' : 'Create Student'}
      submitLabel={editMode ? 'Update' : 'Register'}
      username={studentData.username}
      setUsername={(v) => setStudentData({ ...studentData, username: v })}
      firstName={studentData.firstname}
      setFirstName={(v) => setStudentData({ ...studentData, firstname: v })}
      middleName={studentData.middlename}
      setMiddleName={(v) => setStudentData({ ...studentData, middlename: v })}
      lastName={studentData.lastname}
      setLastName={(v) => setStudentData({ ...studentData, lastname: v })}
      password={studentData.password || ''}
      setPassword={(v) => setStudentData({ ...studentData, password: v })}
      message={message}
      loading={loading}
      onSubmit={handleFormSubmit}
      onCancel={handleCancel}
      showLoginLink={false}
    />
  </div>
);
}
