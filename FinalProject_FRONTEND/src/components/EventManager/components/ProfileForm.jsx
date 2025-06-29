import React from 'react';

const ProfileForm = ({ editData, onChange, onSubmit, username }) => (
  <>
    <h2>My Profile ({username})</h2>
    <form onSubmit={onSubmit} className="profileForm">
      <label>First Name</label>
      <input name="firstname" value={editData.firstname} onChange={onChange} placeholder="First Name" required />
      <label>Middle Name</label>
      <input name="middlename" value={editData.middlename} onChange={onChange} placeholder="Middle Name" />
      <label>Last Name</label>
      <input name="lastname" value={editData.lastname} onChange={onChange} placeholder="Last Name" required />
      <label>New Password</label>
      <input type="password" name="password" value={editData.password} onChange={onChange} placeholder="New Password" />
      <label>Confirm Password</label>
      <input type="password" name="confirmPassword" value={editData.confirmPassword} onChange={onChange} placeholder="Confirm Password" />
    </form>
  </>
);

export default ProfileForm;
