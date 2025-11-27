import type { Course } from '$lib/types/courses';
import TrainingHealthIllustration from '$lib/components/illustrations/TrainingHealthIllustration.svelte';

export const trainingHealthCourse: Course = {
	id: 'training-health',
	slug: 'training-longevity',
	title: 'Training for Longevity',
	description: 'Exercise for a longer, healthier life',
	longDescription:
		'Not everyone wants to look like a bodybuilder. Learn the minimum effective dose of exercise for cardiovascular health, functional fitness, and longevity. Evidence-based movement that fits your life.',
	difficulty: 'beginner',
	estimatedHours: 2,
	totalXP: 280,
	tags: ['wellness', 'exercise', 'longevity', 'cardio'],
	illustration: TrainingHealthIllustration,
	prerequisites: ['nutrition-101', 'sleep-science'],
	isGoal: true,
	goalCategory: 'fitness',
	modules: [
		{
			id: 'train-health-main',
			slug: 'longevity-training',
			title: 'Longevity Training',
			description: 'Exercise for health outcomes',
			icon: 'heart-pulse',
			order: 1,
			lessons: [
				{
					id: 'train-h-1',
					slug: 'movement-tracker',
					title: 'Play: Activity Multiplier',
					description: 'See how different activities stack up for health benefits',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 1
				},
				{
					id: 'train-h-2',
					slug: 'cardio-science',
					title: 'Cardio: What Works',
					description: 'Heart rate zones and actual benefits',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 2,
					prerequisites: ['train-h-1']
				},
				{
					id: 'train-h-3',
					slug: 'zone-2',
					title: 'Zone 2: The Longevity Zone',
					description: 'Why easy cardio is the secret weapon',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 20,
					order: 3,
					prerequisites: ['train-h-2']
				},
				{
					id: 'train-h-4',
					slug: 'neat',
					title: 'NEAT: The Hidden Factor',
					description: 'Why daily movement beats gym heroics',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 4,
					prerequisites: ['train-h-3']
				},
				{
					id: 'train-h-5',
					slug: 'functional-strength',
					title: 'Functional Strength',
					description: 'Minimum muscle for maximum life quality',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 5,
					prerequisites: ['train-h-4']
				},
				{
					id: 'train-h-6',
					slug: 'routine-builder-health',
					title: 'Interactive: Longevity Routine Builder',
					description: 'Design a sustainable routine for health outcomes',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 35,
					order: 6,
					prerequisites: ['train-h-5']
				},
				{
					id: 'train-h-7',
					slug: 'quiz-longevity',
					title: 'Quiz: Longevity Training',
					description: 'Apply evidence-based exercise for health',
					contentType: 'practice',
					estimatedMinutes: 10,
					xpReward: 25,
					order: 7,
					prerequisites: ['train-h-6']
				}
			]
		}
	]
};
