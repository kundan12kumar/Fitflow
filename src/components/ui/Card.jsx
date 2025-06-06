import React from 'react';
import Icon from '../AppIcon';
import Image from '../AppImage';

const Card = ({
  variant = 'default',
  children,
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses = 'bg-surface rounded-lg border border-border transition-all duration-200';
  const interactiveClasses = onClick ? 'cursor-pointer hover:shadow-md hover:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2' : '';
  
  const variantClasses = {
    default: 'p-6',
    compact: 'p-4',
    workout: 'p-6 hover:shadow-lg',
    exercise: 'p-4',
    achievement: 'p-6 bg-gradient-to-br from-primary-light to-energy-100',
    stat: 'p-4 text-center',
    progress: 'p-6'
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${interactiveClasses} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick(e) : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

const WorkoutCard = ({
  title,
  description,
  duration,
  difficulty,
  exercises,
  image,
  tags = [],
  onStart,
  onSave,
  isSaved = false,
  className = ''
}) => {
  const difficultyColors = {
    beginner: 'bg-success text-white',
    intermediate: 'bg-warning text-white',
    advanced: 'bg-danger text-white'
  };

  return (
    <Card variant="workout" className={className}>
      {/* Image */}
      {image && (
        <div className="relative mb-4 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSave?.();
              }}
              className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={isSaved ? 'Remove from saved' : 'Save workout'}
            >
              <Icon name={isSaved ? 'Heart' : 'Heart'} size={16} className={isSaved ? 'text-danger' : 'text-text-tertiary'} />
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${difficultyColors[difficulty] || difficultyColors.beginner}`}>
            {difficulty}
          </span>
        </div>

        <p className="text-text-secondary text-sm">{description}</p>

        {/* Metadata */}
        <div className="flex items-center space-x-4 text-sm text-text-tertiary">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Dumbbell" size={14} />
            <span>{exercises} exercises</span>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-text-tertiary text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStart?.();
            }}
            className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Start Workout
          </button>
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <Icon name="MoreHorizontal" size={16} />
          </button>
        </div>
      </div>
    </Card>
  );
};

const ExerciseCard = ({
  name,
  description,
  sets,
  reps,
  duration,
  image,
  difficulty,
  muscleGroups = [],
  onSelect,
  isSelected = false,
  className = ''
}) => {
  return (
    <Card 
      variant="exercise" 
      className={`${className} ${isSelected ? 'ring-2 ring-primary border-primary' : ''}`}
      onClick={onSelect}
    >
      <div className="flex space-x-4">
        {/* Image */}
        {image && (
          <div className="flex-shrink-0">
            <Image
              src={image}
              alt={name}
              className="w-16 h-16 rounded-lg object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between">
            <h4 className="font-medium text-text-primary">{name}</h4>
            {isSelected && (
              <Icon name="Check" size={16} className="text-primary" />
            )}
          </div>

          <p className="text-sm text-text-secondary line-clamp-2">{description}</p>

          {/* Exercise Details */}
          <div className="flex items-center space-x-4 text-xs text-text-tertiary">
            {sets && <span>{sets} sets</span>}
            {reps && <span>{reps} reps</span>}
            {duration && <span>{duration}</span>}
          </div>

          {/* Muscle Groups */}
          {muscleGroups.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {muscleGroups.slice(0, 3).map((group, index) => (
                <span key={index} className="px-2 py-1 bg-primary-light text-primary-600 text-xs rounded-full">
                  {group}
                </span>
              ))}
              {muscleGroups.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-text-tertiary text-xs rounded-full">
                  +{muscleGroups.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

const StatCard = ({
  title,
  value,
  unit,
  icon,
  trend,
  trendValue,
  color = 'primary',
  className = ''
}) => {
  const colorClasses = {
    primary: 'text-primary',
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
    energy: 'text-energy'
  };

  return (
    <Card variant="stat" className={className}>
      <div className="space-y-3">
        {/* Icon */}
        {icon && (
          <div className={`inline-flex p-2 rounded-lg bg-${color}-light`}>
            <Icon name={icon} size={20} className={colorClasses[color]} />
          </div>
        )}

        {/* Value */}
        <div>
          <div className="text-2xl font-mono font-medium text-text-primary">
            {value}
            {unit && <span className="text-sm text-text-tertiary ml-1">{unit}</span>}
          </div>
          <div className="text-sm text-text-secondary">{title}</div>
        </div>

        {/* Trend */}
        {trend && (
          <div className={`flex items-center text-xs ${trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-text-tertiary'}`}>
            <Icon name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} size={12} className="mr-1" />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

const AchievementCard = ({
  title,
  description,
  icon,
  progress,
  maxProgress,
  isCompleted = false,
  reward,
  className = ''
}) => {
  const progressPercentage = maxProgress ? (progress / maxProgress) * 100 : 0;

  return (
    <Card variant="achievement" className={className}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start space-x-3">
          <div className={`p-3 rounded-full ${isCompleted ? 'bg-success' : 'bg-white'}`}>
            <Icon 
              name={icon || 'Trophy'} 
              size={24} 
              className={isCompleted ? 'text-white' : 'text-primary-600'} 
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-text-primary">{title}</h3>
            <p className="text-sm text-text-secondary">{description}</p>
          </div>
          {isCompleted && (
            <Icon name="Check" size={20} className="text-success" />
          )}
        </div>

        {/* Progress */}
        {maxProgress && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Progress</span>
              <span className="font-medium text-text-primary">{progress}/{maxProgress}</span>
            </div>
            <div className="w-full bg-white rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Reward */}
        {reward && (
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Gift" size={14} className="text-energy" />
            <span className="text-text-secondary">Reward: {reward}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

Card.Workout = WorkoutCard;
Card.Exercise = ExerciseCard;
Card.Stat = StatCard;
Card.Achievement = AchievementCard;

export default Card;