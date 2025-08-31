'use client';

import { useState, useEffect } from 'react';
import { Poll, ApiResponse } from '@/types';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/auth-context';

export function usePolls() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchPolls() {
      try {
        setLoading(true);
        
        // Use Supabase client to fetch polls
        const { data, error } = await supabase
          .from('polls')
          .select('*, poll_options(*)')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Transform the data to match our Poll type
          const transformedPolls: Poll[] = data.map(poll => ({
            id: poll.id,
            title: poll.title,
            description: poll.description,
            userId: poll.user_id,
            createdAt: poll.created_at,
            options: poll.poll_options.map((option: any) => ({
              id: option.id,
              text: option.text,
              votes: 0 // We'll need to fetch votes separately or calculate them
            }))
          }));
          
          setPolls(transformedPolls);
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
      
      if (!user) {
        throw new Error('You must be logged in to create a poll');
      }
      
      // Insert the poll into Supabase
      const { data: pollData, error: pollError } = await supabase
        .from('polls')
        .insert({
          title: pollData.title,
          description: pollData.description || '',
          user_id: user.id
        })
        .select()
        .single();
      
      if (pollError) throw pollError;
      
      // Insert the options
      const optionsToInsert = pollData.options.map(option => ({
        poll_id: pollData.id,
        text: option
      }));
      
      const { data: optionsData, error: optionsError } = await supabase
        .from('poll_options')
        .insert(optionsToInsert)
        .select();
      
      if (optionsError) throw optionsError;
      
      // Create the poll object to return
      const newPoll: Poll = {
        id: pollData.id,
        title: pollData.title,
        description: pollData.description || '',
        userId: user.id,
        createdAt: pollData.created_at,
        options: optionsData.map((option: any) => ({
          id: option.id,
          text: option.text,
          votes: 0
        }))
      };
      
      setPolls(prev => [...prev, newPoll]);
      return { success: true, data: newPoll };
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred while creating the poll';
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
  const { user } = useAuth();

  useEffect(() => {
    async function fetchPoll() {
      try {
        setLoading(true);
        
        // Fetch the poll with its options
        const { data: pollData, error: pollError } = await supabase
          .from('polls')
          .select('*')
          .eq('id', pollId)
          .single();
        
        if (pollError) throw pollError;
        
        // Fetch the options for this poll
        const { data: optionsData, error: optionsError } = await supabase
          .from('poll_options')
          .select('*')
          .eq('poll_id', pollId);
        
        if (optionsError) throw optionsError;
        
        // Fetch votes for this poll
        const { data: votesData, error: votesError } = await supabase
          .from('votes')
          .select('option_id, count')
          .eq('poll_id', pollId)
          .group('option_id');
        
        if (votesError) throw votesError;
        
        // Create a map of option_id to vote count
        const voteCountMap: Record<string, number> = {};
        votesData.forEach((vote: any) => {
          voteCountMap[vote.option_id] = parseInt(vote.count);
        });
        
        // Transform the data to match our Poll type
        const transformedPoll: Poll = {
          id: pollData.id,
          title: pollData.title,
          description: pollData.description,
          userId: pollData.user_id,
          createdAt: pollData.created_at,
          options: optionsData.map((option: any) => ({
            id: option.id,
            text: option.text,
            votes: voteCountMap[option.id] || 0
          }))
        };
        
        setPoll(transformedPoll);
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
      
      if (!user) {
        throw new Error('You must be logged in to vote');
      }
      
      if (!poll) {
        throw new Error('Poll not found');
      }
      
      // Check if user has already voted on this poll
      const { data: existingVote, error: checkError } = await supabase
        .from('votes')
        .select('*')
        .eq('poll_id', pollId)
        .eq('user_id', user.id)
        .single();
      
      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 means no rows returned
        throw checkError;
      }
      
      if (existingVote) {
        // User has already voted, update their vote
        const { error: updateError } = await supabase
          .from('votes')
          .update({ option_id: optionId })
          .eq('id', existingVote.id);
        
        if (updateError) throw updateError;
      } else {
        // User hasn't voted yet, insert new vote
        const { error: insertError } = await supabase
          .from('votes')
          .insert({
            poll_id: pollId,
            option_id: optionId,
            user_id: user.id
          });
        
        if (insertError) throw insertError;
      }
      
      // Refetch the poll to get updated vote counts
      const { data: updatedOptionsData, error: optionsError } = await supabase
        .from('poll_options')
        .select('*')
        .eq('poll_id', pollId);
      
      if (optionsError) throw optionsError;
      
      // Fetch updated vote counts
      const { data: votesData, error: votesError } = await supabase
        .from('votes')
        .select('option_id, count')
        .eq('poll_id', pollId)
        .group('option_id');
      
      if (votesError) throw votesError;
      
      // Create a map of option_id to vote count
      const voteCountMap: Record<string, number> = {};
      votesData.forEach((vote: any) => {
        voteCountMap[vote.option_id] = parseInt(vote.count);
      });
      
      // Update the poll with new vote counts
      const updatedPoll = {
        ...poll,
        options: updatedOptionsData.map((option: any) => ({
          id: option.id,
          text: option.text,
          votes: voteCountMap[option.id] || 0
        }))
      };
      
      setPoll(updatedPoll);
      return { success: true, data: updatedPoll };
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred while voting on the poll';
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