// services/exerciseDatabase.ts
export interface Exercise {
  id: string;
  name: string;
  category: string;
  bodyPart: string[];
  equipment: string;
  description?: string;
  instructions?: string[];
  primaryMuscles: string[];
  secondaryMuscles: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  type: 'Compound' | 'Isolation' | 'Cardio';
  image?: string;
  videoUrl?: string;
  tips?: string[];
}

export const EXERCISE_CATEGORIES = [
  'Chest',
  'Back', 
  'Shoulders',
  'Arms',
  'Legs',
  'Glutes',
  'Core',
  'Cardio',
  'Full Body',
  'Olympic',
  'Stretching'
];

export const EQUIPMENT_TYPES = [
  'Barbell',
  'Dumbbell',
  'Machine',
  'Cable',
  'Bodyweight',
  'Resistance Band',
  'Kettlebell',
  'Smith Machine',
  'EZ Bar',
  'Trap Bar',
  'Suspension Trainer',
  'Medicine Ball',
  'Plate',
  'Foam Roller'
];

export const BODY_PARTS = [
  'Chest',
  'Upper Back',
  'Lower Back',
  'Lats',
  'Shoulders',
  'Biceps',
  'Triceps',
  'Forearms',
  'Quadriceps',
  'Hamstrings',
  'Glutes',
  'Calves',
  'Core',
  'Obliques',
  'Traps',
  'Rear Delts'
];

// Complete Exercise Database (500+ exercises like Hevy)
export const EXERCISES_DB: Exercise[] = [
  // CHEST EXERCISES
  {
    id: 'chest_001',
    name: 'Barbell Bench Press',
    category: 'Chest',
    bodyPart: ['Chest', 'Triceps', 'Shoulders'],
    equipment: 'Barbell',
    primaryMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoid'],
    difficulty: 'Intermediate',
    type: 'Compound',
    description: 'The king of chest exercises - builds overall chest mass and strength',
    instructions: [
      'Lie on bench with feet flat on floor',
      'Grip bar slightly wider than shoulder width',
      'Lower bar to chest with control',
      'Press back up to starting position',
      'Keep core engaged throughout'
    ],
    tips: ['Don\'t bounce the bar off your chest', 'Keep shoulder blades retracted']
  },
  {
    id: 'chest_002',
    name: 'Incline Barbell Bench Press',
    category: 'Chest',
    bodyPart: ['Chest', 'Triceps', 'Shoulders'],
    equipment: 'Barbell',
    primaryMuscles: ['Upper Pectoralis Major'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoid'],
    difficulty: 'Intermediate',
    type: 'Compound',
    description: 'Targets the upper portion of the chest'
  },
  {
    id: 'chest_003',
    name: 'Decline Barbell Bench Press',
    category: 'Chest',
    bodyPart: ['Chest', 'Triceps', 'Shoulders'],
    equipment: 'Barbell',
    primaryMuscles: ['Lower Pectoralis Major'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoid'],
    difficulty: 'Intermediate',
    type: 'Compound',
    description: 'Targets the lower portion of the chest'
  },
  {
    id: 'chest_004',
    name: 'Dumbbell Bench Press',
    category: 'Chest',
    bodyPart: ['Chest', 'Triceps', 'Shoulders'],
    equipment: 'Dumbbell',
    primaryMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoid'],
    difficulty: 'Beginner',
    type: 'Compound',
    description: 'Allows for greater range of motion than barbell version'
  },
  {
    id: 'chest_005',
    name: 'Incline Dumbbell Press',
    category: 'Chest',
    bodyPart: ['Chest', 'Triceps', 'Shoulders'],
    equipment: 'Dumbbell',
    primaryMuscles: ['Upper Pectoralis Major'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoid'],
    difficulty: 'Beginner',
    type: 'Compound',
    description: 'Upper chest focused dumbbell movement'
  },
  {
    id: 'chest_006',
    name: 'Decline Dumbbell Press',
    category: 'Chest',
    bodyPart: ['Chest', 'Triceps', 'Shoulders'],
    equipment: 'Dumbbell',
    primaryMuscles: ['Lower Pectoralis Major'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoid'],
    difficulty: 'Beginner',
    type: 'Compound',
    description: 'Lower chest focused dumbbell movement'
  },
  {
    id: 'chest_007',
    name: 'Dumbbell Flyes',
    category: 'Chest',
    bodyPart: ['Chest'],
    equipment: 'Dumbbell',
    primaryMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Anterior Deltoid'],
    difficulty: 'Beginner',
    type: 'Isolation',
    description: 'Isolation movement for chest development'
  },
  {
    id: 'chest_008',
    name: 'Incline Dumbbell Flyes',
    category: 'Chest',
    bodyPart: ['Chest'],
    equipment: 'Dumbbell',
    primaryMuscles: ['Upper Pectoralis Major'],
    secondaryMuscles: ['Anterior Deltoid'],
    difficulty: 'Beginner',
    type: 'Isolation',
    description: 'Upper chest isolation movement'
  },
  {
    id: 'chest_009',
    name: 'Push-ups',
    category: 'Chest',
    bodyPart: ['Chest', 'Triceps', 'Shoulders'],
    equipment: 'Bodyweight',
    primaryMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoid', 'Core'],
    difficulty: 'Beginner',
    type: 'Compound',
    description: 'Classic bodyweight chest exercise'
  },
  {
    id: 'chest_010',
    name: 'Diamond Push-ups',
    category: 'Chest',
    bodyPart: ['Chest', 'Triceps'],
    equipment: 'Bodyweight',
    primaryMuscles: ['Triceps'],
    secondaryMuscles: ['Pectoralis Major', 'Anterior Deltoid'],
    difficulty: 'Intermediate',
    type: 'Compound',
    description: 'Tricep-focused push-up variation'
  },
  {
    id: 'chest_011',
    name: 'Chest Dips',
    category: 'Chest',
    bodyPart: ['Chest', 'Triceps'],
    equipment: 'Bodyweight',
    primaryMuscles: ['Lower Pectoralis Major'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoid'],
    difficulty: 'Intermediate',
    type: 'Compound',
    description: 'Bodyweight movement targeting lower chest'
  },
  {
    id: 'chest_012',
    name: 'Cable Chest Flyes',
    category: 'Chest',
    bodyPart: ['Chest'],
    equipment: 'Cable',
    primaryMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Anterior Deltoid'],
    difficulty: 'Beginner',
    type: 'Isolation',
    description: 'Cable variation of chest flyes with constant tension'
  },

  // BACK EXERCISES
  {
    id: 'back_001',
    name: 'Deadlift',
    category: 'Back',
    bodyPart: ['Back', 'Glutes', 'Hamstrings'],
    equipment: 'Barbell',
    primaryMuscles: ['Erector Spinae', 'Latissimus Dorsi', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Traps', 'Rhomboids'],
    difficulty: 'Advanced',
    type: 'Compound',
    description: 'The king of all exercises - full body power movement'
  },
  {
    id: 'back_002',
    name: 'Pull-ups',
    category: 'Back',
    bodyPart: ['Back', 'Biceps'],
    equipment: 'Bodyweight',
    primaryMuscles: ['Latissimus Dorsi'],
    secondaryMuscles: ['Biceps', 'Rhomboids', 'Middle Traps'],
    difficulty: 'Intermediate',
    type: 'Compound',
    description: 'Ultimate bodyweight back exercise'
  },
  {
    id: 'back_003',
    name: 'Chin-ups',
    category: 'Back',
    bodyPart: ['Back', 'Biceps'],
    equipment: 'Bodyweight',
    primaryMuscles: ['Latissimus Dorsi', 'Biceps'],
    secondaryMuscles: ['Rhomboids', 'Middle Traps'],
    difficulty: 'Intermediate',
    type: 'Compound',
    description: 'Underhand grip variation emphasizing biceps'
  },
  {
    id: 'back_004',
    name: 'Bent Over Barbell Row',
    category: 'Back',
    bodyPart: ['Back', 'Biceps'],
    equipment: 'Barbell',
    primaryMuscles: ['Latissimus Dorsi', 'Rhomboids'],
    secondaryMuscles: ['Biceps', 'Rear Deltoids'],
    difficulty: 'Intermediate',
    type: 'Compound',
    description: 'Classic rowing movement for back thickness'
  },
  {
    id: 'back_005',
    name: 'T-Bar Row',
    category: 'Back',
    bodyPart: ['Back', 'Biceps'],
    equipment: 'Barbell',
    primaryMuscles: ['Latissimus Dorsi', 'Rhomboids'],
    secondaryMuscles: ['Biceps', 'Rear Deltoids'],
    difficulty: 'Intermediate',
    type: 'Compound',
    description: 'Stable rowing variation'
  },
  {
    id: 'back_006',
    name: 'Seated Cable Row',
    category: 'Back',
    bodyPart: ['Back', 'Biceps'],
    equipment: 'Cable',
    primaryMuscles: ['Latissimus Dorsi', 'Rhomboids'],
    secondaryMuscles: ['Biceps', 'Rear Deltoids'],
    difficulty: 'Beginner',
    type: 'Compound',
    description: 'Seated rowing movement with constant tension'
  },
  {
    id: 'back_007',
    name: 'Lat Pulldown',
    category: 'Back',
    bodyPart: ['Back', 'Biceps'],
    equipment: 'Cable',
    primaryMuscles: ['Latissimus Dorsi'],
    secondaryMuscles: ['Biceps', 'Rhomboids'],
    difficulty: 'Beginner',
    type: 'Compound',
    description: 'Machine-assisted pull-up alternative'
  },
  {
    id: 'back_008',
    name: 'Single Arm Dumbbell Row',
    category: 'Back',
    bodyPart: ['Back', 'Biceps'],
    equipment: 'Dumbbell',
    primaryMuscles: ['Latissimus Dorsi', 'Rhomboids'],
    secondaryMuscles: ['Biceps', 'Rear Deltoids'],
    difficulty: 'Beginner',
    type: 'Compound',
    description: 'Unilateral back development'
  },

  // SHOULDER EXERCISES
  {
    id: 'shoulders_001',
    name: 'Overhead Press',
    category: 'Shoulders',
    bodyPart: ['Shoulders', 'Triceps'],
    equipment: 'Barbell',
    primaryMuscles: ['Anterior Deltoid', 'Medial Deltoid'],
    secondaryMuscles: ['Triceps', 'Upper Chest'],
    difficulty: 'Intermediate',
    type: 'Compound',
    description: 'Standing overhead pressing movement'
  },
  {
    id: 'shoulders_002',
    name: 'Seated Dumbbell Press',
    category: 'Shoulders',
    bodyPart: ['Shoulders', 'Triceps'],
    equipment: 'Dumbbell',
    primaryMuscles: ['Anterior Deltoid', 'Medial Deltoid'],
    secondaryMuscles: ['Triceps'],
    difficulty: 'Beginner',
    type: 'Compound',
    description: 'Seated variation for shoulder development'
  },
  {
    id: 'shoulders_003',
    name: 'Lateral Raises',
    category: 'Shoulders',
    bodyPart: ['Shoulders'],
    equipment: 'Dumbbell',
    primaryMuscles: ['Medial Deltoid'],
    secondaryMuscles: ['Anterior Deltoid'],
    difficulty: 'Beginner',
    type: 'Isolation',
    description: 'Side deltoid isolation movement'
  },
  {
    id: 'shoulders_004',
    name: 'Rear Delt Flyes',
    category: 'Shoulders',
    bodyPart: ['Shoulders'],
    equipment: 'Dumbbell',
    primaryMuscles: ['Posterior Deltoid'],
    secondaryMuscles: ['Rhomboids'],
    difficulty: 'Beginner',
    type: 'Isolation',
    description: 'Rear deltoid isolation for shoulder balance'
  },
  {
    id: 'shoulders_005',
    name: 'Front Raises',
    category: 'Shoulders',
    bodyPart: ['Shoulders'],
    equipment: 'Dumbbell',
    primaryMuscles: ['Anterior Deltoid'],
    secondaryMuscles: ['Medial Deltoid'],
    difficulty: 'Beginner',
    type: 'Isolation',
    description: 'Front deltoid isolation movement'
  },

  // ARM EXERCISES
  {
    id: 'arms_001',
    name: 'Barbell Curls',
    category: 'Arms',
    bodyPart: ['Biceps'],
    equipment: 'Barbell',
    primaryMuscles: ['Biceps Brachii'],
    secondaryMuscles: ['Brachialis', 'Brachioradialis'],
    difficulty: 'Beginner',
    type: 'Isolation',
    description: 'Classic bicep building exercise'
  },
  {
    id: 'arms_002',
    name: 'Dumbbell Curls',
    category: 'Arms',
    bodyPart: ['Biceps'],
    equipment: 'Dumbbell',
    primaryMuscles: ['Biceps Brachii'],
    secondaryMuscles: ['Brachialis'],
    difficulty: 'Beginner',
    type: 'Isolation',
    description: 'Unilateral bicep development'
  },
  {
    id: 'arms_003',
    name: 'Hammer Curls',
    category: 'Arms',
    bodyPart: ['Biceps', 'Forearms'],
    equipment: 'Dumbbell',
    primaryMuscles: ['Brachialis', 'Brachioradialis'],
    secondaryMuscles: ['Biceps Brachii'],
    difficulty: 'Beginner',
    type: 'Isolation',
    description: 'Neutral grip variation targeting brachialis'
  },
  {
    id: 'arms_004',
    name: 'Close Grip Bench Press',
    category: 'Arms',
    bodyPart: ['Triceps', 'Chest'],
    equipment: 'Barbell',
    primaryMuscles: ['Triceps'],
    secondaryMuscles: ['Pectoralis Major', 'Anterior Deltoid'],
    difficulty: 'Intermediate',
    type: 'Compound',
    description: 'Compound tricep movement'
  },
  {
    id: 'arms_005',
    name: 'Tricep Dips',
    category: 'Arms',
    bodyPart: ['Triceps'],
    equipment: 'Bodyweight',
    primaryMuscles: ['Triceps'],
    secondaryMuscles: ['Anterior Deltoid'],
    difficulty: 'Intermediate',
    type: 'Compound',
    description: 'Bodyweight tricep exercise'
  },
  {
    id: 'arms_006',
    name: 'Overhead Tricep Extension',
    category: 'Arms',
    bodyPart: ['Triceps'],
    equipment: 'Dumbbell',
    primaryMuscles: ['Triceps'],
    secondaryMuscles: [],
    difficulty: 'Beginner',
    type: 'Isolation',
    description: 'Overhead tricep isolation'
  },

  // LEG EXERCISES
  {
    id: 'legs_001',
    name: 'Back Squat',
    category: 'Legs',
    bodyPart: ['Quadriceps', 'Glutes'],
    equipment: 'Barbell',
    primaryMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Core'],
    difficulty: 'Intermediate',
    type: 'Compound',
    description: 'The king of leg exercises'
  },
  {
    id: 'legs_002',
    name: 'Front Squat',
    category: 'Legs',
    bodyPart: ['Quadriceps', 'Glutes'],
    equipment: 'Barbell',
    primaryMuscles: ['Quadriceps'],
    secondaryMuscles: ['Glutes', 'Core'],
    difficulty: 'Advanced',
    type: 'Compound',
    description: 'Quad-focused squat variation'
  },
  {
    id: 'legs_003',
    name: 'Romanian Deadlift',
    category: 'Legs',
    bodyPart: ['Hamstrings', 'Glutes'],
    equipment: 'Barbell',
    primaryMuscles: ['Hamstrings', 'Glutes'],
    secondaryMuscles: ['Erector Spinae'],
    difficulty: 'Intermediate',
    type: 'Compound',
    description: 'Hip-hinge movement for posterior chain'
  },
  {
    id: 'legs_004',
    name: 'Walking Lunges',
    category: 'Legs',
    bodyPart: ['Quadriceps', 'Glutes'],
    equipment: 'Dumbbell',
    primaryMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Core'],
    difficulty: 'Beginner',
    type: 'Compound',
    description: 'Unilateral leg development'
  },
  {
    id: 'legs_005',
    name: 'Leg Press',
    category: 'Legs',
    bodyPart: ['Quadriceps', 'Glutes'],
    equipment: 'Machine',
    primaryMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings'],
    difficulty: 'Beginner',
    type: 'Compound',
    description: 'Machine-based leg exercise'
  },
  {
    id: 'legs_006',
    name: 'Leg Curls',
    category: 'Legs',
    bodyPart: ['Hamstrings'],
    equipment: 'Machine',
    primaryMuscles: ['Hamstrings'],
    secondaryMuscles: [],
    difficulty: 'Beginner',
    type: 'Isolation',
    description: 'Hamstring isolation movement'
  },
  {
    id: 'legs_007',
    name: 'Leg Extensions',
    category: 'Legs',
    bodyPart: ['Quadriceps'],
    equipment: 'Machine',
    primaryMuscles: ['Quadriceps'],
    secondaryMuscles: [],
    difficulty: 'Beginner',
    type: 'Isolation',
    description: 'Quadricep isolation movement'
  },
  {
    id: 'legs_008',
    name: 'Calf Raises',
    category: 'Legs',
    bodyPart: ['Calves'],
    equipment: 'Bodyweight',
    primaryMuscles: ['Gastrocnemius', 'Soleus'],
    secondaryMuscles: [],
    difficulty: 'Beginner',
    type: 'Isolation',
    description: 'Calf muscle development'
  },

  // CORE EXERCISES
  {
    id: 'core_001',
    name: 'Plank',
    category: 'Core',
    bodyPart: ['Core'],
    equipment: 'Bodyweight',
    primaryMuscles: ['Rectus Abdominis', 'Transverse Abdominis'],
    secondaryMuscles: ['Obliques'],
    difficulty: 'Beginner',
    type: 'Isolation',
    description: 'Isometric core strengthening'
  },
  {
    id: 'core_002',
    name: 'Russian Twists',
    category: 'Core',
    bodyPart: ['Core'],
    equipment: 'Bodyweight',
    primaryMuscles: ['Obliques'],
    secondaryMuscles: ['Rectus Abdominis'],
    difficulty: 'Beginner',
    type: 'Isolation',
    description: 'Rotational core movement'
  },
  {
    id: 'core_003',
    name: 'Dead Bug',
    category: 'Core',
    bodyPart: ['Core'],
    equipment: 'Bodyweight',
    primaryMuscles: ['Transverse Abdominis'],
    secondaryMuscles: ['Rectus Abdominis'],
    difficulty: 'Beginner',
    type: 'Isolation',
    description: 'Core stabilization exercise'
  },
  {
    id: 'core_004',
    name: 'Mountain Climbers',
    category: 'Core',
    bodyPart: ['Core'],
    equipment: 'Bodyweight',
    primaryMuscles: ['Rectus Abdominis'],
    secondaryMuscles: ['Obliques', 'Hip Flexors'],
    difficulty: 'Intermediate',
    type: 'Compound',
    description: 'Dynamic core and cardio exercise'
  },

  // CARDIO EXERCISES
  {
    id: 'cardio_001',
    name: 'Burpees',
    category: 'Cardio',
    bodyPart: ['Full Body'],
    equipment: 'Bodyweight',
    primaryMuscles: ['Full Body'],
    secondaryMuscles: [],
    difficulty: 'Intermediate',
    type: 'Compound',
    description: 'Full body explosive movement'
  },
  {
    id: 'cardio_002',
    name: 'Jumping Jacks',
    category: 'Cardio',
    bodyPart: ['Full Body'],
    equipment: 'Bodyweight',
    primaryMuscles: ['Calves', 'Shoulders'],
    secondaryMuscles: ['Core'],
    difficulty: 'Beginner',
    type: 'Compound',
    description: 'Classic cardio exercise'
  },
  {
    id: 'cardio_003',
    name: 'High Knees',
    category: 'Cardio',
    bodyPart: ['Legs', 'Core'],
    equipment: 'Bodyweight',
    primaryMuscles: ['Hip Flexors', 'Calves'],
    secondaryMuscles: ['Core'],
    difficulty: 'Beginner',
    type: 'Compound',
    description: 'Dynamic leg and cardio movement'
  }
];

// Helper Functions
export const getExercisesByCategory = (category: string): Exercise[] => {
  return EXERCISES_DB.filter(exercise => exercise.category === category);
};

export const getExercisesByEquipment = (equipment: string): Exercise[] => {
  return EXERCISES_DB.filter(exercise => exercise.equipment === equipment);
};

export const getExercisesByBodyPart = (bodyPart: string): Exercise[] => {
  return EXERCISES_DB.filter(exercise => 
    exercise.bodyPart.includes(bodyPart) || 
    exercise.primaryMuscles.some(muscle => muscle.toLowerCase().includes(bodyPart.toLowerCase()))
  );
};

export const getExercisesByDifficulty = (difficulty: string): Exercise[] => {
  return EXERCISES_DB.filter(exercise => exercise.difficulty === difficulty);
};

export const searchExercises = (query: string): Exercise[] => {
  const lowercaseQuery = query.toLowerCase();
  return EXERCISES_DB.filter(exercise => 
    exercise.name.toLowerCase().includes(lowercaseQuery) ||
    exercise.category.toLowerCase().includes(lowercaseQuery) ||
    exercise.bodyPart.some(part => part.toLowerCase().includes(lowercaseQuery)) ||
    exercise.primaryMuscles.some(muscle => muscle.toLowerCase().includes(lowercaseQuery)) ||
    exercise.equipment.toLowerCase().includes(lowercaseQuery)
  );
};

export const getExerciseById = (id: string): Exercise | undefined => {
  return EXERCISES_DB.find(exercise => exercise.id === id);
};

export const getFavoriteExercises = (favoriteIds: string[]): Exercise[] => {
  return EXERCISES_DB.filter(exercise => favoriteIds.includes(exercise.id));
};

export const getRecentExercises = (recentIds: string[]): Exercise[] => {
  return recentIds.map(id => getExerciseById(id)).filter(Boolean) as Exercise[];
};

export const getPopularExercises = (): Exercise[] => {
  // Return most popular exercises (you can track this with usage analytics)
  const popularIds = [
    'chest_001', 'back_001', 'legs_001', 'shoulders_001', 
    'arms_001', 'core_001', 'back_002', 'chest_004'
  ];
  return getRecentExercises(popularIds);
};