import React, { useContext } from 'react';
import { DashboardContext } from '../../DashboardContext';

export default function CreateStudent() {
  const {
    studentData, setStudentData, handleUserInput,
    handleUserSubmit, editMode, resetForms, setActiveSection
  } = useContext(DashboardContext);

  const onChange = (e) => handleUserInput(e, setStudentData);

  return (
    <form onSubmit={(e) => handleUserSubmit(e, true)} className="eventManagerForm">
      <h2>{editMode ? 'Edit' : 'Create'} Student</h2>
      {['username', 'password', 'firstname', 'middlename', 'lastname'].map(field => (
        <div className="formGroup" key={field}>
          <label className="formLabel">{field}</label>
          <input
            type={field === 'password' ? 'password' : 'text'}
            name={field}
            value={studentData[field]}
            onChange={onChange}
            required={!(field === 'middlename' || (field === 'password' && editMode))}
            className="formInput"
          />
        </div>
      ))}
      <div className="formActions">
        <button type="submit" className="submitButton">{editMode ? 'Update' : 'Create'}</button>
        {editMode && (
          <button type="button" className="cancelButton" onClick={() => {
            resetForms();
            setActiveSection('viewStudents');
          }}>Cancel</button>
        )}
      </div>
    </form>
  );
}
