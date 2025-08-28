"use client";

import React from 'react';
import Card from './ui/Card';

export const PollCard: React.FC<{ title: string; description?: string }> = ({ title, description }) => {
  return (
    <Card className="mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
    </Card>
  );
};

export default PollCard;
