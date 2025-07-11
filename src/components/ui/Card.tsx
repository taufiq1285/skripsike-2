import { type HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white shadow-sm border border-gray-200',
      bordered: 'bg-white border-2 border-gray-200',
      elevated: 'bg-white shadow-lg border border-gray-100',
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-lg',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';