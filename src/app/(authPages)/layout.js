'use client';
import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client'; 
import '../global.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

export default function AuthLayout({ children }) {
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = '/api/auth/login';
    }
  }, [isLoading, user]); 

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="flex flex-col min-h-screen bg-purple-500 dark:bg-purple-900">
      <Header />
      <main className="flex-grow p-4 md:p-8 lg:p-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
