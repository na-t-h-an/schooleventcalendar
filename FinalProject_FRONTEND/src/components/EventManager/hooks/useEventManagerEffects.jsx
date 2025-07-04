// useEffect hook for running side effects in functional components
import { useEffect } from 'react';

// Custom hook to populate the event manager's profile edit form using localStorage data
const useEventManagerUser = (setEditData) => {
  useEffect(() => {
    // Retrieve the 'user' item from localStorage and parse it into a JavaScript object
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // If a user exists in localStorage, set the initial values for the edit form
    if (storedUser) {
      setEditData({
        firstname: storedUser.firstname || '',
        middlename: storedUser.middlename || '',
        lastname: storedUser.lastname || '',
        password: '',           // Empty
        confirmPassword: ''     // Jason boang
      });
    }
  // This effect runs whenever the setEditData function reference changes (typically stable)
  }, [setEditData]);
};

// Export the custom hook for use in event manager dashboard or profile component
export default useEventManagerUser;
