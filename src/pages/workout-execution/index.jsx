import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Image from "../../components/AppImage";
import ExerciseDisplay from "./components/ExerciseDisplay";
import Timer from "./components/Timer";
import ProgressIndicator from "./components/ProgressIndicator";
import ControlButtons from "./components/ControlButtons";
import WorkoutSummary from "./components/WorkoutSummary";

const WorkoutExecution = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isWorkoutPaused, setIsWorkoutPaused] = useState(false);
  const [isWorkoutCompleted, setIsWorkoutCompleted] = useState(false);
  const [workoutStartTime, setWorkoutStartTime] = useState(null);
  const [workoutEndTime, setWorkoutEndTime] = useState(null);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [restTimeRemaining, setRestTimeRemaining] = useState(0);
  const [exerciseTimeRemaining, setExerciseTimeRemaining] = useState(0);
  const [currentReps, setCurrentReps] = useState(0);

  // Mock workout data
  const workoutData = {
    id: 1,
    name: "Full Body Strength Training",
    estimatedDuration: 45,
    difficulty: "Intermediate",
    exercises: [
      {
        id: 1,
        name: "Push-ups",
        type: "strength",
        duration: null,
        reps: 15,
        sets: 3,
        restTime: 60,
        instructions: `Start in a plank position with hands slightly wider than shoulders. Lower your body until chest nearly touches the floor, then push back up to starting position. Keep your core engaged and maintain a straight line from head to heels throughout the movement.`,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
        targetMuscles: ["Chest", "Shoulders", "Triceps"],
        caloriesPerRep: 0.5
      },
      {
        id: 2,
        name: "Plank Hold",
        type: "timed",
        duration: 60,
        reps: null,
        sets: 1,
        restTime: 45,
        instructions: `Start in a push-up position but rest on your forearms instead of hands. Keep your body in a straight line from head to heels. Engage your core and avoid letting your hips sag or pike up. Breathe steadily throughout the hold.`,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
        targetMuscles: ["Core", "Shoulders"],
        caloriesPerMinute: 3
      },
      {
        id: 3,
        name: "Squats",
        type: "strength",
        duration: null,
        reps: 20,
        sets: 3,
        restTime: 60,
        instructions: `Stand with feet shoulder-width apart, toes slightly turned out. Lower your body by bending at hips and knees as if sitting back into a chair. Keep chest up and knees tracking over toes. Lower until thighs are parallel to floor, then drive through heels to return to start.`,
        image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop",
        targetMuscles: ["Quadriceps", "Glutes", "Hamstrings"],
        caloriesPerRep: 0.7
      },
      {
        id: 4,
        name: "Mountain Climbers",
        type: "timed",
        duration: 45,
        reps: null,
        sets: 1,
        restTime: 60,
        instructions: `Start in a plank position with hands directly under shoulders. Quickly alternate bringing knees toward chest while maintaining plank position. Keep hips level and core engaged. Move at a controlled but rapid pace, as if running in place horizontally.`,
        image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&h=300&fit=crop",
        targetMuscles: ["Core", "Shoulders", "Legs"],
        caloriesPerMinute: 8
      },
      {
        id: 5,
        name: "Lunges",
        type: "strength",
        duration: null,
        reps: 12,
        sets: 2,
        restTime: 45,
        instructions: `Stand tall with feet hip-width apart. Step forward with one leg, lowering hips until both knees are bent at 90 degrees. Front knee should be directly above ankle, back knee hovering just above floor. Push through front heel to return to start. Alternate legs.`,
        image: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&h=300&fit=crop",
        targetMuscles: ["Quadriceps", "Glutes", "Hamstrings"],
        caloriesPerRep: 0.6
      }
    ]
  };

  const currentExercise = workoutData.exercises[currentExerciseIndex];
  const nextExercise = workoutData.exercises[currentExerciseIndex + 1];
  const totalExercises = workoutData.exercises.length;

  // Initialize workout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setWorkoutStartTime(new Date());
      if (currentExercise.type === "timed") {
        setExerciseTimeRemaining(currentExercise.duration);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Timer logic for timed exercises
  useEffect(() => {
    let interval;
    if (!isWorkoutPaused && !isResting && currentExercise.type === "timed" && exerciseTimeRemaining > 0) {
      interval = setInterval(() => {
        setExerciseTimeRemaining(prev => {
          if (prev <= 1) {
            handleExerciseComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWorkoutPaused, isResting, exerciseTimeRemaining, currentExercise.type]);

  // Rest timer logic
  useEffect(() => {
    let interval;
    if (isResting && restTimeRemaining > 0) {
      interval = setInterval(() => {
        setRestTimeRemaining(prev => {
          if (prev <= 1) {
            setIsResting(false);
            handleNextExercise();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResting, restTimeRemaining]);

  const handleExerciseComplete = () => {
    if (currentExerciseIndex === totalExercises - 1) {
      setIsWorkoutCompleted(true);
      setWorkoutEndTime(new Date());
    } else {
      setIsResting(true);
      setRestTimeRemaining(currentExercise.restTime);
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setCurrentReps(0);
      const nextEx = workoutData.exercises[currentExerciseIndex + 1];
      if (nextEx.type === "timed") {
        setExerciseTimeRemaining(nextEx.duration);
      }
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
      setCurrentReps(0);
      setIsResting(false);
      const prevEx = workoutData.exercises[currentExerciseIndex - 1];
      if (prevEx.type === "timed") {
        setExerciseTimeRemaining(prevEx.duration);
      }
    }
  };

  const handlePauseResume = () => {
    setIsWorkoutPaused(prev => !prev);
  };

  const handleSkipExercise = () => {
    handleExerciseComplete();
  };

  const handleExitWorkout = () => {
    setShowExitConfirmation(true);
  };

  const confirmExit = () => {
    navigate("/exercise-dashboard");
  };

  const calculateWorkoutStats = () => {
    const duration = workoutEndTime && workoutStartTime 
      ? Math.round((workoutEndTime - workoutStartTime) / 1000 / 60) 
      : 0;
    
    let totalCalories = 0;
    workoutData.exercises.forEach(exercise => {
      if (exercise.type === "timed") {
        totalCalories += (exercise.duration / 60) * exercise.caloriesPerMinute;
      } else {
        totalCalories += exercise.reps * exercise.sets * exercise.caloriesPerRep;
      }
    });

    return {
      duration,
      exercisesCompleted: totalExercises,
      totalCalories: Math.round(totalCalories)
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">Loading Workout</h2>
          <p className="text-text-secondary">Preparing your {workoutData.name}...</p>
        </div>
      </div>
    );
  }

  if (isWorkoutCompleted) {
    return <WorkoutSummary stats={calculateWorkoutStats()} workoutName={workoutData.name} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border px-4 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={handleExitWorkout}
            className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <Icon name="X" size={24} />
            <span className="font-medium">Exit</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-lg font-semibold text-text-primary">{workoutData.name}</h1>
            <p className="text-sm text-text-secondary">
              {isWorkoutPaused ? "Paused" : isResting ? "Rest Time" : "In Progress"}
            </p>
          </div>

          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="Clock" size={20} />
            <span className="text-sm font-medium">
              {workoutStartTime ? Math.round((new Date() - workoutStartTime) / 1000 / 60) : 0}m
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Progress Indicator */}
        <ProgressIndicator 
          currentExercise={currentExerciseIndex + 1}
          totalExercises={totalExercises}
          exerciseName={currentExercise.name}
        />

        {/* Rest Screen */}
        {isResting && (
          <div className="text-center py-12">
            <div className="bg-energy-50 rounded-2xl p-8 mb-6">
              <Icon name="Coffee" size={48} color="var(--color-energy)" className="mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-text-primary mb-2">Rest Time</h2>
              <p className="text-text-secondary mb-6">Take a breather before the next exercise</p>
              
              <div className="text-6xl font-bold text-energy mb-4">
                {Math.floor(restTimeRemaining / 60)}:{(restTimeRemaining % 60).toString().padStart(2, '0')}
              </div>
              
              <p className="text-text-secondary">
                Next up: <span className="font-semibold text-text-primary">{nextExercise?.name}</span>
              </p>
            </div>
            
            <button
              onClick={() => {
                setIsResting(false);
                handleNextExercise();
              }}
              className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Skip Rest
            </button>
          </div>
        )}

        {/* Exercise Display */}
        {!isResting && (
          <>
            <ExerciseDisplay exercise={currentExercise} />
            
            {/* Timer/Counter */}
            <Timer 
              exercise={currentExercise}
              timeRemaining={exerciseTimeRemaining}
              currentReps={currentReps}
              onRepsChange={setCurrentReps}
              isPaused={isWorkoutPaused}
            />

            {/* Next Exercise Preview */}
            {nextExercise && (
              <div className="bg-surface rounded-xl p-4 border border-border mb-6">
                <h3 className="text-sm font-medium text-text-secondary mb-2">Next Exercise</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                    <Image 
                      src={nextExercise.image} 
                      alt={nextExercise.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">{nextExercise.name}</p>
                    <p className="text-sm text-text-secondary">
                      {nextExercise.type === "timed" 
                        ? `${nextExercise.duration}s` 
                        : `${nextExercise.reps} reps × ${nextExercise.sets} sets`
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Control Buttons */}
            <ControlButtons 
              onPrevious={handlePreviousExercise}
              onPauseResume={handlePauseResume}
              onNext={currentExercise.type === "strength" ? handleExerciseComplete : handleSkipExercise}
              onSkip={handleSkipExercise}
              isPaused={isWorkoutPaused}
              canGoPrevious={currentExerciseIndex > 0}
              canGoNext={true}
              exerciseType={currentExercise.type}
              currentReps={currentReps}
              targetReps={currentExercise.reps}
            />
          </>
        )}
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl p-6 max-w-sm w-full">
            <div className="text-center">
              <Icon name="AlertTriangle" size={48} color="var(--color-warning)" className="mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">Exit Workout?</h3>
              <p className="text-text-secondary mb-6">
                Your progress will be lost if you exit now. Are you sure you want to leave?
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowExitConfirmation(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-text-primary py-3 rounded-lg font-medium transition-colors"
                >
                  Continue Workout
                </button>
                <button
                  onClick={confirmExit}
                  className="flex-1 bg-danger hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutExecution;