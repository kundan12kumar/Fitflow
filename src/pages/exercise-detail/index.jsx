// src/pages/exercise-detail/index.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExerciseById } from "../../data/exercises";
import Icon from "../../components/AppIcon";

import BackButton from "./components/BackButton";
import MediaPlayer from "./components/MediaPlayer";
import ExerciseMetadata from "./components/ExerciseMetadata";
import ActionButtons from "./components/ActionButtons";
import TabSystem from "./components/TabSystem";

const ExerciseDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("instructions");
  const [exerciseData, setExerciseData] = useState(null);

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        const exercise = getExerciseById(id);
        if (!exercise) {
          setError(true);
          return;
        }
        
        setExerciseData(exercise);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchExerciseData();
    } else {
      setError(true);
      setIsLoading(false);
    }
  }, [id]);

  const handleRetry = () => {
    setError(false);
    setIsLoading(true);
    const exercise = getExerciseById(id);
    setTimeout(() => {
      if (exercise) {
        setExerciseData(exercise);
        setError(false);
      } else {
        setError(true);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleAddToWorkout = () => {
    navigate("/workout-builder");
  };

  const handleStartNow = () => {
    navigate("/workout-execution");
  };

  if (error || !exerciseData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-danger bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="AlertCircle" size={32} color="var(--color-danger)" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            {!exerciseData ? "Exercise Not Found" : "Failed to Load Exercise"}
          </h2>
          <p className="text-text-secondary mb-6">
            {!exerciseData 
              ? "The exercise you're looking for doesn't exist or has been removed." 
              : "We couldn't load the exercise details. Please try again."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/exercise-dashboard')}
              className="bg-primary hover:bg-primary-hover text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Back to Dashboard
            </button>
            {exerciseData === null && (
              <button
                onClick={handleRetry}
                className="bg-gray-200 hover:bg-gray-300 text-text-primary font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Skeleton Header */}
        <div className="bg-surface border-b border-border">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Skeleton Media */}
          <div className="w-full h-96 bg-gray-200 rounded-lg animate-pulse mb-8"></div>

          {/* Skeleton Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-surface p-4 rounded-lg border border-border">
                <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Skeleton Content */}
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <BackButton />
            <h1 className="text-2xl font-bold text-text-primary">{exerciseData.name}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Media Player */}
        <div className="mb-8">
          <MediaPlayer 
            image={exerciseData.image}
            video={exerciseData.video}
            exerciseName={exerciseData.name}
          />
        </div>

        {/* Exercise Metadata */}
        <div className="mb-8">
          <ExerciseMetadata 
            difficulty={exerciseData.difficulty}
            primaryMuscles={exerciseData.primaryMuscles}
            secondaryMuscles={exerciseData.secondaryMuscles}
            equipment={exerciseData.equipment}
            caloriesBurned={exerciseData.caloriesBurned}
            duration={exerciseData.duration}
          />
        </div>

        {/* Action Buttons */}
        <div className="mb-8">
          <ActionButtons 
            onAddToWorkout={handleAddToWorkout}
            onStartNow={handleStartNow}
          />
        </div>

        {/* Tab System */}
        <TabSystem 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          instructions={exerciseData.instructions}
          tips={exerciseData.tips}
        />
      </div>
    </div>
  );
};

export default ExerciseDetail;