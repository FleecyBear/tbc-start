'use client';

import { createClient } from '../../../utils/supabase/client'; 
import { useEffect, useState } from 'react';
import { CountUpdater } from '../../../utils/countUpdater';

interface UserType {
  picture?: string;
  name?: string;
  nickname?: string;
  email?: string;
  username?: string;
  phone_number?: string;
  phone_verified?: boolean;
}

const supabase = createClient();

export default function Profile() {
  const [user, setUser] = useState<UserType | null>(null);
  const [userCount, setUserCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        setUser(data.user);
      } catch (err) {
        setError('Failed to load user details');
      } finally {
        setIsLoading(false); 
      }
    };
    fetchUserDetails();
  }, []);

  const getUserDetail = (detail: string | null | undefined): string => {
    return detail ? detail : 'Not set up';
  };

  const { displayCurrentCount } = CountUpdater({
    nickname: user?.email || '', 
    setUserCount,
  });

  useEffect(() => {
    const fetchCount = async () => {
      const freshCount = displayCurrentCount();
      if (typeof freshCount === 'number') {
        setUserCount(freshCount);
      }
    };

    if (user?.email) {
      fetchCount();
    }
  }, [displayCurrentCount, user?.email]);

  if (isLoading) {
    return (
      <div className="text-center text-lg">
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return user ? (
    <main className="flex flex-col items-center justify-center p-6 text-white">
      <div className="flex flex-col items-center mb-4">
        <img
          src={user.picture ?? '/default-avatar.png'}
          alt={user.name ?? 'User'}
          className="w-32 h-32 rounded-full border-2 border-white mb-4"
        />
        <h2 className="text-2xl font-bold">{getUserDetail(user.email)}</h2>
        <p className="text-lg">{getUserDetail(user.email)}</p>
      </div>

      <div className="section-1 p-1">
        <h3 className="h2-1">Additional Information</h3>
        <p>
          <strong>Name:</strong> {getUserDetail(user.name)}
        </p>
        <p>
          <strong>Email:</strong> {getUserDetail(user.email)}
        </p>
        <p>
          <strong>Phone Number:</strong> {getUserDetail(user.phone_number)}
        </p>
        <p>
          <strong>Phone Verified:</strong> {user.phone_verified ? 'Yes' : 'No'}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center p-6 text-white">
        <h3 className="h2-1">Blogs Balance</h3>
        <p className="text-xl p-1">
          <strong>Current Balance:</strong> {userCount !== null ? userCount : 'Loading...'}
        </p>
      </div>

      <button
        onClick={() => {
          window.location.href = '/pricing';
        }}
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
      >
        Buy More
      </button>
      <button
        onClick={() => {
          window.location.href = '/api/auth/logout';
        }}
        className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
      >
        Logout
      </button>
    </main>
  ) : (
    <div className="text-center text-lg">You are not logged in.</div>
  );
}
