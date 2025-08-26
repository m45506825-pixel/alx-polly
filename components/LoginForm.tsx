"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

type FormData = {
  email: string;
  password: string;
};

export const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { signIn } = useAuth();

  const onSubmit = async (data: FormData) => {
    try {
      await signIn(data.email, data.password);
      // TODO: redirect on success
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full max-w-md">
      <label className="flex flex-col gap-1">
        <span className="text-sm">Email</span>
        <input {...register('email', { required: true, pattern: /@/ })} className="input" />
        {errors.email && <span className="text-red-500 text-sm">Enter a valid email</span>}
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm">Password</span>
        <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" />
        {errors.password && <span className="text-red-500 text-sm">Password must be at least 6 characters</span>}
      </label>

      <button type="submit" className="btn">
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
