"use client";

import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <div className={`bg-white border rounded-lg shadow-sm p-4 ${className}`}>{children}</div>;
};

export default Card;
