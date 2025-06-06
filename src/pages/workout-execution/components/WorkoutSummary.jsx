import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const WorkoutSummary = ({ stats, workoutName }) => {
  const handleSaveResults = () => {
    // Mock save functionality
    console.log("Workout results saved:", stats);
    // In a real app, this would send data to the backend
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl p-8 max-w-md w-full border border-border">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-success bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={48} color="var(--color-success)" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Workout Complete!</h1>
          <p className="text-text-secondary">Great job finishing your {workoutName}</p>
        </div>

        {/* Stats Cards */}
        <div className="space-y-4 mb-8">
          <div className="bg-primary-50 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary bg-opacity-20 rounded-lg flex items-center justify-center">
                <Icon name="Clock" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Duration</p>
                <p className="font-semibold text-text-primary">{stats.duration} minutes</p>
              </div>
            </div>
          </div>

          <div className="bg-energy-50 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-energy bg-opacity-20 rounded-lg flex items-center justify-center">
                <Icon name="Flame" size={20} color="var(--color-energy)" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Calories Burned</p>
                <p className="font-semibold text-text-primary">{stats.totalCalories} kcal</p>
              </div>
            </div>
          </div>

          <div className="bg-success bg-opacity-10 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success bg-opacity-20 rounded-lg flex items-center justify-center">
                <Icon name="Activity" size={20} color="var(--color-success)" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Exercises Completed</p>
                <p className="font-semibold text-text-primary">{stats.exercisesCompleted}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleSaveResults}
            className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <Icon name="Save" size={20} />
            <span>Save Results</span>
          </button>

          <Link
            to="/exercise-dashboard"
            className="w-full bg-gray-100 hover:bg-gray-200 text-text-primary py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <Icon name="Home" size={20} />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Motivational Message */}
        <div className="text-center mt-6 p-4 bg-primary-50 rounded-lg">
          <p className="text-sm text-text-secondary">
            "The only bad workout is the one that didn't happen. Keep up the great work!"
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkoutSummary;