'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { CountUpdater } from '../../../utils/countUpdater'; 
import supaBase from '../../../utils/supaBase';
export default function AddBlog() {
  const { user, error, isLoading } = useUser();
  const [userCount, setUserCount] = useState<number | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [titleKa, setTitleKa] = useState<string>('');
  const [descriptionKa, setDescriptionKa] = useState<string>('');
  const [isBlogAdded, setIsBlogAdded] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const { increaseUserCount, decreaseUserCount, displayCurrentCount } = CountUpdater({
    nickname: user?.nickname || '',
    setUserCount,
  });

  const addBlog = async () => {
    const currentCount = displayCurrentCount();

    if (currentCount === 'Loading...') {
      return alert('Count is still loading. Please wait.');
    }

    if (currentCount <= 0) {
      return alert('You need more than 0 count to add a blog!');
    }

    const blogData = {
      Title: title,
      Description: description,
      Title_Ka: titleKa,
      Description_Ka: descriptionKa,
    };

    setIsUpdating(true);

    try {
      const { error } = await supaBase.from('Blogs').insert([blogData]);

      if (error) {
        console.error('Error adding blog:', error.message);
        return;
      }

      await decreaseUserCount(); 
      setIsBlogAdded(true);
    } catch (err) {
      console.error('An unexpected error occurred:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (!isLoading && user) {
    }
  }, [isLoading, user]);

  if (isLoading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error.message}</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center p-6 text-black">
      {user ? (
        <>
          <h2 className="text-2xl font-bold">Nickname: {user.nickname}</h2>
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
            onClick={increaseUserCount}
            disabled={isUpdating}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            {isUpdating ? 'Updating...' : 'Increase Count'}
          </button>

          <div className="mt-4">
            <h3 className="text-xl">Add Blog</h3>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 p-2 w-full"
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 p-2 w-full"
            />
            <input
              type="text"
              placeholder="Title (Georgian)"
              value={titleKa}
              onChange={(e) => setTitleKa(e.target.value)}
              className="mt-2 p-2 w-full"
            />
            <input
              type="text"
              placeholder="Description (Georgian)"
              value={descriptionKa}
              onChange={(e) => setDescriptionKa(e.target.value)}
              className="mt-2 p-2 w-full"
            />
            <button
              onClick={addBlog}
              disabled={isUpdating}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              {isUpdating ? 'Adding Blog...' : 'Add Blog'}
            </button>
            {isBlogAdded && <p className="mt-2 text-green-500">Blog added successfully!</p>}
          </div>
        </>
      ) : (
        <div className="text-center text-lg">You are not logged in.</div>
      )}
    </main>
  );
}
