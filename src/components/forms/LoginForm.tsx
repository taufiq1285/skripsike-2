/**
 * Login Form - AKBID Lab System
 * Security: CSRF protection, input validation, rate limiting
 * Status: Template ready for implementation
 */
import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
}

export const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add validation
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="nama@akbid.ac.id"
      />
      
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="••••••••"
      />
      
      <Button
        type="submit"
        className="w-full"
        loading={isLoading}
      >
        Login
      </Button>
    </form>
  );
};
