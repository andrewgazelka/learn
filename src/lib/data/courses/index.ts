import type { Course, CourseProgress } from '$lib/types/courses';
import { reinforcementLearningCourse } from './reinforcement-learning';
import { mediaLiteracyCourse } from './media-literacy';
import { fashionCourse } from './fashion';
import { photographyCourse } from './photography';
import { rhetoricCourse } from './rhetoric';
import { characterCourse } from './character';
// Health dependency tree
import { bodyBasicsCourse } from './body-basics';
import { sleepScienceCourse } from './sleep-science';
import { nutritionCourse } from './nutrition';
import { stressRecoveryCourse } from './stress-recovery';
import { trainingHealthCourse } from './training-health';
import { trainingAestheticsCourse } from './training-aesthetics';
import { habitMasteryCourse } from './habit-mastery';
import { cultDynamicsCourse } from './cult-dynamics';

export const courses: Course[] = [
	// Standalone goal courses
	reinforcementLearningCourse,
	mediaLiteracyCourse,
	fashionCourse,
	photographyCourse,
	rhetoricCourse,
	characterCourse,
	// Health dependency tree
	bodyBasicsCourse,
	sleepScienceCourse,
	nutritionCourse,
	stressRecoveryCourse,
	trainingHealthCourse,
	trainingAestheticsCourse,
	habitMasteryCourse,
	// Social advanced
	cultDynamicsCourse
];

export function getCourseBySlug(slug: string): Course | undefined {
	return courses.find((c) => c.slug === slug);
}

export function getCourseById(id: string): Course | undefined {
	return courses.find((c) => c.id === id);
}

/** Get all goal courses (leaf nodes users can select as destinations) */
export function getGoalCourses(): Course[] {
	return courses.filter((c) => c.isGoal);
}

/** Get all prerequisite courses for a given course (recursive) */
export function getAllPrerequisites(courseId: string, visited = new Set<string>()): Course[] {
	if (visited.has(courseId)) return [];
	visited.add(courseId);

	const course = getCourseById(courseId);
	if (!course?.prerequisites?.length) return [];

	const prereqs: Course[] = [];
	for (const prereqId of course.prerequisites) {
		const prereqCourse = getCourseById(prereqId);
		if (prereqCourse) {
			// Add transitive prerequisites first (depth-first)
			prereqs.push(...getAllPrerequisites(prereqId, visited));
			prereqs.push(prereqCourse);
		}
	}
	return prereqs;
}

/** Get the learning path for a goal course (ordered from first to last) */
export function getLearningPath(goalCourseId: string): Course[] {
	const prereqs = getAllPrerequisites(goalCourseId);
	const goalCourse = getCourseById(goalCourseId);
	if (goalCourse) {
		prereqs.push(goalCourse);
	}
	// Remove duplicates while preserving order
	const seen = new Set<string>();
	return prereqs.filter((c) => {
		if (seen.has(c.id)) return false;
		seen.add(c.id);
		return true;
	});
}

/** Get remaining path excluding completed courses */
export function getRemainingPath(
	goalCourseId: string,
	completedCourseIds: Set<string>
): Course[] {
	return getLearningPath(goalCourseId).filter((c) => !completedCourseIds.has(c.id));
}

/** Calculate total hours including prerequisites */
export function getTotalHoursWithPrereqs(
	goalCourseId: string,
	completedCourseIds: Set<string> = new Set()
): number {
	return getRemainingPath(goalCourseId, completedCourseIds).reduce(
		(sum, c) => sum + c.estimatedHours,
		0
	);
}

/** Check if prerequisites are met for a course */
export function arePrerequisitesMet(
	courseId: string,
	completedCourseIds: Set<string>
): boolean {
	const course = getCourseById(courseId);
	if (!course?.prerequisites?.length) return true;
	return course.prerequisites.every((prereqId) => completedCourseIds.has(prereqId));
}

/** Get courses that would be unlocked by completing a course */
export function getUnlockedCourses(
	completedCourseId: string,
	currentCompletedIds: Set<string>
): Course[] {
	const newCompleted = new Set([...currentCompletedIds, completedCourseId]);
	return courses.filter((course) => {
		// Was locked before, unlocked now
		const wasLocked = !arePrerequisitesMet(course.id, currentCompletedIds);
		const isUnlocked = arePrerequisitesMet(course.id, newCompleted);
		return wasLocked && isUnlocked;
	});
}

// Mock progress data for development
export const mockProgress = new Map<string, CourseProgress>([
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

// Mock completed courses for development
export const mockCompletedCourses = new Set<string>(['body-basics']);
