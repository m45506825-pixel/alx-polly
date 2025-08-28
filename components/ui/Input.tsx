"use client";

import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string };

export const Input: React.FC<Props> = ({ label, className = '', ...rest }) => {
  return (
    <label className="flex flex-col gap-1">
      {label && <span className="text-sm text-gray-700">{label}</span>}
      <input className={`border rounded-md px-3 py-2 ${className}`} {...rest} />
    </label>
  );
};

export default Input;
