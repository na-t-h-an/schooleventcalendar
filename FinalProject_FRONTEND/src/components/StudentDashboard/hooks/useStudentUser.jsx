export default function useStudentUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username;
  const firstname = user?.firstname;
  const middlename = user?.middlename;
  const lastname = user?.lastname;
  return { user, username, firstname, middlename, lastname };
}
