'use client';

import { useState, useEffect } from 'react';
import { Poll, ApiResponse } from '@/types';

export function usePolls() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPolls() {
      try {
        setLoading(true);
        const response = await fetch('/api/polls');
        const data: ApiResponse<Poll[]> = await response.json();
        
        if (data.success && data.data) {
          setPolls(data.data);
        } else {
          setError(data.error || 'Failed to fetch polls');
        }
      } catch (err) {
        setError('An error occurred while fetching polls');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPolls();
  }, []);

  const createPoll = async (pollData: { title: string; description?: string; options: string[] }) => {
    try {
      setLoading(true);
      const response = await fetch('/api/polls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pollData),
      });

      const data: ApiResponse<Poll> = await response.json();
      
      if (data.success && data.data) {
        setPolls(prev => [...prev, data.data!]);
        return { success: true, data: data.data };
      } else {
        setError(data.error || 'Failed to create poll');
        return { success: false, error: data.error };
      }
    } catch (err) {
      const errorMessage = 'An error occurred while creating the poll';
      setError(errorMessage);
      console.error(err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    polls,
    loading,
    error,
    createPoll,
  };
}

export function usePoll(pollId: string) {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPoll() {
      try {
        setLoading(true);
        const response = await fetch(`/api/polls/${pollId}`);
        const data: ApiResponse<Poll> = await response.json();
        
        if (data.success && data.data) {
          setPoll(data.data);
        } else {
          setError(data.error || 'Failed to fetch poll');
        }
      } catch (err) {
        setError('An error occurred while fetching the poll');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (pollId) {
      fetchPoll();
    }
  }, [pollId]);

  const votePoll = async (optionId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/polls/${pollId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ optionId }),
      });

      const data: ApiResponse<Poll> = await response.json();
      
      if (data.success && data.data) {
        setPoll(data.data);
        return { success: true, data: data.data };
      } else {
        setError(data.error || 'Failed to vote on poll');
        return { success: false, error: data.error };
      }
    } catch (err) {
      const errorMessage = 'An error occurred while voting on the poll';
      setError(errorMessage);
      console.error(err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    poll,
    loading,
    error,
    votePoll,
  };
}