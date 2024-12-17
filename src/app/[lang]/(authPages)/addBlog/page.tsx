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
  const [isUserCreated, setIsUserCreated] = useState(false);

  const fetchUser = async (nickname: string) => {
    try {
      const { data, error } = await supaBase
        .from('users')
        .select('id, count')
        .eq('nickname', nickname)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          await supaBase
            .from('users')
            .insert([{ nickname, count: 0 }]);
          setIsUserCreated(true);
          return;
        }
        return;
      }

      if (data) {
        setSelectedId(data.id);
        setUserCount(data.count);
        setSelectedUser(nickname);
        setIsUserCreated(false);
      }
    } catch (err) {}
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
        return;
      }

      if (data) {
        setUserCount(data[0].count);
      }
    } catch (err) {} finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (!isLoading && user) {
      const userNickname = user?.nickname || user?.email || '';
      fetchUser(userNickname);
    }
  }, [isLoading, user]);

  useEffect(() => {
    if (isUserCreated && user) {
      const userNickname = user?.nickname || user?.email || '';
      fetchUser(userNickname);
    }
  }, [isUserCreated, user]);

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
