export function handleLogout() {
  localStorage.clear();
  window.location.href = '/schooleventcalendar/login';
}
