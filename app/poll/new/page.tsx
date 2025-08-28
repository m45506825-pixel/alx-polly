import Link from 'next/link';
import { Button } from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

export default function NewPollPage() {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Create a new poll (placeholder)</h1>
        <div className="grid gap-4">
          <Input label="Title" placeholder="Poll title" />
          <Input label="Description" placeholder="Short description" />
          <div className="flex gap-2">
            <Button>Save (mock)</Button>
            <Link href="/poll" className="ml-auto text-sm text-blue-600 underline">Cancel</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
