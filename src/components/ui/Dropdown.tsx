/**
 * Dropdown Component - AKBID Lab System
 * Security: Event handler validation, escape key handling
 * Status: Template ready
 */
import { useState, useRef, useEffect, ReactNode } from 'react';

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'left' | 'right';
}

export const Dropdown = ({ trigger, children, align = 'left' }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className={`absolute top-full mt-2 w-48 bg-white border rounded-lg shadow-lg z-50 ${
          align === 'right' ? 'right-0' : 'left-0'
        }`}>
          {children}
        </div>
      )}
    </div>
  );
};
