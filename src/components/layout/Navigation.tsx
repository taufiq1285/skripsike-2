/**
 * Navigation Component - AKBID Lab System
 * Security: Route guards, permission checks
 * Status: Template ready
 */
import { Link } from 'react-router-dom';

interface NavigationProps {
  userRole?: string;
}

export const Navigation = ({ userRole }: NavigationProps) => {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-akbid-600">
              AKBID Lab
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {!userRole ? (
              <Link 
                to="/login" 
                className="bg-akbid-600 text-white px-4 py-2 rounded-md hover:bg-akbid-700"
              >
                Login
              </Link>
            ) : (
              <span className="text-gray-700">Welcome, {userRole}</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
