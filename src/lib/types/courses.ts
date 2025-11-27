import type { Component } from 'svelte';

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

export type ModuleType = 'standard' | 'deep-dive';
export type ModuleVariant = 'analysis' | 'simulator';

export interface Module {
	id: string;
	slug: string;
	title: string;
	description: string;
	icon: string;
	lessons: Lesson[];
	prerequisites?: string[];
	order: number;
	type?: ModuleType;
	/** For deep-dives: 'analysis' studies the figure, 'simulator' role-plays as them */
	variant?: ModuleVariant;
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
	/** Required SVG illustration component for the course */
	illustration: Component;
	/** Course IDs that should be completed first (soft prerequisite) */
	prerequisites?: string[];
	/** True if this is a "goal" course users can select as a destination */
	isGoal?: boolean;
	/** Category for grouping goals: "fitness", "creative", "thinking", "social" */
	goalCategory?: string;
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
