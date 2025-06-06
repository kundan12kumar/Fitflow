import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/exercise-dashboard");
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-2"
      aria-label="Go back to exercise dashboard"
    >
      <Icon name="ArrowLeft" size={20} />
      <span className="hidden sm:inline font-medium">Back</span>
    </button>
  );
};

export default BackButton;