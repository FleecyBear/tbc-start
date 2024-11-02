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
      const session = await sessionStatus(); 

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
    <div className="app-container">
      <Header />
      <main className="main-container">{children}</main>
      <Footer />
    </div>
  );
}
