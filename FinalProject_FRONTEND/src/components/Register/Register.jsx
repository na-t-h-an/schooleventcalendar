import React from 'react';
import './Register.css';
import Header from '../LandingPage/components/Header'; // make this global
import BackButton from '../Login/components/BackButton';
import RegisterForm from './components/RegisterForm';
import { useRegisterHandler } from './hooks/useRegisterHandler';
import { useFormState } from './hooks/useFormState'; 
import { useNavigation } from '../Login/hooks/useNavigation'; // make this global

export default function Register() {
  const { formData, updateField, resetForm } = useFormState();
  const { handleRegister, message, loading } = useRegisterHandler();
  const { navigateToHome } = useNavigation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await handleRegister(formData);
    
    if (result.success) {
      resetForm();
    }
  };

  return (
    <>
      <Header />
      <div className="registerWrapper">
        <div className="registerContainer">
          <BackButton onClick={navigateToHome} />
          
          <RegisterForm
            username={formData.username}
            setUsername={(value) => updateField('username', value)}
            firstName={formData.firstName}
            setFirstName={(value) => updateField('firstName', value)}
            middleName={formData.middleName}
            setMiddleName={(value) => updateField('middleName', value)}
            lastName={formData.lastName}
            setLastName={(value) => updateField('lastName', value)}
            password={formData.password}
            setPassword={(value) => updateField('password', value)}
            message={message}
            loading={loading}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
}