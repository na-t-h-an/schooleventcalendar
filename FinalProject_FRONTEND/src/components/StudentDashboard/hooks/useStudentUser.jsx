export default function useStudentUser() {
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user?.username;
  return { user, username };
}
