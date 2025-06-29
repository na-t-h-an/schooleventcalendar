import { useState } from 'react';

export const useFormState = (initialValues = {}) => {
  const [formData, setFormData] = useState({
    username: initialValues.username || '',
    password: initialValues.password || '',
    firstName: initialValues.firstName || '',
    middleName: initialValues.middleName || '',
    lastName: initialValues.lastName || '',
    ...initialValues
  });

  const updateField = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      username: '',
      password: '',
      firstName: '',
      middleName: '',
      lastName: ''
    });
  };

  const setFormData_ = (data) => {
    setFormData(data);
  };

  return {
    formData,
    updateField,
    resetForm,
    setFormData: setFormData_
  };
};