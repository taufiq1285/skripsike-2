import { useState } from 'react';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { LoginForm } from '../../components/forms/LoginForm';
import { QuickLogin } from '../../components/dev-tools/QuickLogin';
import { ENV } from '../../lib/constants/env';

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement authentication logic
      // SECURITY: Add CSRF protection
      // SECURITY: Implement rate limiting
      // SECURITY: Validate credentials securely
      
      console.log('Login attempt:', { email, password: '***' });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Handle successful login
    } catch (error) {
      console.error('Login error:', error);
      // TODO: Handle login error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Login ke AKBID Lab">
      <div className="space-y-6">
        {ENV.DEV_MODE && (
          <QuickLogin onLogin={handleLogin} />
        )}
        
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        
        <div className="text-center">
          <a href="/forgot-password" className="text-sm text-akbid-600 hover:text-akbid-500">
            Lupa Password?
          </a>
        </div>
      </div>
    </AuthLayout>
  );
};
