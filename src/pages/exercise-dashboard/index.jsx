// src/pages/exercise-dashboard/index.jsx
import React, { useState, useEffect } from 'react';
import { exercisesData } from '../../data/exercises';

import Header from '../../components/ui/Header';
import NavigationTabs from './components/NavigationTabs';
import ExerciseCard from './components/ExerciseCard';
import SearchBar from './components/SearchBar';
import FilterDropdown from './components/FilterDropdown';
import Icon from '../../components/AppIcon';

const ExerciseDashboard = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 6;

  // Simulate API call with loading state
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setExercises(exercisesData);
        setFilteredExercises(exercisesData);
      } catch (err) {
        setError('Failed to load exercises. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  // Filter exercises based on search and category
  useEffect(() => {
    let filtered = exercises;

    if (searchQuery) {
      filtered = filtered.filter(exercise =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.primaryMuscleGroup.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(exercise => exercise.category === selectedCategory);
    }

    setFilteredExercises(filtered);
    setCurrentPage(1);
  }, [exercises, searchQuery, selectedCategory]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setExercises(exercisesData);
      setFilteredExercises(exercisesData);
      setLoading(false);
    }, 1000);
  };

  // Pagination logic
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = filteredExercises.slice(indexOfFirstExercise, indexOfLastExercise);
  const totalPages = Math.ceil(filteredExercises.length / exercisesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="bg-surface rounded-lg border border-border p-6 animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded mb-4 w-1/2"></div>
      <div className="h-8 bg-gray-200 rounded"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Exercise Dashboard</h1>
          <p className="text-text-secondary">Discover and track your fitness journey with our comprehensive exercise library.</p>
        </div>

        {/* Navigation Tabs */}
        <NavigationTabs />

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <SearchBar onSearch={handleSearch} />
          <FilterDropdown onCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-danger bg-opacity-10 border border-danger border-opacity-20 rounded-lg p-6 mb-8 text-center">
            <Icon name="AlertCircle" size={48} color="var(--color-danger)" className="mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-danger mb-2">Something went wrong</h3>
            <p className="text-text-secondary mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-hover text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Icon name="RefreshCw" size={16} color="white" />
              <span>Try Again</span>
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}

        {/* Exercise Grid */}
        {!loading && !error && (
          <>
            {filteredExercises.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Search" size={48} color="var(--color-text-tertiary)" className="mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">No exercises found</h3>
                <p className="text-text-secondary">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {currentExercises.map((exercise) => (
                    <ExerciseCard key={exercise.id} exercise={exercise} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      aria-label="Previous page"
                    >
                      <Icon name="ChevronLeft" size={20} />
                    </button>
                    
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-3 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                            currentPage === pageNumber
                              ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                          }`}
                          aria-label={`Page ${pageNumber}`}
                          aria-current={currentPage === pageNumber ? 'page' : undefined}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      aria-label="Next page"
                    >
                      <Icon name="ChevronRight" size={20} />
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default ExerciseDashboard;