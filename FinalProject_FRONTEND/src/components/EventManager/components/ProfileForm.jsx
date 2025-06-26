import React from 'react';

const ProfileForm = ({ editData, onChange, onSubmit, username }) => (
  <>
    <h2>🙍 My Profile ({username})</h2>
    <form onSubmit={onSubmit} className="profileForm">
      <input name="firstname" value={editData.firstname} onChange={onChange} placeholder="First Name" required />
      <input name="middlename" value={editData.middlename} onChange={onChange} placeholder="Middle Name" />
      <input name="lastname" value={editData.lastname} onChange={onChange} placeholder="Last Name" required />
      <input type="password" name="password" value={editData.password} onChange={onChange} placeholder="New Password" />
      <input type="password" name="confirmPassword" value={editData.confirmPassword} onChange={onChange} placeholder="Confirm Password" />
      <button type="submit" className="updateProfileButton">Update Profile</button>
    </form>
  </>
);

export default ProfileForm;
