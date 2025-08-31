// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: string;
}

// Poll related types
export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  title: string;
  description?: string;
  options: PollOption[];
  totalVotes: number;
  createdAt: string;
  userId: string;
  isOpen: boolean;
}

// Vote related types
export interface Vote {
  id: string;
  pollId: string;
  optionId: string;
  userId: string;
  createdAt: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}