import MessageAlert from "@/components/EventManager/components/MessageAlert";
import ProfileForm from "../components/ProfileForm";

const ProfilePage = ({
  firstname,
  middlename,
  lastname,
  editData,
  onChange,
  onSubmit,
  message,
  onLogout,
}) => (
  <div>
    <h2>Profile Dashboard</h2>
    <MessageAlert message={message} />
    <ProfileForm
      editData={editData}
      onChange={onChange}
      firstname={firstname}
      middlename={middlename}
      lastname={lastname}
    />
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      <button
        onClick={onSubmit}
        className="studentdashboardUpdateProfileButton"
      >
        Update
      </button>
      <button onClick={onLogout} className="studentdashboardLogoutButton">
        Logout
      </button>
    </div>
  </div>
);

export default ProfilePage;
