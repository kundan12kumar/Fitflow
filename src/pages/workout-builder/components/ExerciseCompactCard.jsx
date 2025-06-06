import React from 'react';
import Icon from '../../../components/AppIcon';

const ExerciseCompactCard = ({ exercise, onAdd }) => {
  const getMuscleGroupColor = (muscleGroup) => {
    const colors = {
      'Chest': 'bg-red-100 text-red-700',
      'Back': 'bg-blue-100 text-blue-700',
      'Legs': 'bg-green-100 text-green-700',
      'Shoulders': 'bg-yellow-100 text-yellow-700',
      'Arms': 'bg-purple-100 text-purple-700',
      'Core': 'bg-orange-100 text-orange-700'
    };
    return colors[muscleGroup] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-background border border-border rounded-lg p-3 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="flex-shrink-0">
            <Icon name="GripVertical" size={16} color="var(--color-text-tertiary)" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-text-primary text-sm truncate">
              {exercise.name}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getMuscleGroupColor(exercise.muscleGroup)}`}>
                {exercise.muscleGroup}
              </span>
              <span className="text-xs text-text-tertiary">
                {exercise.equipment}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onAdd(exercise)}
          className="flex-shrink-0 bg-primary hover:bg-primary-hover text-white p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label={`Add ${exercise.name} to workout`}
        >
          <Icon name="Plus" size={16} color="white" />
        </button>
      </div>
    </div>
  );
};

export default ExerciseCompactCard;