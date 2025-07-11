import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-6 text-center">
            <div className="text-red-600 text-4xl mb-4">💥</div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-4">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            {this.state.error && (
              <details className="text-left mb-4 p-3 bg-gray-100 rounded text-sm">
                <summary className="cursor-pointer font-medium">Error Details</summary>
                <pre className="mt-2 text-xs overflow-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <div className="space-x-2">
              <Button
                onClick={() => window.location.reload()}
                variant="primary"
              >
                Reload Page
              </Button>
              <Button
                onClick={() => this.setState({ hasError: false })}
                variant="outline"
              >
                Try Again
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}