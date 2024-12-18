'use client';

import { useState } from 'react';
import supaBase from './supaBase';

interface CountUpdaterProps {
  selectedId: string | null;
  currentCount: number | null;
  setUserCount: React.Dispatch<React.SetStateAction<number | null>>;
}

export const CountUpdater = ({ selectedId, currentCount, setUserCount }: CountUpdaterProps) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const fetchCurrentCount = async () => {
    if (!selectedId) return null;

    try {
      const { data, error } = await supaBase
        .from('users')
        .select('count')
        .eq('id', selectedId)
        .single();

      if (error) {
        console.error('Error fetching current count:', error.message);
        return null;
      }

      return data?.count ?? null;
    } catch (err) {
      console.error('Error fetching current count:', err);
      return null;
    }
  };

  const increaseUserCount = async () => {
    if (!selectedId || currentCount === null) return;

    setIsUpdating(true);

    try {
      const { data, error } = await supaBase
        .from('users')
        .update({ count: currentCount + 1 })
        .eq('id', selectedId)
        .select('count');

      if (error) {
        console.error('Error increasing count:', error.message);
        return;
      }

      if (data) setUserCount(data[0].count);
    } catch (err) {
      console.error('Error increasing count:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const decreaseUserCount = async () => {
    if (!selectedId || currentCount === null || currentCount <= 0) return;

    setIsUpdating(true);

    try {
      const { data, error } = await supaBase
        .from('users')
        .update({ count: currentCount - 1 })
        .eq('id', selectedId)
        .select('count');

      if (error) {
        console.error('Error decreasing count:', error.message);
        return;
      }

      if (data) setUserCount(data[0].count);
    } catch (err) {
      console.error('Error decreasing count:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const displayCurrentCount = async () => {
    const freshCount = await fetchCurrentCount();
    return freshCount !== null ? freshCount : 'Loading...';
  };

  return {
    increaseUserCount,
    decreaseUserCount,
    displayCurrentCount,
  };
};
