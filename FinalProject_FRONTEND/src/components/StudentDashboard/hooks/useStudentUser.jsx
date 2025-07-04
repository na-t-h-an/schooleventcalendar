// Custom hook to retrieve and expose student user information from localStorage
export default function useStudentUser() {
  // Get the 'user' data string from localStorage and parse it into an object
  const user = JSON.parse(localStorage.getItem("user"));

  // Safely extract individual user fields using optional chaining
  const username = user?.username;
  const firstname = user?.firstname;
  const middlename = user?.middlename;
  const lastname = user?.lastname;

  // Return the full user object along with specific fields for easy access
  return { user, username, firstname, middlename, lastname };
}
