'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import './Profile.css';

export default function Profile() {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user ? (
      <main className="profile_container">
        <div>
          <img src={user.picture} alt={user.name} className="profile_picture" />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <button 
          onClick={() => {
            window.location.href = '/api/auth/logout';
          }} >
          Logout
        </button>
      </main>
    ) : (
      <div>You are not logged in.</div>
    )
  );
}
