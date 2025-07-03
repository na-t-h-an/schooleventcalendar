import React, { useEffect, useState } from 'react';
import MessageAlert from '../../EventManager/components/MessageAlert';
import '../AdminDashboard.css';


export default function Section({
  title,
  subtitle,
  icon,
  data,
  loading,
  message,
  fetchData,
  resetForms,
  editMode,
  handleEdit,
  handleDelete,
  CreateFormComponent,
  onEditType,
  renderTable
}) {
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchData();
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
          <button className="cancel-btn" onClick={handleBackToList}>
            ← Back to {title}
          </button>
        </div>
        <CreateFormComponent onBack={handleBackToList} />
      </div>
    );
  }

  return (
    <div className="section-container">
            <div className="section-header">
        <div className="header-left">
            <h1 className="section-title">{title}</h1>
            <p className="section-subtitle">{subtitle}</p>
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
            <p>Loading {title.toLowerCase()}...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">{icon}</div>
            <h3>No {title} Found</h3>
            <p>Create your first {title.toLowerCase()} to get started.</p>
            <button className="create-new-btn" onClick={handleCreateNew}>
              + CREATE NEW
            </button>
          </div>
        ) : (
          <div className="table-container">
            <table className="modern-table">
              <thead>{renderTable().thead}</thead>
              <tbody>
                {data.map(item => renderTable(item, {
                  onEdit: () => {
                    handleEdit(item, onEditType);
                    setShowCreateForm(true);
                  },
                  onDelete: () => handleDelete(item.userId || item.eventId, onEditType)
                }))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
