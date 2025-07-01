const ProfileForm = ({ editData, onChange, onSubmit }) => (
  <form className="profileForm">
    <div className="formGroup">
      <label>First Name</label>
      <input type="text" name="firstname" value={editData.firstname} onChange={onChange} required />
    </div>
    <div className="formGroup">
      <label>Middle Name</label>
      <input type="text" name="middlename" value={editData.middlename} onChange={onChange} />
    </div>
    <div className="formGroup">
      <label>Last Name</label>
      <input type="text" name="lastname" value={editData.lastname} onChange={onChange} required />
    </div>
    <div className="formGroup">
      <label>New Password</label>
      <input type="password" name="password" value={editData.password} onChange={onChange} />
    </div>
    <div className="formGroup">
      <label>Confirm Password</label>
      <input type="password" name="confirmPassword" value={editData.confirmPassword} onChange={onChange} />
    </div>
  </form>
);

export default ProfileForm;
