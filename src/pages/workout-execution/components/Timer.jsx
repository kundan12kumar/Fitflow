import React from "react";
import Icon from "../../../components/AppIcon";

const Timer = ({ exercise, timeRemaining, currentReps, onRepsChange, isPaused }) => {
  if (exercise.type === "timed") {
    return (
      <div className="text-center mb-8">
        <div className="bg-surface rounded-xl p-8 border border-border">
          <div className="mb-4">
            <Icon name="Timer" size={32} color="var(--color-primary)" className="mx-auto mb-2" />
            <p className="text-text-secondary font-medium">Time Remaining</p>
          </div>
          
          <div className={`text-6xl font-bold mb-4 ${isPaused ? 'text-warning' : 'text-primary'}`}>
            {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
          </div>
          
          {isPaused && (
            <div className="flex items-center justify-center text-warning">
              <Icon name="Pause" size={20} className="mr-2" />
              <span className="font-medium">Paused</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center mb-8">
      <div className="bg-surface rounded-xl p-8 border border-border">
        <div className="mb-4">
          <Icon name="RotateCcw" size={32} color="var(--color-primary)" className="mx-auto mb-2" />
          <p className="text-text-secondary font-medium">Repetitions</p>
        </div>
        
        <div className="flex items-center justify-center space-x-6 mb-6">
          <button
            onClick={() => onRepsChange(Math.max(0, currentReps - 1))}
            className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            disabled={currentReps <= 0}
          >
            <Icon name="Minus" size={20} />
          </button>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-1">{currentReps}</div>
            <div className="text-sm text-text-secondary">of {exercise.reps}</div>
          </div>
          
          <button
            onClick={() => onRepsChange(currentReps + 1)}
            className="w-12 h-12 bg-primary hover:bg-primary-hover text-white rounded-full flex items-center justify-center transition-colors"
          >
            <Icon name="Plus" size={20} />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((currentReps / exercise.reps) * 100, 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-text-secondary">
          {Math.round((currentReps / exercise.reps) * 100)}% Complete
        </p>
      </div>
    </div>
  );
};

export default Timer;