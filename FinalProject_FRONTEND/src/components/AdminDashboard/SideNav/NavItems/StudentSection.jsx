import React, { useContext } from 'react';
import { DashboardContext } from '../../DashboardContext';
import CreateStudent from './CreateStudent';
import Section from '../../components/Section';

export default function StudentSection() {
  const {
    students, fetchStudents, loading, message, handleEdit,
    handleDelete, editMode, resetForms
  } = useContext(DashboardContext);

  return (
    <Section
      title="Students"
      subtitle="Manage your student accounts"
      icon="🎓"
      data={students}
      loading={loading}
      message={message}
      fetchData={fetchStudents}
      resetForms={resetForms}
      editMode={editMode}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      onEditType="student"
      CreateFormComponent={CreateStudent}
      renderTable={(item, actions) => {
        if (!item) {
          return {
            thead: (
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Last Name</th>
                <th>Actions</th>
              </tr>
            )
          };
        }

        const { onEdit, onDelete } = actions || {};

        return (
          <tr key={item.userId}>
            <td>{item.userId}</td>
            <td>{item.username}</td>
            <td>{item.firstname}</td>
            <td>{item.middlename || '-'}</td>
            <td>{item.lastname}</td>
            <td>
              <div className="action-buttons">
                <button className="edit-btn" onClick={onEdit}>Edit</button>
                <button className="delete-btn" onClick={onDelete}>Delete</button>
              </div>
            </td>
          </tr>
        );
      }}
    />
  );
}
