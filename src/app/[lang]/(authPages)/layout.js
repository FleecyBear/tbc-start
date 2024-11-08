"use client";
import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Image from 'next/image';

export default function AuthLayout({ children }) {
  const { user, isLoading } = useUser();
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/ge/api/auth/login');
    }
  }, [isLoading, user]);

  if (isLoading || (!user && typeof window !== 'undefined')) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-violet-700">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="absolute inset-0 z-[-1]">
        <Image
          src="/images/bck.png"
          alt="Background Image"
          layout="fill" 
          objectFit="cover" 
        />
      </div>
      <div className="absolute inset-0 bg-violet-400 dark:bg-violet-950 opacity-80 dark:opacity-90 z-[-1]" /> 
      <Header />
      <main className="flex-grow p-4 mt-16 lg:p-12 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
