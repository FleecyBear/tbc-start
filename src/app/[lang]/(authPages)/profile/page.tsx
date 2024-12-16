'use client';

import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

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

  if (isLoading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-red-500">{error.message}</div>;

  const getUserDetail = (detail: string | null | undefined): string => {
    return detail ? detail : 'Not set up';
  };
  


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

      <button
        onClick={() => {
          window.location.href = '/api/auth/logout';
        }}
        className="mt-4 px-4 py-2 btn-2"
      >
        Logout
      </button>
    </main>
  ) : (
    <div className="text-center text-lg">You are not logged in.</div>
  );
}
