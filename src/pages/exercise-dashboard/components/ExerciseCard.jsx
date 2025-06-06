// src/pages/exercise-dashboard/components/ExerciseCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ExerciseCard = ({ exercise }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'text-success bg-green-50';
      case 'intermediate':
        return 'text-warning bg-yellow-50';
      case 'advanced':
        return 'text-danger bg-red-50';
      default:
        return 'text-text-secondary bg-gray-50';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'strength':
        return 'Dumbbell';
      case 'cardio':
        return 'Heart';
      case 'flexibility':
        return 'Zap';
      default:
        return 'Activity';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border hover:border-primary hover:border-opacity-50 transition-all duration-200 hover:shadow-lg group focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
      {/* Exercise Image */}
      <div className="relative overflow-hidden rounded-t-lg h-48">
        <Image
          src={exercise.image}
          alt={exercise.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
            {exercise.difficulty}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors">
            {exercise.name}
          </h3>
          <Icon 
            name={getCategoryIcon(exercise.category)} 
            size={20} 
            color="var(--color-text-tertiary)" 
          />
        </div>

        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Target" size={16} color="var(--color-text-secondary)" />
          <span className="text-sm text-text-secondary">{exercise.primaryMuscleGroup}</span>
        </div>

        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {exercise.description}
        </p>

        {/* Action Button */}
        <Link
          to={`/exercise-detail/${exercise.id}`}
          className="inline-flex items-center justify-center w-full space-x-2 bg-primary hover:bg-primary-hover text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label={`View details for ${exercise.name}`}
        >
          <span>View Details</span>
          <Icon name="ArrowRight" size={16} color="white" />
        </Link>
      </div>
    </div>
  );
};

export default ExerciseCard;