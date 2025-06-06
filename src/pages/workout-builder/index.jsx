import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import SearchFilter from './components/SearchFilter';
import ExerciseCompactCard from './components/ExerciseCompactCard';
import WorkoutSequenceBuilder from './components/WorkoutSequenceBuilder';
import InputField from './components/InputField';
import ActionButton from './components/ActionButton';

const WorkoutBuilder = () => {
  const navigate = useNavigate();
  const [workoutName, setWorkoutName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [errors, setErrors] = useState({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  // Mock exercise data
  const exercises = [
    {
      id: 1,
      name: "Push-ups",
      muscleGroup: "Chest",
      equipment: "Bodyweight",
      description: "Classic bodyweight exercise for chest, shoulders, and triceps"
    },
    {
      id: 2,
      name: "Squats",
      muscleGroup: "Legs",
      equipment: "Bodyweight",
      description: "Fundamental lower body exercise targeting quads and glutes"
    },
    {
      id: 3,
      name: "Bench Press",
      muscleGroup: "Chest",
      equipment: "Barbell",
      description: "Primary chest exercise using barbell for strength building"
    },
    {
      id: 4,
      name: "Deadlifts",
      muscleGroup: "Back",
      equipment: "Barbell",
      description: "Compound movement targeting posterior chain muscles"
    },
    {
      id: 5,
      name: "Pull-ups",
      muscleGroup: "Back",
      equipment: "Pull-up Bar",
      description: "Upper body pulling exercise for back and biceps"
    },
    {
      id: 6,
      name: "Shoulder Press",
      muscleGroup: "Shoulders",
      equipment: "Dumbbells",
      description: "Overhead pressing movement for shoulder development"
    },
    {
      id: 7,
      name: "Lunges",
      muscleGroup: "Legs",
      equipment: "Bodyweight",
      description: "Unilateral leg exercise for balance and strength"
    },
    {
      id: 8,
      name: "Bicep Curls",
      muscleGroup: "Arms",
      equipment: "Dumbbells",
      description: "Isolation exercise for bicep muscle development"
    },
    {
      id: 9,
      name: "Tricep Dips",
      muscleGroup: "Arms",
      equipment: "Bodyweight",
      description: "Bodyweight exercise targeting tricep muscles"
    },
    {
      id: 10,
      name: "Plank",
      muscleGroup: "Core",
      equipment: "Bodyweight",
      description: "Isometric core exercise for stability and strength"
    }
  ];

  const muscleGroups = ["All", "Chest", "Back", "Legs", "Shoulders", "Arms", "Core"];
  const equipmentTypes = ["All", "Bodyweight", "Barbell", "Dumbbells", "Pull-up Bar", "Machine"];

  // Filter exercises based on search criteria
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMuscleGroup = selectedMuscleGroup === '' || selectedMuscleGroup === 'All' || exercise.muscleGroup === selectedMuscleGroup;
    const matchesEquipment = selectedEquipment === '' || selectedEquipment === 'All' || exercise.equipment === selectedEquipment;
    
    return matchesSearch && matchesMuscleGroup && matchesEquipment;
  });

  const addExercise = (exercise) => {
    const newExercise = {
      ...exercise,
      id: `${exercise.id}-${Date.now()}`,
      sets: 3,
      reps: 10,
      restTime: 60
    };
    setSelectedExercises([...selectedExercises, newExercise]);
  };

  const removeExercise = (exerciseId) => {
    setSelectedExercises(selectedExercises.filter(ex => ex.id !== exerciseId));
  };

  const updateExercise = (exerciseId, field, value) => {
    setSelectedExercises(selectedExercises.map(ex => 
      ex.id === exerciseId ? { ...ex, [field]: parseInt(value) || 0 } : ex
    ));
  };

  const moveExercise = (fromIndex, toIndex) => {
    const updatedExercises = [...selectedExercises];
    const [movedExercise] = updatedExercises.splice(fromIndex, 1);
    updatedExercises.splice(toIndex, 0, movedExercise);
    setSelectedExercises(updatedExercises);
  };

  const handleDragStart = (index) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      moveExercise(dragItem.current, dragOverItem.current);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const validateWorkout = () => {
    const newErrors = {};
    
    if (!workoutName.trim()) {
      newErrors.workoutName = 'Workout name is required';
    } else if (workoutName.trim().length < 3) {
      newErrors.workoutName = 'Workout name must be at least 3 characters';
    } else if (workoutName.trim().length > 30) {
      newErrors.workoutName = 'Workout name must be 30 characters or less';
    }

    if (selectedExercises.length === 0) {
      newErrors.exercises = 'At least one exercise is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveWorkout = () => {
    if (validateWorkout()) {
      // Mock save action
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
        navigate('/exercise-dashboard');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                to="/exercise-dashboard"
                className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors"
              >
                <Icon name="ArrowLeft" size={20} />
                <span className="font-medium">Back to Dashboard</span>
              </Link>
            </div>
            <h1 className="text-xl font-semibold text-text-primary">Workout Builder</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Left Pane - Exercise Library */}
          <div className="bg-surface rounded-lg border border-border overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Exercise Library</h2>
              <SearchFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedMuscleGroup={selectedMuscleGroup}
                onMuscleGroupChange={setSelectedMuscleGroup}
                selectedEquipment={selectedEquipment}
                onEquipmentChange={setSelectedEquipment}
                muscleGroups={muscleGroups}
                equipmentTypes={equipmentTypes}
              />
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {filteredExercises.map((exercise) => (
                  <ExerciseCompactCard
                    key={exercise.id}
                    exercise={exercise}
                    onAdd={() => addExercise(exercise)}
                  />
                ))}
                {filteredExercises.length === 0 && (
                  <div className="text-center py-8">
                    <Icon name="Search" size={48} color="var(--color-text-tertiary)" className="mx-auto mb-4" />
                    <p className="text-text-tertiary">No exercises found matching your criteria</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Pane - Workout Builder */}
          <div className="bg-surface rounded-lg border border-border overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Current Workout</h2>
              <InputField
                label="Workout Name"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                placeholder="Enter workout name (3-30 characters)"
                error={errors.workoutName}
                maxLength={30}
              />
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {selectedExercises.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Plus" size={48} color="var(--color-text-tertiary)" className="mx-auto mb-4" />
                  <p className="text-text-tertiary mb-2">No exercises added yet</p>
                  <p className="text-sm text-text-tertiary">Add exercises from the library to build your workout</p>
                </div>
              ) : (
                <WorkoutSequenceBuilder
                  exercises={selectedExercises}
                  onRemove={removeExercise}
                  onUpdate={updateExercise}
                  onMove={moveExercise}
                  onDragStart={handleDragStart}
                  onDragEnter={handleDragEnter}
                  onDragEnd={handleDragEnd}
                />
              )}
              {errors.exercises && (
                <p className="text-danger text-sm mt-2">{errors.exercises}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-text-secondary">
              {selectedExercises.length} exercise{selectedExercises.length !== 1 ? 's' : ''} added
            </span>
          </div>
          <ActionButton
            onClick={handleSaveWorkout}
            disabled={selectedExercises.length === 0}
            className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:bg-text-tertiary disabled:cursor-not-allowed"
          >
            <Icon name="Save" size={16} className="mr-2" />
            Save Workout
          </ActionButton>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-4 right-4 bg-success text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
          <Icon name="CheckCircle" size={20} color="white" />
          <span>Workout saved successfully!</span>
        </div>
      )}

      {/* Navigation Links */}
      <div className="hidden">
        <Link to="/exercise-dashboard">Exercise Dashboard</Link>
        <Link to="/workout-execution">Workout Execution</Link>
      </div>
    </div>
  );
};

export default WorkoutBuilder;