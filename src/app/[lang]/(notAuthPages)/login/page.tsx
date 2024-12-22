'use client'
import { login, signup } from './actions';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
  const [isSignup, setIsSignup] = useState(false); // State to toggle between Login and Signup
  const [error, setError] = useState<string | null>(null); // State to handle error messages

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    await login(formData);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setError(null); 

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    await signup(formData);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-blue-500">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 text-sm font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 text-sm font-medium">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {isSignup && (
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-600 text-sm font-medium">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          {error && (
            <div className="mb-4 text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col mb-6 space-y-4">
            <button 
              type="button" 
              onClick={isSignup ? handleSignup : handleLogin}
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {isSignup ? 'Sign Up' : 'Log In'}
            </button>
            <button 
              type="button"
              onClick={() => setIsSignup(!isSignup)} 
              className="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {isSignup ? 'Already have an account? Log In' : 'Don’t have an account? Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
