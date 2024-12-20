'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { CountUpdater } from '../../../utils/countUpdater';
import { useState, useEffect } from 'react';

interface UserType {
  picture?: string;
  name?: string;
  nickname?: string;
  email?: string;
  username?: string;
  phone_number?: string;
  phone_verified?: boolean;
}

export default function Profile() {
  const { user, error, isLoading } = useUser();
  const [userCount, setUserCount] = useState<number | null>(null);

  const getUserDetail = (detail: string | null | undefined): string => {
    return detail ? detail : 'Not set up';
  };

  const { displayCurrentCount } = CountUpdater({
    nickname: user?.nickname || '',
    setUserCount,
  });

  useEffect(() => {
    const fetchCount = async () => {
      const freshCount = displayCurrentCount();
      if (typeof freshCount === 'number') {
        setUserCount(freshCount);
      }
    };

    if (user?.nickname) {
      fetchCount();
    }
  }, [displayCurrentCount, user?.nickname]);

  if (isLoading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-red-500">{error.message}</div>;

  return user ? (
    <main className="flex flex-col items-center justify-center p-6 text-white">
      <div className="flex flex-col items-center mb-4">
        <img
          src={user.picture ?? '/default-avatar.png'} 
          alt={user.name ?? 'User'}
          className="w-32 h-32 rounded-full border-2 border-white mb-4"
        />
        <h2 className="text-2xl font-bold">{getUserDetail(user.nickname)}</h2>
        <p className="text-lg">{getUserDetail(user.email)}</p>
      </div>

      <div className="section-1 p-1">
        <h3 className="h2-1">Additional Information</h3>
        <p>
          <strong>Name:</strong> {getUserDetail(user.name)}
        </p>
        <p>
          <strong>Nickname:</strong> {getUserDetail(user.nickname)}
        </p>
        <p>
          <strong>Username:</strong> {getUserDetail((user as UserType).username)}
        </p>
        <p>
          <strong>Email:</strong> {getUserDetail(user.email)}
        </p>
        <p>
          <strong>Phone Number:</strong> {getUserDetail((user as UserType).phone_number)}
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
