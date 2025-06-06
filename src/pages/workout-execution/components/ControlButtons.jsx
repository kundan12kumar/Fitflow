import React from "react";
import Icon from "../../../components/AppIcon";

const ControlButtons = ({ 
  onPrevious, 
  onPauseResume, 
  onNext, 
  onSkip,
  isPaused, 
  canGoPrevious, 
  canGoNext,
  exerciseType,
  currentReps,
  targetReps
}) => {
  const canCompleteStrengthExercise = exerciseType === "strength" && currentReps >= targetReps;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center space-x-4">
          {/* Previous Button */}
          <button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              canGoPrevious 
                ? 'bg-gray-100 hover:bg-gray-200 text-text-primary' :'bg-gray-50 text-text-tertiary cursor-not-allowed'
            }`}
          >
            <Icon name="ChevronLeft" size={24} />
          </button>

          {/* Pause/Resume Button */}
          <button
            onClick={onPauseResume}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
              isPaused 
                ? 'bg-success hover:bg-green-600 text-white' :'bg-warning hover:bg-amber-600 text-white'
            }`}
          >
            <Icon name={isPaused ? "Play" : "Pause"} size={28} />
          </button>

          {/* Next/Complete Button */}
          <button
            onClick={onNext}
            disabled={exerciseType === "strength" && !canCompleteStrengthExercise}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              (exerciseType === "timed" || canCompleteStrengthExercise)
                ? 'bg-primary hover:bg-primary-hover text-white' :'bg-gray-50 text-text-tertiary cursor-not-allowed'
            }`}
          >
            <Icon name="ChevronRight" size={24} />
          </button>
        </div>

        {/* Action Labels */}
        <div className="flex items-center justify-center space-x-4 mt-3">
          <span className={`text-xs ${canGoPrevious ? 'text-text-secondary' : 'text-text-tertiary'}`}>
            Previous
          </span>
          <span className="text-xs text-text-secondary px-4">
            {isPaused ? 'Resume' : 'Pause'}
          </span>
          <span className={`text-xs ${
            (exerciseType === "timed" || canCompleteStrengthExercise) 
              ? 'text-text-secondary' :'text-text-tertiary'
          }`}>
            {exerciseType === "strength" ? 'Complete' : 'Next'}
          </span>
        </div>

        {/* Skip Button for Timed Exercises */}
        {exerciseType === "timed" && (
          <div className="text-center mt-4">
            <button
              onClick={onSkip}
              className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
            >
              Skip Exercise
            </button>
          </div>
        )}

        {/* Completion Hint for Strength Exercises */}
        {exerciseType === "strength" && !canCompleteStrengthExercise && (
          <div className="text-center mt-4">
            <p className="text-xs text-text-tertiary">
              Complete {targetReps - currentReps} more reps to continue
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlButtons;