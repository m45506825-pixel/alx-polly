'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CreatePollPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['', '']);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length <= 2) return; // Minimum 2 options required
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Create poll logic will be implemented here
    const pollData = {
      title,
      description,
      options: options.filter(option => option.trim() !== '')
    };
    console.log('Creating poll with:', pollData);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create a New Poll</h1>
        <p className="text-muted-foreground mt-2">Ask a question and define the options for people to vote on</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium">
            Poll Question
          </label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border-0 py-1.5 px-3 ring-1 ring-inset ring-input bg-background text-foreground focus:ring-2 focus:ring-inset focus:ring-primary"
            placeholder="What is your favorite programming language?"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium">
            Description (Optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-md border-0 py-1.5 px-3 ring-1 ring-inset ring-input bg-background text-foreground focus:ring-2 focus:ring-inset focus:ring-primary"
            placeholder="Provide additional context for your poll"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium">Poll Options</label>
          {options.map((option, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                required
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="flex-1 rounded-md border-0 py-1.5 px-3 ring-1 ring-inset ring-input bg-background text-foreground focus:ring-2 focus:ring-inset focus:ring-primary"
                placeholder={`Option ${index + 1}`}
              />
              {options.length > 2 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => handleRemoveOption(index)}
                  className="px-3"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleAddOption}
            className="w-full"
          >
            Add Option
          </Button>
        </div>

        <div className="flex gap-4 pt-4">
          <Link href="/polls">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit">
            Create Poll
          </Button>
        </div>
      </form>
    </div>
  );
}