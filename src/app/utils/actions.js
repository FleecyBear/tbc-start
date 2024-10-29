'use client';

export async function authenticate(formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  console.log('Email:', email);
  console.log('Password:', password);

  try {
    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: email, 
        password: password,
        expiresInMins: 30, 
      }),
    });

    const user = await res.json();

    if (res.ok) {
      localStorage.setItem('accessToken', user.accessToken);
      localStorage.setItem('refreshToken', user.refreshToken);
      console.log('User authenticated:', user);

      window.location.href = '/profile'; 
    } else {
      console.error('Authentication failed:', user.message);
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
  }
}

export function signOut() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  console.log('User signed out');

  window.location.href = '/signIn';
}

export function sessionStatus() {
  const token = localStorage.getItem('accessToken');
  return token !== null; 
}