"use client";

import React from 'react';
import PollCard from './PollCard';

const demo = [
  { id: '1', title: 'UI style choice', description: 'Minimal vs full-featured' },
  { id: '2', title: 'Feature prioritization', description: 'Authentication or Poll creation first?' },
];

export const PollList: React.FC = () => {
  return (
    <div>
      {demo.map((p) => (
        <PollCard key={p.id} title={p.title} description={p.description} />
      ))}
    </div>
  );
};

export default PollList;
