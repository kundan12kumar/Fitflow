import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const FilterDropdown = ({ onCategoryChange, selectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categories = [
    { value: 'all', label: 'All Categories', icon: 'Grid3X3' },
    { value: 'strength', label: 'Strength', icon: 'Dumbbell' },
    { value: 'cardio', label: 'Cardio', icon: 'Heart' },
    { value: 'flexibility', label: 'Flexibility', icon: 'Zap' }
  ];

  const selectedCategoryData = categories.find(cat => cat.value === selectedCategory) || categories[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleCategorySelect = (categoryValue) => {
    onCategoryChange(categoryValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label htmlFor="category-filter" className="sr-only">
        Filter by category
      </label>
      
      <button
        id="category-filter"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="inline-flex items-center justify-between w-48 px-4 py-3 bg-surface border border-border rounded-lg text-text-primary hover:border-primary hover:border-opacity-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="category-filter-label"
      >
        <div className="flex items-center space-x-2">
          <Icon name={selectedCategoryData.icon} size={16} color="var(--color-text-secondary)" />
          <span className="text-sm font-medium">{selectedCategoryData.label}</span>
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          color="var(--color-text-tertiary)" 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg z-50">
          <div
            role="listbox"
            aria-labelledby="category-filter-label"
            className="py-1"
          >
            {categories.map((category) => (
              <button
                key={category.value}
                type="button"
                role="option"
                aria-selected={selectedCategory === category.value}
                onClick={() => handleCategorySelect(category.value)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left text-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-primary-light text-primary-600' :'text-text-primary'
                }`}
              >
                <Icon 
                  name={category.icon} 
                  size={16} 
                  color={selectedCategory === category.value ? 'var(--color-primary)' : 'var(--color-text-secondary)'} 
                />
                <span className="font-medium">{category.label}</span>
                {selectedCategory === category.value && (
                  <Icon name="Check" size={16} color="var(--color-primary)" className="ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div id="category-filter-label" className="sr-only">
        Category filter
      </div>
    </div>
  );
};

export default FilterDropdown;