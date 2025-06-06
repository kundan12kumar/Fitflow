import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search to avoid excessive API calls
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm !== '') {
        setIsSearching(true);
        setTimeout(() => {
          onSearch(searchTerm);
          setIsSearching(false);
        }, 300);
      } else {
        onSearch('');
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, onSearch]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex-1 max-w-md">
      <label htmlFor="exercise-search" className="sr-only">
        Search exercises
      </label>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isSearching ? (
            <Icon name="Loader2" size={20} color="var(--color-text-tertiary)" className="animate-spin" />
          ) : (
            <Icon name="Search" size={20} color="var(--color-text-tertiary)" />
          )}
        </div>
        
        <input
          id="exercise-search"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search exercises, muscle groups..."
          className="block w-full pl-10 pr-10 py-3 border border-border rounded-lg bg-surface text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          aria-describedby="search-description"
        />
        
        {searchTerm && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-text-primary focus:outline-none focus:text-text-primary"
            aria-label="Clear search"
          >
            <Icon name="X" size={20} color="var(--color-text-tertiary)" />
          </button>
        )}
      </div>
      
      <div id="search-description" className="sr-only">
        Search through our exercise library by name or muscle group
      </div>
    </form>
  );
};

export default SearchBar;