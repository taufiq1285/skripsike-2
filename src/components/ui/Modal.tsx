/**
 * Modal Component - AKBID Lab System
 * Security: Props validation required, XSS prevention
 * Status: Template ready for implementation
 */
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        <div className="relative bg-white rounded-lg max-w-md w-full p-6">
          {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
          {children}
        </div>
      </div>
    </div>
  );
};
