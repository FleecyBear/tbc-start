'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import supaBase from '../../../utils/supaBase';

export default function AddBlog() {
  const { user, error, isLoading } = useUser(); 
  const [userCount, setUserCount] = useState<number | null>(null); 
  const [selectedUser, setSelectedUser] = useState<string>(''); 
  const [selectedId, setSelectedId] = useState<string | null>(null); 
  const [isUpdating, setIsUpdating] = useState(false); 

  const fetchUser = async (nickname: string) => {
    try {
      const { data, error } = await supaBase
        .from('users')
        .select('id, count')
        .eq('nickname', nickname)
        .single(); 

      if (error) {
        console.error('Error fetching user data:', error.message);
        return;
      }

      if (data) {
        setSelectedId(data.id); 
        setUserCount(data.count); 
        setSelectedUser(nickname); 
      }
    } catch (err) {
      console.error('An unexpected error occurred while fetching user data:', err);
    }
  };

  const updateUserCount = async () => {
    if (!selectedId || userCount === null) {
      return;
    }

    setIsUpdating(true); 

    try {
      const { data, error } = await supaBase
        .from('users')
        .update({ count: userCount + 1 })
        .eq('id', selectedId)
        .select('count');

      if (error) {
        console.error('Error updating user count:', error.message);
        return;
      }

      if (data) {
        setUserCount(data[0].count); 
      }
    } catch (err) {
      console.error('An unexpected error occurred while updating user count:', err);
    } finally {
      setIsUpdating(false); 
    }
  };

  useEffect(() => {
    if (!isLoading && user) {
      const userNickname = user?.nickname || user?.email || '';
      fetchUser(userNickname);
    }
  }, [isLoading, user]);

  if (isLoading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error.message}</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center p-6 text-white">
      {user ? (
        <>
          <h2 className="text-2xl font-bold">Nickname: {selectedUser}</h2>
          <div className="mt-4">
            {userCount !== null ? (
              <p>
                <strong>Count from Supabase:</strong> {userCount}
              </p>
            ) : (
              <p>Loading count...</p>
            )}
          </div>

          <button
            onClick={updateUserCount}
            disabled={isUpdating}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            {isUpdating ? 'Updating...' : 'Increase Count'}
          </button>
        </>
      ) : (
        <div className="text-center text-lg">You are not logged in.</div>
      )}
    </main>
  );
}
