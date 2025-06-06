import React from "react";
import Icon from "../../../components/AppIcon";

const ProgressIndicator = ({ currentExercise, totalExercises, exerciseName }) => {
  const progressPercentage = (currentExercise / totalExercises) * 100;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} color="var(--color-primary)" />
          <span className="text-sm font-medium text-text-secondary">
            Exercise {currentExercise} of {totalExercises}
          </span>
        </div>
        <span className="text-sm font-medium text-text-secondary">
          {Math.round(progressPercentage)}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
        <div 
          className="bg-primary h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <p className="text-center text-lg font-semibold text-text-primary">{exerciseName}</p>
    </div>
  );
};

export default ProgressIndicator;