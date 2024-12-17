'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import supaBase from '../../../utils/supaBase';

export default function AddBlog() {
  const { user, error, isLoading } = useUser();
  const [userCount, setUserCount] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isUserCreated, setIsUserCreated] = useState<boolean>(false);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [titleKa, setTitleKa] = useState<string>('');
  const [descriptionKa, setDescriptionKa] = useState<string>('');
  const [isBlogAdded, setIsBlogAdded] = useState<boolean>(false);

  const fetchUser = async (nickname: string) => {
    try {
      const { data, error } = await supaBase
        .from('users')
        .select('id, count')
        .eq('nickname', nickname)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          await supaBase.from('users').insert([{ nickname, count: 0 }]);
          setIsUserCreated(true);
          return;
        }
        console.error('Error fetching user:', error);
        return;
      }

      if (data) {
        setSelectedId(data.id);
        setUserCount(data.count);
        setSelectedUser(nickname);
        setIsUserCreated(false);
      }
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  };

  const addBlog = async () => {
    if (userCount === null || userCount <= 0) {
      return alert('You need more than 0 count to add a blog!');
    }

    const blogData = {
      Title: title,
      Description: description,
      Title_Ka: titleKa,
      Description_Ka: descriptionKa,
    };

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
    }
  };

  const increaseUserCount = async () => {
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
        console.error('Error increasing count:', error.message);
        return;
      }

      if (data) {
        setUserCount(data[0].count);
      }
    } catch (err) {
      console.error('Error increasing count:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const decreaseUserCount = async () => {
    if (!selectedId || userCount === null || userCount <= 0) {
      return;
    }

    setIsUpdating(true);

    try {
      const { data, error } = await supaBase
        .from('users')
        .update({ count: userCount - 1 })
        .eq('id', selectedId)
        .select('count');

      if (error) {
        console.error('Error decreasing count:', error.message);
        return;
      }

      if (data) {
        setUserCount(data[0].count);
      }
    } catch (err) {
      console.error('Error decreasing count:', err);
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
    <main className="flex flex-col items-center justify-center p-6 text-black">
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
              Add Blog
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
