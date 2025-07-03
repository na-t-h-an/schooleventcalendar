import ProfileForm from "../components/ProfileForm";
import MessageAlert from "../components/MessageAlert";

const ProfilePage = ({
  message,
  editData,
  handleEditChange,
  handleProfileUpdate,
  username,
  handleLogout,
}) => (
  <>
    <MessageAlert message={message} />
    <ProfileForm
      editData={editData}
      onChange={(e) => handleEditChange(e)}
      onSubmit={handleProfileUpdate}
      username={username}
    />
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      <button
        onClick={handleProfileUpdate}
        className="eventmanagerUpdateProfileButton"
      >
        Update
      </button>
      <button onClick={handleLogout} className="eventmanagerLogoutButton">
        Logout
      </button>
    </div>
  </>
);

export default ProfilePage;
