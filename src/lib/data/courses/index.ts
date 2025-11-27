import type { Course, CourseProgress } from '$lib/types/courses';
import { reinforcementLearningCourse } from './reinforcement-learning';

export const courses: Course[] = [reinforcementLearningCourse];

export function getCourseBySlug(slug: string): Course | undefined {
	return courses.find((c) => c.slug === slug);
}

export function getCourseById(id: string): Course | undefined {
	return courses.find((c) => c.id === id);
}

// Mock progress data for development
export const mockProgress: Map<string, CourseProgress> = new Map([
	[
		'rl-fundamentals',
		{
			courseId: 'rl-fundamentals',
			startedAt: '2024-01-15',
			lastActivityAt: '2024-01-20',
			currentModuleId: 'rl-mdp',
			currentLessonId: 'rl-mdp-2',
			lessonsCompleted: 5,
			totalLessons: 19,
			totalXP: 70
		}
	]
]);
