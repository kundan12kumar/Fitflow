import React from 'react';
import Icon from '../../../components/AppIcon';

const WorkoutSequenceBuilder = ({
  exercises,
  onRemove,
  onUpdate,
  onMove,
  onDragStart,
  onDragEnter,
  onDragEnd
}) => {
  const moveUp = (index) => {
    if (index > 0) {
      onMove(index, index - 1);
    }
  };

  const moveDown = (index) => {
    if (index < exercises.length - 1) {
      onMove(index, index + 1);
    }
  };

  return (
    <div className="space-y-3">
      {exercises.map((exercise, index) => (
        <div
          key={exercise.id}
          draggable
          onDragStart={() => onDragStart(index)}
          onDragEnter={() => onDragEnter(index)}
          onDragEnd={onDragEnd}
          onDragOver={(e) => e.preventDefault()}
          className="bg-background border border-border rounded-lg p-4 cursor-move hover:shadow-sm transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="flex flex-col space-y-1">
                <button
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className="p-1 text-text-tertiary hover:text-text-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Move exercise up"
                >
                  <Icon name="ChevronUp" size={14} />
                </button>
                <button
                  onClick={() => moveDown(index)}
                  disabled={index === exercises.length - 1}
                  className="p-1 text-text-tertiary hover:text-text-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Move exercise down"
                >
                  <Icon name="ChevronDown" size={14} />
                </button>
              </div>
              
              <div className="flex-shrink-0">
                <Icon name="GripVertical" size={16} color="var(--color-text-tertiary)" />
              </div>
              
              <div>
                <h3 className="font-medium text-text-primary">{exercise.name}</h3>
                <p className="text-sm text-text-secondary">{exercise.muscleGroup} • {exercise.equipment}</p>
              </div>
            </div>

            <button
              onClick={() => onRemove(exercise.id)}
              className="text-text-tertiary hover:text-danger transition-colors p-1"
              aria-label={`Remove ${exercise.name} from workout`}
            >
              <Icon name="X" size={16} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Sets
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={exercise.sets}
                onChange={(e) => onUpdate(exercise.id, 'sets', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Reps
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={exercise.reps}
                onChange={(e) => onUpdate(exercise.id, 'reps', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Rest (sec)
              </label>
              <input
                type="number"
                min="0"
                max="300"
                step="15"
                value={exercise.restTime}
                onChange={(e) => onUpdate(exercise.id, 'restTime', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkoutSequenceBuilder;