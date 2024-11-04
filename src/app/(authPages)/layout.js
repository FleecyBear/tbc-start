'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../global.css'
import { sessionStatus } from '../utils/actions';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';


export default function AuthLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const checkSession = async () => {
      const session = sessionStatus(); 

      if (session===false) {
        router.push('/login'); 
      } else {
        setLoading(false); 
      }
    };
    checkSession();
  }, [router]); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="flex flex-col min-h-screen bg-purple-500
    dark:bg-purple-900">
    <Header />
    <main className="flex-grow p-4 md:p-8 lg:p-12">
      {children}
    </main>
    <Footer />
  </div>
  );
}
