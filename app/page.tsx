import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Welcome to ALX Polly</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Create, share, and vote on polls about anything. Get instant results and insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/polls">
              <Button size="lg" className="w-full sm:w-auto">
                View Polls
              </Button>
            </Link>
            <Link href="/polls/create">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Create a Poll
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Create Polls</h3>
              <p className="text-muted-foreground mb-4">Easily create polls with multiple options and share them with others.</p>
              <Link href="/polls/create" className="text-primary hover:underline">
                Get started →
              </Link>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Vote on Polls</h3>
              <p className="text-muted-foreground mb-4">Participate in polls and see real-time results after you vote.</p>
              <Link href="/polls" className="text-primary hover:underline">
                Browse polls →
              </Link>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">User Account</h3>
              <p className="text-muted-foreground mb-4">Create an account to track your polls and votes.</p>
              <Link href="/auth/sign-up" className="text-primary hover:underline">
                Sign up →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
