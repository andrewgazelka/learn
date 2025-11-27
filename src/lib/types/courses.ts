export type LessonStatus = 'locked' | 'available' | 'in_progress' | 'completed';
export type ModuleStatus = 'locked' | 'available' | 'in_progress' | 'completed';
export type LessonContentType = 'concept' | 'interactive' | 'practice';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Lesson {
	id: string;
	slug: string;
	title: string;
	description: string;
	contentType: LessonContentType;
	estimatedMinutes: number;
	xpReward: number;
	order: number;
	prerequisites?: string[];
}

export interface Module {
	id: string;
	slug: string;
	title: string;
	description: string;
	icon: string;
	lessons: Lesson[];
	prerequisites?: string[];
	order: number;
}

export interface Course {
	id: string;
	slug: string;
	title: string;
	description: string;
	longDescription?: string;
	difficulty: Difficulty;
	estimatedHours: number;
	modules: Module[];
	totalXP: number;
	tags: string[];
}

export interface LessonProgress {
	lessonId: string;
	status: LessonStatus;
	completedAt?: string;
	xpEarned: number;
}

export interface ModuleProgress {
	moduleId: string;
	status: ModuleStatus;
	lessonsCompleted: number;
	totalLessons: number;
}

export interface CourseProgress {
	courseId: string;
	startedAt: string;
	lastActivityAt: string;
	currentModuleId?: string;
	currentLessonId?: string;
	lessonsCompleted: number;
	totalLessons: number;
	totalXP: number;
}
