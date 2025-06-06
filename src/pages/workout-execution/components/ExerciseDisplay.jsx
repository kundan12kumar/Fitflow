import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const ExerciseDisplay = ({ exercise }) => {
  return (
    <div className="bg-surface rounded-xl p-6 border border-border mb-6">
      {/* Exercise Image */}
      <div className="w-full h-64 rounded-lg overflow-hidden mb-6 bg-gray-100">
        <Image 
          src={exercise.image} 
          alt={exercise.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Exercise Info */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">{exercise.name}</h2>
        
        <div className="flex items-center justify-center space-x-4 text-sm text-text-secondary mb-4">
          <div className="flex items-center space-x-1">
            <Icon name="Target" size={16} />
            <span>{exercise.targetMuscles.join(", ")}</span>
          </div>
          
          {exercise.type === "timed" ? (
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={16} />
              <span>{exercise.duration}s</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <Icon name="RotateCcw" size={16} />
              <span>{exercise.reps} reps × {exercise.sets} sets</span>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-primary-50 rounded-lg p-4">
        <h3 className="font-semibold text-text-primary mb-2 flex items-center">
          <Icon name="Info" size={18} className="mr-2" />
          Instructions
        </h3>
        <p className="text-text-secondary leading-relaxed">{exercise.instructions}</p>
      </div>
    </div>
  );
};

export default ExerciseDisplay;