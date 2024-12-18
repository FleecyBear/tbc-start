'use client';

import { useState, useEffect } from 'react';
import supaBase from './supaBase';

interface CountUpdaterProps {
  nickname: string;
  setUserCount: React.Dispatch<React.SetStateAction<number | null>>;
}

export const CountUpdater = ({ nickname, setUserCount }: CountUpdaterProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentCount, setCurrentCount] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supaBase
          .from('users')
          .select('id, count')
          .eq('nickname', nickname)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            await supaBase.from('users').insert([{ nickname, count: 0 }]);
            return;
          }
          console.error('Error fetching user:', error);
          return;
        }

        if (data) {
          setSelectedId(data.id);
          setCurrentCount(data.count);
          setUserCount(data.count);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    if (nickname) {
      fetchUser();
    }
  }, [nickname, setUserCount]);

  const increaseUserCount = async () => {
    if (!selectedId || currentCount === null) return;

    setIsUpdating(true);

    const newCount = currentCount + 1;
    setCurrentCount(newCount);
    setUserCount(newCount);

    try {
      const { data, error } = await supaBase
        .from('users')
        .update({ count: newCount })
        .eq('id', selectedId)
        .select('count');

      if (error) {
        console.error('Error increasing count:', error.message);
        return;
      }

      if (data) {
        setUserCount(data[0].count);
        setCurrentCount(data[0].count);
      }
    } catch (err) {
      console.error('Error increasing count:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const decreaseUserCount = async () => {
    if (!selectedId || currentCount === null || currentCount <= 0) return;

    setIsUpdating(true);

    const newCount = currentCount - 1;
    setCurrentCount(newCount);
    setUserCount(newCount);

    try {
      const { data, error } = await supaBase
        .from('users')
        .update({ count: newCount })
        .eq('id', selectedId)
        .select('count');

      if (error) {
        console.error('Error decreasing count:', error.message);
        return;
      }

      if (data) {
        setUserCount(data[0].count);
        setCurrentCount(data[0].count);
      }
    } catch (err) {
      console.error('Error decreasing count:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const displayCurrentCount = () => {
    return currentCount !== null ? currentCount : 'Loading...';
  };

  return {
    increaseUserCount,
    decreaseUserCount,
    displayCurrentCount,
  };
};
