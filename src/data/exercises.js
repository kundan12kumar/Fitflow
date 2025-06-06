// src/data/exercises.js
export const exercisesData = [
  {
    id: 1,
    name: "Push-ups",
    primaryMuscleGroup: "Chest",
    difficulty: "Beginner",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    video: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop",
    category: "strength",
    description: "A classic bodyweight exercise that targets the chest, shoulders, and triceps.",
    primaryMuscles: ["Chest", "Triceps"],
    secondaryMuscles: ["Shoulders", "Core"],
    equipment: "None",
    caloriesBurned: 45,
    duration: "10 minutes",
    instructions: `Start in a plank position with your hands placed slightly wider than shoulder-width apart.

Keep your body in a straight line from head to heels, engaging your core muscles.

Lower your body until your chest nearly touches the floor, keeping your elbows at a 45-degree angle.

Push through your palms to return to the starting position, fully extending your arms.

Maintain controlled movement throughout the exercise, focusing on proper form over speed.

Breathe in as you lower down and exhale as you push back up.`,
    tips: `Keep your core tight throughout the movement to maintain proper form and protect your lower back.

If you're a beginner, start with knee push-ups or incline push-ups against a wall or bench.

Focus on the quality of each repetition rather than the quantity - proper form is crucial.

Keep your head in a neutral position, looking slightly ahead rather than down.

If you feel pain in your wrists, try using push-up handles or doing push-ups on your fists.

Progress gradually by increasing repetitions or trying more challenging variations like diamond push-ups.`
  },
  {
    id: 2,
    name: "Running",
    primaryMuscleGroup: "Cardio",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop",
    video: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=450&fit=crop",
    category: "cardio",
    description: "Cardiovascular exercise that improves endurance and burns calories.",
    primaryMuscles: ["Legs", "Cardiovascular System"],
    secondaryMuscles: ["Core", "Arms"],
    equipment: "Running Shoes",
    caloriesBurned: 300,
    duration: "30 minutes",
    instructions: `Start with a proper warm-up including light stretching and walking.

Maintain an upright posture with slight forward lean from your ankles.

Land on the middle of your foot, not your heel or toes.

Keep your arms relaxed with a natural swing motion.

Maintain a comfortable, sustainable pace throughout your run.

Focus on controlled breathing and stay hydrated.`,
    tips: `Start slowly and gradually increase distance and pace over time.

Invest in proper running shoes that suit your gait and foot type.

Run on softer surfaces when possible to reduce impact on joints.

Listen to your body and rest when needed to prevent injury.

Stay hydrated before, during, and after your run.

Consider running with a buddy or group for motivation and safety.`
  },
  {
    id: 3,
    name: "Yoga Flow",
    primaryMuscleGroup: "Full Body",
    difficulty: "Beginner",
    image: "https://images.unsplash.com/photo-1506629905607-d405d7d3b0d2?w=400&h=300&fit=crop",
    video: "https://images.unsplash.com/photo-1506629905607-d405d7d3b0d2?w=800&h=450&fit=crop",
    category: "flexibility",
    description: "A sequence of yoga poses that improves flexibility and mindfulness.",
    primaryMuscles: ["Full Body", "Core"],
    secondaryMuscles: ["Balance", "Flexibility"],
    equipment: "Yoga Mat",
    caloriesBurned: 150,
    duration: "20 minutes",
    instructions: `Begin in child's pose to center yourself and focus on breathing.

Move through cat-cow stretches to warm up your spine.

Flow through sun salutation sequences linking breath with movement.

Hold each pose for 3-5 breaths, focusing on alignment and form.

Transition smoothly between poses with mindful breathing.

End in savasana (corpse pose) for final relaxation.`,
    tips: `Focus on your breath throughout the practice - let it guide your movements.

Never force a pose; work within your current range of motion.

Use props like blocks or straps if needed to maintain proper alignment.

Practice consistently for best results, even if just for a few minutes daily.

Listen to your body and modify poses as needed.

Create a peaceful environment free from distractions.`
  },
  {
    id: 4,
    name: "Deadlifts",
    primaryMuscleGroup: "Back",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop",
    video: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=450&fit=crop",
    category: "strength",
    description: "Compound exercise targeting the posterior chain muscles.",
    primaryMuscles: ["Back", "Glutes", "Hamstrings"],
    secondaryMuscles: ["Traps", "Core", "Forearms"],
    equipment: "Barbell, Weight Plates",
    caloriesBurned: 200,
    duration: "15 minutes",
    instructions: `Stand with feet hip-width apart, bar over the middle of your feet.

Bend at hips and knees to grip the bar with hands shoulder-width apart.

Keep your chest up, back straight, and core engaged.

Drive through your heels to lift the bar, extending hips and knees simultaneously.

Keep the bar close to your body throughout the movement.

Lower the bar by reversing the movement, maintaining control.`,
    tips: `Start with lighter weight to master proper form before progressing.

Keep your back neutral throughout the movement - never round your spine.

The movement should be hip-dominant, not knee-dominant.

Engage your lats to keep the bar close to your body.

Breathe out during the lifting phase and in during the lowering phase.

Consider using a mixed grip or lifting straps for heavier weights.`
  },
  {
    id: 5,
    name: "Cycling",
    primaryMuscleGroup: "Legs",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    video: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=450&fit=crop",
    category: "cardio",
    description: "Low-impact cardio exercise that strengthens leg muscles.",
    primaryMuscles: ["Quadriceps", "Calves"],
    secondaryMuscles: ["Glutes", "Core"],
    equipment: "Bicycle, Helmet",
    caloriesBurned: 400,
    duration: "45 minutes",
    instructions: `Ensure your bike is properly fitted to your body size.

Maintain a slight bend in your elbows and keep your back relatively straight.

Pedal with the ball of your foot, keeping your heel down.

Maintain a steady cadence of 80-100 RPM for optimal efficiency.

Shift gears appropriately to maintain consistent effort on varying terrain.

Stay alert to traffic and road conditions at all times.`,
    tips: `Always wear a properly fitted helmet for safety.

Start with shorter rides and gradually increase distance and intensity.

Stay hydrated and bring water on longer rides.

Use proper cycling clothing to reduce chafing and improve comfort.

Plan your route in advance and inform someone of your cycling plans.

Regularly maintain your bike to ensure safe operation.`
  },
  {
    id: 6,
    name: "Squats",
    primaryMuscleGroup: "Legs",
    difficulty: "Beginner",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop",
    video: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&h=450&fit=crop",
    category: "strength",
    description: "Fundamental lower body exercise targeting quads, glutes, and hamstrings.",
    primaryMuscles: ["Quadriceps", "Glutes"],
    secondaryMuscles: ["Hamstrings", "Core"],
    equipment: "None",
    caloriesBurned: 100,
    duration: "10 minutes",
    instructions: `Stand with feet shoulder-width apart, toes slightly pointed out.

Keep your chest up and core engaged throughout the movement.

Initiate the movement by pushing your hips back as if sitting in a chair.

Lower down until your thighs are parallel to the floor or as low as comfortable.

Keep your knees in line with your toes, don't let them cave inward.

Push through your heels to return to the starting position.`,
    tips: `Focus on sitting back with your hips rather than just bending your knees.

Keep your weight distributed evenly across your feet.

Don't let your knees extend past your toes at the bottom position.

Progress to goblet squats or barbell squats as you get stronger.

Maintain a neutral spine throughout the movement.

Start with bodyweight and focus on form before adding resistance.`
  },
  {
    id: 7,
    name: "Stretching",
    primaryMuscleGroup: "Full Body",
    difficulty: "Beginner",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=300&fit=crop",
    video: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&h=450&fit=crop",
    category: "flexibility",
    description: "Static stretches to improve flexibility and reduce muscle tension.",
    primaryMuscles: ["Full Body"],
    secondaryMuscles: ["Flexibility", "Mobility"],
    equipment: "None",
    caloriesBurned: 50,
    duration: "15 minutes",
    instructions: `Start with gentle warm-up movements to prepare your muscles.

Hold each stretch for 15-30 seconds without bouncing.

Breathe deeply and relax into each stretch gradually.

Focus on major muscle groups: hamstrings, calves, quads, hip flexors.

Include upper body stretches for shoulders, chest, and back.

End with gentle spinal twists and neck stretches.`,
    tips: `Never stretch cold muscles - do a brief warm-up first.

Stretch should feel gentle, never painful or forced.

Breathe normally during stretches, don't hold your breath.

Stretching is most effective when done consistently.

Focus on areas that feel tight or are used heavily in your workouts.

Consider stretching both before and after workouts for best results.`
  },
  {
    id: 8,
    name: "Burpees",
    primaryMuscleGroup: "Full Body",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    video: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop",
    category: "cardio",
    description: "High-intensity full-body exercise combining strength and cardio.",
    primaryMuscles: ["Full Body", "Core"],
    secondaryMuscles: ["Cardiovascular System"],
    equipment: "None",
    caloriesBurned: 250,
    duration: "10 minutes",
    instructions: `Start in a standing position with feet shoulder-width apart.

Squat down and place your hands on the floor in front of you.

Jump your feet back into a plank position.

Perform a push-up (optional for beginners).

Jump your feet back to the squat position.

Explode upward into a jump with arms overhead.`,
    tips: `Start slow and focus on proper form before increasing speed.

Modify by stepping instead of jumping if needed.

Maintain core engagement throughout the entire movement.

Breathe consistently - don't hold your breath.

Take breaks as needed and build endurance gradually.

This exercise is very demanding - listen to your body.`
  }
];

export const getExerciseById = (id) => {
  return exercisesData.find(exercise => exercise.id === parseInt(id));
};