import clsx from "clsx";

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingState = ({ message = 'Loading...', size = 'md' }: LoadingStateProps) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <svg
            className={clsx('animate-spin text-akbid-600', sizes[size])}
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              className="opacity-25"
            />
            <path
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              className="opacity-75"
            />
          </svg>
        </div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};