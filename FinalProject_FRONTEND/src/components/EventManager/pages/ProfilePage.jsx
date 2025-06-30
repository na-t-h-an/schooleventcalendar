import ProfileForm from '../components/ProfileForm';
import MessageAlert from '../components/MessageAlert';

const ProfilePage = ({ message, editData, handleEditChange, handleProfileUpdate, username, handleLogout }) => (
  <>
    <MessageAlert message={message} />
    <ProfileForm
      editData={editData}
      onChange={(e) => handleEditChange(e)}
      onSubmit={handleProfileUpdate}
      username={username}
    />
    <button onClick={handleProfileUpdate} className="eventmanagerUpdateProfileButton">Update</button>
    <br />
    <button onClick={handleLogout} className="eventmanagerLogoutButton">Logout</button>
  </>
);

export default ProfilePage;
