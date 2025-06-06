import React from "react";
import Icon from "../../../components/AppIcon";

const ActionButtons = ({ onAddToWorkout, onStartNow }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={onStartNow}
        className="flex-1 bg-primary hover:bg-primary-hover text-white font-semibold py-4 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center space-x-2"
        aria-label="Start exercise now"
      >
        <Icon name="Play" size={20} color="white" />
        <span>Start Now</span>
      </button>
      
      <button
        onClick={onAddToWorkout}
        className="flex-1 bg-surface hover:bg-gray-50 text-text-primary font-semibold py-4 px-6 rounded-lg border border-border transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center space-x-2"
        aria-label="Add exercise to workout"
      >
        <Icon name="Plus" size={20} color="var(--color-text-primary)" />
        <span>Add to Workout</span>
      </button>
    </div>
  );
};

export default ActionButtons;