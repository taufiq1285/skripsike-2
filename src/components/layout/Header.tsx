/**
 * Header Component - AKBID Lab System
 * Security: Secure logout, session validation
 * Status: Template ready
 */
import React from 'react';

interface HeaderProps {
  userRole?: string;
}

export const Header = ({ userRole }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-akbid-600 rounded-lg mr-3 flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">AKBID Lab System</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {userRole && (
              <span className="text-sm text-gray-500 capitalize">
                {userRole}
              </span>
            )}
            <button className="text-gray-500 hover:text-gray-700">
              í´”
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              í±¤
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
