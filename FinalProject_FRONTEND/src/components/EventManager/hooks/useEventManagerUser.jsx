import { useEffect } from 'react';

// Hook to initialize the profile edit form for an Event Manager using localStorage
const useEventManagerUser = (setEditData) => {
  useEffect(() => {
    // Retrieve the 'user' object from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // If a user object was found, pre-fill the profile edit form with user details
    if (storedUser) {
      setEditData({
        firstname: storedUser.firstname || '',       
        middlename: storedUser.middlename || '',
        lastname: storedUser.lastname || '',
        password: '',                                // Empty
        confirmPassword: ''                          // Empty
      });
    }
  }, [setEditData]);
};

// Export the custom hook for use in Event Manager components
export default useEventManagerUser;
