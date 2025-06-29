import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate('/schooleventcalendar/landing');
  const navigateToLogin = () => navigate('/schooleventcalendar/login');
  const navigateToRegister = () => navigate('/schooleventcalendar/register');
  const navigateBack = () => navigate(-1);
  const navigateTo = (path) => navigate(`/schooleventcalendar/${path}`);

  return {
    navigateToHome,
    navigateToLogin,
    navigateToRegister,
    navigateBack,
    navigateTo
  };
};
