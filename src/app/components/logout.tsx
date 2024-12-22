'use client';
import { useRouter } from 'next/navigation'; 
import { createClient } from '../utils/supabase/client';

const Logout = () => {
  const supabase = createClient();
  const router = useRouter(); 

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out:', error.message);
      } else {
        router.push('/home'); 
      }
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <button className="btn-custom" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
