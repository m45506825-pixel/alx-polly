import { NextResponse } from 'next/server';
import { ApiResponse, Poll } from '@/types';

// Mock data - in a real app, this would be stored in a database
let mockPolls: Poll[] = [
  {
    id: '1',
    title: 'Favorite Programming Language',
    description: 'Vote for your favorite programming language to use in 2023',
    options: [
      { id: '1', text: 'JavaScript', votes: 42 },
      { id: '2', text: 'Python', votes: 38 },
      { id: '3', text: 'TypeScript', votes: 27 },
      { id: '4', text: 'Rust', votes: 13 },
    ],
    totalVotes: 120,
    createdAt: new Date().toISOString(),
    userId: '1',
    isOpen: true,
  },
  {
    id: '2',
    title: 'Best Frontend Framework',
    description: 'Which frontend framework do you prefer?',
    options: [
      { id: '1', text: 'React', votes: 35 },
      { id: '2', text: 'Vue', votes: 25 },
      { id: '3', text: 'Angular', votes: 15 },
      { id: '4', text: 'Svelte', votes: 10 },
    ],
    totalVotes: 85,
    createdAt: new Date().toISOString(),
    userId: '1',
    isOpen: true,
  },
];

// GET /api/polls - Get all polls
export async function GET() {
  try {
    const response: ApiResponse<Poll[]> = {
      success: true,
      data: mockPolls,
    };
    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch polls',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// POST /api/polls - Create a new poll
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, options } = body;

    // Validate input
    if (!title || !options || options.length < 2) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Invalid poll data. Title and at least 2 options are required.',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Create new poll
    const newPoll: Poll = {
      id: Date.now().toString(),
      title,
      description,
      options: options.map((text: string, index: number) => ({
        id: (index + 1).toString(),
        text,
        votes: 0,
      })),
      totalVotes: 0,
      createdAt: new Date().toISOString(),
      userId: '1', // In a real app, this would be the authenticated user's ID
      isOpen: true,
    };

    // Add to mock database
    mockPolls.push(newPoll);

    const response: ApiResponse<Poll> = {
      success: true,
      data: newPoll,
    };
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to create poll',
    };
    return NextResponse.json(response, { status: 500 });
  }
}