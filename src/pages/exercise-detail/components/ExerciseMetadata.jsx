import React from "react";
import Icon from "../../../components/AppIcon";

const ExerciseMetadata = ({ 
  difficulty, 
  primaryMuscles, 
  secondaryMuscles, 
  equipment, 
  caloriesBurned, 
  duration 
}) => {
  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "text-success bg-success bg-opacity-10";
      case "intermediate":
        return "text-warning bg-warning bg-opacity-10";
      case "advanced":
        return "text-danger bg-danger bg-opacity-10";
      default:
        return "text-text-secondary bg-gray-100";
    }
  };

  const metadataItems = [
    {
      icon: "Target",
      label: "Difficulty",
      value: difficulty,
      className: getDifficultyColor(difficulty)
    },
    {
      icon: "Zap",
      label: "Primary Muscles",
      value: primaryMuscles.join(", "),
      className: "text-primary bg-primary bg-opacity-10"
    },
    {
      icon: "Dumbbell",
      label: "Equipment",
      value: equipment,
      className: "text-info bg-info bg-opacity-10"
    },
    {
      icon: "Flame",
      label: "Calories",
      value: `${caloriesBurned} cal`,
      className: "text-energy bg-energy bg-opacity-10"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metadataItems.map((item, index) => (
        <div
          key={index}
          className="bg-surface p-4 rounded-lg border border-border hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className={`p-2 rounded-lg ${item.className}`}>
              <Icon name={item.icon} size={16} />
            </div>
            <span className="text-sm font-medium text-text-secondary">{item.label}</span>
          </div>
          <p className="text-lg font-semibold text-text-primary">{item.value}</p>
        </div>
      ))}
      
      {/* Secondary Muscles - Full Width */}
      <div className="sm:col-span-2 lg:col-span-4 bg-surface p-4 rounded-lg border border-border">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 rounded-lg text-text-secondary bg-gray-100">
            <Icon name="Users" size={16} />
          </div>
          <span className="text-sm font-medium text-text-secondary">Secondary Muscles</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {secondaryMuscles.map((muscle, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-light text-primary text-sm font-medium rounded-full"
            >
              {muscle}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExerciseMetadata;