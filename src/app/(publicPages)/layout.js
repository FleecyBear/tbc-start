'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../global.css'
import { sessionStatus } from '../utils/session';

export default function PublicLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const checkSession = async () => {
      const session = await sessionStatus(); 

      if (session===true) {
        router.push('/profile'); 
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
    <main className="main">{children}</main>
  );
}

