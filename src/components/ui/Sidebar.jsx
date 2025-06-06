import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = ({ variant = 'expanded' }) => {
  const [isCollapsed, setIsCollapsed] = useState(variant === 'collapsed');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', path: '/exercise-dashboard', icon: 'LayoutDashboard', category: 'main' },
    { name: 'Exercise Detail', path: '/exercise-detail', icon: 'Dumbbell', category: 'main' },
    { name: 'Workout Builder', path: '/workout-builder', icon: 'Plus', category: 'workouts' },
    { name: 'Workout Execution', path: '/workout-execution', icon: 'Play', category: 'workouts' }
  ];

  const workoutCategories = [
    { name: 'Strength Training', icon: 'Dumbbell', count: 12 },
    { name: 'Cardio', icon: 'Heart', count: 8 },
    { name: 'Flexibility', icon: 'Zap', count: 6 },
    { name: 'HIIT', icon: 'Timer', count: 10 }
  ];

  const savedRoutines = [
    { name: 'Morning Routine', exercises: 5, duration: '30 min' },
    { name: 'Full Body Blast', exercises: 8, duration: '45 min' },
    { name: 'Quick Cardio', exercises: 4, duration: '15 min' }
  ];

  const isActive = (path) => location.pathname === path;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  if (variant === 'mobile') {
    return (
      <>
        {/* Mobile Overlay */}
        {isMobileOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleMobile}
          />
        )}
        
        {/* Mobile Drawer */}
        <aside
          className={`fixed top-0 left-0 z-50 h-full w-80 bg-surface border-r border-border transform transition-transform duration-300 ease-in-out lg:hidden ${
            isMobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          aria-label="Sidebar navigation"
        >
          <SidebarContent 
            isCollapsed={false}
            navigationItems={navigationItems}
            workoutCategories={workoutCategories}
            savedRoutines={savedRoutines}
            isActive={isActive}
            onClose={toggleMobile}
            isMobile={true}
          />
        </aside>
      </>
    );
  }

  return (
    <aside
      className={`hidden lg:flex flex-col bg-surface border-r border-border transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-80'
      }`}
      aria-label="Sidebar navigation"
    >
      <SidebarContent 
        isCollapsed={isCollapsed}
        navigationItems={navigationItems}
        workoutCategories={workoutCategories}
        savedRoutines={savedRoutines}
        isActive={isActive}
        onToggleCollapse={toggleCollapse}
      />
    </aside>
  );
};

const SidebarContent = ({ 
  isCollapsed, 
  navigationItems, 
  workoutCategories, 
  savedRoutines, 
  isActive, 
  onToggleCollapse, 
  onClose, 
  isMobile 
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <span className="text-lg font-bold text-text-primary">FitFlow</span>
          </div>
        )}
        
        {isMobile ? (
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Close sidebar"
          >
            <Icon name="X" size={20} />
          </button>
        ) : (
          <button
            onClick={onToggleCollapse}
            className="p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={20} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6" role="navigation" aria-label="Sidebar navigation">
        {/* Main Navigation */}
        <div>
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">
              Navigation
            </h3>
          )}
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={isMobile ? onClose : undefined}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  isActive(item.path)
                    ? 'bg-primary-light text-primary-600' :'text-text-secondary hover:text-text-primary hover:bg-gray-100'
                }`}
                aria-current={isActive(item.path) ? 'page' : undefined}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon name={item.icon} size={20} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </div>
        </div>

        {/* Workout Categories */}
        {!isCollapsed && (
          <div>
            <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">
              Categories
            </h3>
            <div className="space-y-1">
              {workoutCategories.map((category) => (
                <button
                  key={category.name}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={category.icon} size={16} />
                    <span>{category.name}</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-text-tertiary px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Saved Routines */}
        {!isCollapsed && (
          <div>
            <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">
              Saved Routines
            </h3>
            <div className="space-y-2">
              {savedRoutines.map((routine) => (
                <button
                  key={routine.name}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <div className="text-sm font-medium text-text-primary">{routine.name}</div>
                  <div className="text-xs text-text-tertiary">
                    {routine.exercises} exercises • {routine.duration}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Progress Tracking */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border">
          <div className="bg-primary-light rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-primary-600" />
              <span className="text-sm font-medium text-primary-600">Weekly Progress</span>
            </div>
            <div className="text-xs text-text-secondary">
              4 of 5 workouts completed
            </div>
            <div className="mt-2 bg-white rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;