import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PollsPage() {
  // This will be replaced with actual data fetching
  const mockPolls = [
    { id: '1', title: 'Favorite Programming Language', votes: 120, createdAt: '2023-06-15' },
    { id: '2', title: 'Best Frontend Framework', votes: 85, createdAt: '2023-06-20' },
    { id: '3', title: 'Most Important Developer Skill', votes: 64, createdAt: '2023-06-25' },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Polls</h1>
        <Link href="/polls/create">
          <Button>Create New Poll</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockPolls.map((poll) => (
          <div key={poll.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{poll.title}</h2>
            <div className="text-sm text-muted-foreground mb-4">
              {poll.votes} votes · Created on {new Date(poll.createdAt).toLocaleDateString()}
            </div>
            <Link href={`/polls/${poll.id}`}>
              <Button variant="outline" className="w-full">View Poll</Button>
            </Link>
          </div>
        ))}
      </div>

      {mockPolls.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground mb-4">No polls found</p>
          <Link href="/polls/create">
            <Button>Create Your First Poll</Button>
          </Link>
        </div>
      )}
    </div>
  );
}