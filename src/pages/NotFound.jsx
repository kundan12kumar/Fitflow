import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="Search" size={48} color="var(--color-primary)" />
          </div>
          <h1 className="text-4xl font-bold text-text-primary mb-4">404</h1>
          <h2 className="text-xl font-semibold text-text-primary mb-2">Page Not Found</h2>
          <p className="text-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/exercise-dashboard"
            className="inline-flex items-center justify-center space-x-2 bg-primary hover:bg-primary-hover text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Icon name="Home" size={20} color="white" />
            <span>Back to Dashboard</span>
          </Link>
          
          <div className="text-text-tertiary">
            <p className="text-sm">
              Need help? <Link to="/exercise-dashboard" className="text-primary hover:text-primary-hover underline">Contact support</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;