import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = ({ variant = 'default' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', path: '/exercise-dashboard', icon: 'LayoutDashboard' },
    { name: 'Exercise Detail', path: '/exercise-detail', icon: 'Dumbbell' },
    { name: 'Workout Builder', path: '/workout-builder', icon: 'Plus' },
    { name: 'Workout Execution', path: '/workout-execution', icon: 'Play' }
  ];

  const isActive = (path) => location.pathname === path;

  const headerClasses = {
    default: 'bg-surface border-b border-border',
    transparent: 'bg-transparent',
    compact: 'bg-surface border-b border-border py-2'
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`sticky top-0 z-50 ${headerClasses[variant]} ${variant === 'compact' ? 'py-2' : 'py-4'}`}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-white px-4 py-2 rounded">
        Skip to content
      </a>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/exercise-dashboard" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary-hover transition-colors">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <span className="text-xl font-bold text-text-primary">FitFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  isActive(item.path)
                    ? 'bg-primary-light text-primary-600' :'text-text-secondary hover:text-text-primary hover:bg-gray-100'
                }`}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Profile & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* User Profile */}
            <div className="hidden md:flex items-center space-x-3">
              <button className="p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                <Icon name="Bell" size={20} />
              </button>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden mt-4 pb-4 border-t border-border pt-4"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    isActive(item.path)
                      ? 'bg-primary-light text-primary-600' :'text-text-secondary hover:text-text-primary hover:bg-gray-100'
                  }`}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
            
            {/* Mobile User Actions */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} color="white" />
                  </div>
                  <span className="text-text-primary font-medium">Profile</span>
                </div>
                <button className="p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  <Icon name="Bell" size={20} />
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;