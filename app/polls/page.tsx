import Link from 'next/link';
import PollList from '../../components/PollList';
import { Button } from '../../components/ui/Button';

export const metadata = {
  title: 'Polls',
  description: 'Polls dashboard'
};

export default function PollsPage() {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Polls</h1>
          <Link href="/poll/new">
            <Button variant="default">New poll</Button>
          </Link>
        </div>

        <PollList />
      </div>

      <Link href="/" className="mt-8 text-sm text-blue-600 underline">Back home</Link>
    </div>
  );
}
