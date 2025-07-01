import React, { useContext } from 'react';
import { DashboardContext } from '../../DashboardContext';
import RegisterForm from '../../../Register/components/RegisterForm';

export default function CreateEventManager() {
  const {
    formData, setFormData,
    handleUserInput, handleUserSubmit,
    editMode, resetForms, setActiveSection,
    message,
  } = useContext(DashboardContext);

  return (
    <RegisterForm
      username={formData.username}
      setUsername={(v) => setFormData({ ...formData, username: v })}
      firstName={formData.firstname}
      setFirstName={(v) => setFormData({ ...formData, firstname: v })}
      middleName={formData.middlename}
      setMiddleName={(v) => setFormData({ ...formData, middlename: v })}
      lastName={formData.lastname}
      setLastName={(v) => setFormData({ ...formData, lastname: v })}
      password={formData.password}
      setPassword={(v) => setFormData({ ...formData, password: v })}
      message={message}
      loading={false}
      onSubmit={(e) => handleUserSubmit(e, false)} // false = Event Manager
      formTitle={editMode ? 'Edit Event Manager' : 'Create Event Manager'}
      submitLabel={editMode ? 'Update' : 'Create'}
      showBackLink={false}
      showLoginLink={false}
      onCancel={
        editMode
          ? () => {
              resetForms();
              setActiveSection('viewEventManagers');
            }
          : null
      }
    />
  );
}
