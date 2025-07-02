import React, { useContext, useEffect } from 'react';
import { DashboardContext } from '../../DashboardContext';
import RegisterForm from '../../../Register/components/RegisterForm'; // Reuse the same form

export default function CreateEventManager({ onBack }) {
  const {
    formData,
    setFormData,
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

  // ✅ Automatically return to event manager table after successful update
  useEffect(() => {
    if (!editMode && activeSection === 'viewEventManagers') {
      onBack();  // go back to table
    }
  }, [editMode, activeSection]);

  const handleCancel = () => {
    resetForms();
    setEditMode(false);
    setEditId(null);
    setActiveSection('viewEventManagers'); // ✅ Ensure correct section is active
    onBack(); // ✅ Hide form view
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleUserSubmit(e, false); // false = isEventManager
    onBack(); // ✅ Hide form after successful create/update
  };

  return (
    <RegisterForm
      formTitle={editMode ? 'Edit Event Manager' : 'Create Event Manager'}
      submitLabel={editMode ? 'Update' : 'Register'}
      username={formData.username}
      setUsername={(v) => setFormData({ ...formData, username: v })}
      firstName={formData.firstname}
      setFirstName={(v) => setFormData({ ...formData, firstname: v })}
      middleName={formData.middlename}
      setMiddleName={(v) => setFormData({ ...formData, middlename: v })}
      lastName={formData.lastname}
      setLastName={(v) => setFormData({ ...formData, lastname: v })}
      password={formData.password || ''}
      setPassword={(v) => setFormData({ ...formData, password: v })}
      message={message}
      loading={loading}
      onSubmit={handleFormSubmit}
      onCancel={handleCancel}
      showLoginLink={false}
    />
  );
}
