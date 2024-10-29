export function sessionStatus() {
  const token = localStorage.getItem('accessToken');
  return token !== null; 
}