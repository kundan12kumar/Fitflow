import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const NavigationTabs = () => {
  const location = useLocation();

  const tabs = [
    {
      name: 'Exercises',
      path: '/exercise-dashboard',
      icon: 'Dumbbell',
      description: 'Browse exercise library'
    },
    {
      name: 'My Workouts',
      path: '/workout-builder',
      icon: 'Calendar',
      description: 'Manage your workouts'
    },
    {
      name: 'Progress',
      path: '/progress',
      icon: 'TrendingUp',
      description: 'Track your progress'
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="mb-8">
      <nav className="flex space-x-1 bg-gray-100 p-1 rounded-lg" role="tablist" aria-label="Dashboard navigation">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            role="tab"
            aria-selected={isActive(tab.path)}
            aria-controls={`${tab.name.toLowerCase().replace(' ', '-')}-panel`}
            className={`flex items-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              isActive(tab.path)
                ? 'bg-surface text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface hover:bg-opacity-50'
            }`}
          >
            <Icon 
              name={tab.icon} 
              size={16} 
              color={isActive(tab.path) ? 'var(--color-primary)' : 'currentColor'} 
            />
            <span>{tab.name}</span>
          </Link>
        ))}
      </nav>
      
      {/* Tab descriptions for accessibility */}
      <div className="sr-only">
        {tabs.map((tab) => (
          <div
            key={tab.path}
            id={`${tab.name.toLowerCase().replace(' ', '-')}-panel`}
            role="tabpanel"
            aria-labelledby={tab.path}
          >
            {tab.description}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationTabs;