'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface PollData {
  id: string;
  title: string;
  description?: string;
  options: PollOption[];
  totalVotes: number;
  createdAt: string;
}

export default function PollDetailPage({ params }: { params: { id: string } }) {
  // This will be replaced with actual data fetching
  const pollId = params.id;
  
  // Mock data for the poll
  const mockPoll: PollData = {
    id: pollId,
    title: 'Favorite Programming Language',
    description: 'Vote for your favorite programming language to use in 2023',
    options: [
      { id: '1', text: 'JavaScript', votes: 42 },
      { id: '2', text: 'Python', votes: 38 },
      { id: '3', text: 'TypeScript', votes: 27 },
      { id: '4', text: 'Rust', votes: 13 },
    ],
    totalVotes: 120,
    createdAt: '2023-06-15',
  };

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [poll, setPoll] = useState<PollData>(mockPoll);

  const handleVote = () => {
    if (!selectedOption) return;
    
    // This will be replaced with actual API call
    const updatedOptions = poll.options.map(option => {
      if (option.id === selectedOption) {
        return { ...option, votes: option.votes + 1 };
      }
      return option;
    });

    setPoll({
      ...poll,
      options: updatedOptions,
      totalVotes: poll.totalVotes + 1,
    });

    setHasVoted(true);
  };

  const calculatePercentage = (votes: number) => {
    if (poll.totalVotes === 0) return 0;
    return Math.round((votes / poll.totalVotes) * 100);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="mb-2">
        <Link href="/polls" className="text-primary hover:underline">
          ← Back to all polls
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">{poll.title}</h1>
        {poll.description && (
          <p className="text-muted-foreground mt-2">{poll.description}</p>
        )}
        <div className="text-sm text-muted-foreground mt-2">
          {poll.totalVotes} votes · Created on {new Date(poll.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className="space-y-4">
        {poll.options.map((option) => (
          <div key={option.id} className="border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              {!hasVoted ? (
                <input
                  type="radio"
                  id={option.id}
                  name="poll-option"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={() => setSelectedOption(option.id)}
                  className="h-4 w-4"
                />
              ) : null}
              <label htmlFor={option.id} className="flex-1 font-medium">
                {option.text}
              </label>
              <span className="text-sm font-semibold">
                {calculatePercentage(option.votes)}%
              </span>
            </div>
            {hasVoted && (
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${calculatePercentage(option.votes)}%` }}
                ></div>
              </div>
            )}
          </div>
        ))}

        {!hasVoted && (
          <Button 
            onClick={handleVote} 
            disabled={!selectedOption}
            className="mt-4"
          >
            Vote
          </Button>
        )}

        {hasVoted && (
          <div className="mt-6 text-center">
            <p className="text-muted-foreground mb-4">Thanks for voting!</p>
            <Link href="/polls">
              <Button variant="outline">View All Polls</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}