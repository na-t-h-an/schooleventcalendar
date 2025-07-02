import React, { useState, useContext, useEffect } from 'react';
import { DashboardContext } from '../../DashboardContext';
import CreateStudent from './CreateStudent';
import MessageAlert from '../../../EventManager/components/MessageAlert';

export default function StudentSection() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const {
    students,
    fetchStudents,
    loading,
    message,
    handleEdit,
    handleDelete,
    editMode,
    resetForms
  } = useContext(DashboardContext);

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleCreateNew = () => {
    resetForms();
    setShowCreateForm(true);
  };

  const handleBackToList = () => {
    setShowCreateForm(false);
    resetForms();
  };

  if (showCreateForm || editMode) {
    return (
      <div className="section-container">
        <div className="section-header">
          <button className="back-btn" onClick={handleBackToList}>
            ← Back to Students
          </button>
        </div>
        <CreateStudent onBack={handleBackToList} />
      </div>
    );
  }

  return (
    <div className="section-container">
      <div className="section-header">
        <div className="header-left">
          <h1 className="section-title">Students</h1>
          <p className="section-subtitle">Manage your student accounts</p>
        </div>
        <button className="create-new-btn" onClick={handleCreateNew}>
          + CREATE NEW
        </button>
      </div>

      <MessageAlert message={message} />

      <div className="content-card">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading students...</p>
          </div>
        ) : students.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎓</div>
            <h3>No Students Found</h3>
            <p>Create your first student account to get started.</p>
            <button className="create-new-btn" onClick={handleCreateNew}>
              + CREATE NEW
            </button>
          </div>
        ) : (
          <div className="table-container">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>First Name</th>
                  <th>Middle Name</th>
                  <th>Last Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.userId}>
                    <td>{student.userId}</td>
                    <td>{student.username}</td>
                    <td>{student.firstname}</td>
                    <td>{student.middlename || '-'}</td>
                    <td>{student.lastname}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="edit-btn"
                          onClick={() => {
                            handleEdit(student, 'student');
                            setShowCreateForm(true);
                          }}
                        >
                          Edit
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDelete(student.userId, 'student')}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
