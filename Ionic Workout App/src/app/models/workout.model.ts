// Represents an individual exercise in a workout
export interface Exercise {
    name: string; // Name of the exercise 
    duration: string; // Duration of the exercise 
    equipment: string; // Equipment required for the exercise
}

// Represents a workout, which consists of multiple exercises
export interface Workout {
    id: number; // Unique identifier for the workout
    title: string; // Title of the workout
    description: string; // Description of the workout 
    exercises: Exercise[]; // List of exercises included in the workout
    image?: string; // Optional image URL for the workout 
}