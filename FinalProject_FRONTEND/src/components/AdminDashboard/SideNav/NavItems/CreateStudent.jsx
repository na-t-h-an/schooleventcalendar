import React, { useContext } from 'react';
import { DashboardContext } from '../../DashboardContext';
import RegisterForm from '../../../Register/components/RegisterForm';

export default function CreateStudent() {
  const {
    studentData, setStudentData,
    handleUserInput, handleUserSubmit,
    editMode, resetForms, setActiveSection,
    message,
  } = useContext(DashboardContext);

  return (
    <RegisterForm
      username={studentData.username}
      setUsername={(v) => setStudentData({ ...studentData, username: v })}
      firstName={studentData.firstname}
      setFirstName={(v) => setStudentData({ ...studentData, firstname: v })}
      middleName={studentData.middlename}
      setMiddleName={(v) => setStudentData({ ...studentData, middlename: v })}
      lastName={studentData.lastname}
      setLastName={(v) => setStudentData({ ...studentData, lastname: v })}
      password={studentData.password}
      setPassword={(v) => setStudentData({ ...studentData, password: v })}
      message={message}
      loading={false}
      onSubmit={(e) => handleUserSubmit(e, true)} // true = Student
      formTitle={editMode ? 'Edit Student' : 'Create Student'}
      submitLabel={editMode ? 'Update' : 'Create'}
      showBackLink={false}
      showLoginLink={false}
      onCancel={
        editMode
          ? () => {
              resetForms();
              setActiveSection('viewStudents');
            }
          : null
      }
    />
  );
}
