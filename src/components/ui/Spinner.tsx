/**
 * Spinner Component - AKBID Lab System
 * Security: No external dependencies, CSS-only animation
 * Status: Ready for use
 */
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const Spinner = ({ size = 'md', color = 'text-akbid-600' }: SpinnerProps) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`animate-spin ${sizes[size]} ${color}`}>
      <svg fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
      </svg>
    </div>
  );
};
