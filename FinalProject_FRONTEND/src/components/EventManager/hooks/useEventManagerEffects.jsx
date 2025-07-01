import { useEffect } from 'react';

const useEventManagerUser = (setEditData) => {
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setEditData({
        firstname: storedUser.firstname || '',
        middlename: storedUser.middlename || '',
        lastname: storedUser.lastname || '',
        password: '',
        confirmPassword: ''
      });
    }
  }, [setEditData]);
};

export default useEventManagerUser;
