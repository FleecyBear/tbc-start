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
    <div className="flex flex-col min-h-screen bg-violet-400 dark:bg-violet-950 ">
      <Header />
      <main className="flex-grow p-4 mt-16 lg:p-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
