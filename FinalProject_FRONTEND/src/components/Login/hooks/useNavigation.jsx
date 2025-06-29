import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  const navigateBack = () => {
    navigate(-1);
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return {
    navigateToHome,
    navigateToLogin,
    navigateToRegister,
    navigateBack,
    navigateTo
  };
};