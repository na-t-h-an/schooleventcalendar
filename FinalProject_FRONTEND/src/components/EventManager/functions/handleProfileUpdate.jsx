import { updateUser } from '@/services/api';

export const handleProfileUpdate = async ({
  e,
  user,
  editData,
  setMessage
}) => {
  e.preventDefault();

  if (!editData.firstname.trim() || !editData.lastname.trim()) {
    setMessage('First and Last names are required.');
    setTimeout(() => setMessage(''), 3000);
    return;
  }

  if (
    (editData.password || editData.confirmPassword) &&
    editData.password !== editData.confirmPassword
  ) {
    setMessage('Error: Passwords do not match');
    setTimeout(() => setMessage(''), 3000);
    return;
  }

  const isUnchanged =
    editData.firstname === user.firstname &&
    editData.middlename === user.middlename &&
    editData.lastname === user.lastname &&
    !editData.password &&
    !editData.confirmPassword;

  if (isUnchanged) {
    setMessage('No changes made.');
    setTimeout(() => setMessage(''), 3000);
    return;
  }

  try {
    const updatedUser = {
      ...user,
      firstname: editData.firstname,
      middlename: editData.middlename,
      lastname: editData.lastname,
      ...(editData.password && { password: editData.password })
    };

    const response = await updateUser(user.userId, updatedUser);

    if (response?.userId) {
      setMessage('Profile updated successfully.');
      localStorage.setItem('user', JSON.stringify(response));
    } else {
      setMessage('Failed to update profile.');
    }
  } catch (error) {
    console.error('Update error:', error);
    setMessage('Failed to update profile.');
  }

  setTimeout(() => setMessage(''), 3000);
};
