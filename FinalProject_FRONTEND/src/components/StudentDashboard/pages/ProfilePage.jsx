import MessageAlert from '@/components/EventManager/components/MessageAlert'; 
import ProfileForm from '../components/ProfileForm';

const ProfilePage = ({ username, editData, onChange, onSubmit, message, onLogout }) => (
  <div>
    <h2>My Profile ({username})</h2>
    <MessageAlert message={message} />
    <ProfileForm editData={editData} onChange={onChange}/>
    <button onClick={onSubmit} className="studentdashboardUpdateProfileButton">Update</button>
    <br/>
    <button onClick={onLogout} className="studentdashboardLogoutButton">Logout</button>
  </div>
);

export default ProfilePage;
