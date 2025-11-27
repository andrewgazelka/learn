import type { Course } from '$lib/types/courses';
import TrainingAestheticsIllustration from '$lib/components/illustrations/TrainingAestheticsIllustration.svelte';

export const trainingAestheticsCourse: Course = {
	id: 'training-aesthetics',
	slug: 'training-aesthetics',
	title: 'Training for Aesthetics',
	description: 'Build the physique you want',
	longDescription:
		'Want to look better? This is the evidence-based approach to body composition. Hypertrophy principles, progressive overload, and the truth about building muscle and losing fat.',
	difficulty: 'intermediate',
	estimatedHours: 3,
	totalXP: 350,
	tags: ['fitness', 'aesthetics', 'muscle', 'body-composition'],
	illustration: TrainingAestheticsIllustration,
	prerequisites: ['nutrition-101', 'sleep-science'],
	isGoal: true,
	goalCategory: 'fitness',
	modules: [
		{
			id: 'train-aes-main',
			slug: 'physique-training',
			title: 'Physique Training',
			description: 'Building muscle and improving composition',
			icon: 'dumbbell',
			order: 1,
			lessons: [
				{
					id: 'train-a-1',
					slug: 'physique-sim',
					title: 'Play: Physique Simulator',
					description: 'See how training variables affect muscle growth',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 30,
					order: 1
				},
				{
					id: 'train-a-2',
					slug: 'hypertrophy-basics',
					title: 'Hypertrophy Science',
					description: 'What actually makes muscles grow',
					contentType: 'concept',
					estimatedMinutes: 15,
					xpReward: 20,
					order: 2,
					prerequisites: ['train-a-1']
				},
				{
					id: 'train-a-3',
					slug: 'progressive-overload',
					title: 'Progressive Overload',
					description: 'The fundamental principle of getting stronger',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 20,
					order: 3,
					prerequisites: ['train-a-2']
				},
				{
					id: 'train-a-4',
					slug: 'nutrition-for-muscle',
					title: 'Nutrition for Muscle',
					description: 'Protein timing, surplus, and deficit strategies',
					contentType: 'concept',
					estimatedMinutes: 15,
					xpReward: 20,
					order: 4,
					prerequisites: ['train-a-3']
				},
				{
					id: 'train-a-5',
					slug: 'body-recomp',
					title: 'Body Recomposition',
					description: 'Building muscle while losing fat—when it works',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 20,
					order: 5,
					prerequisites: ['train-a-4']
				},
				{
					id: 'train-a-6',
					slug: 'program-builder',
					title: 'Interactive: Program Builder',
					description: 'Design a hypertrophy program for your goals',
					contentType: 'interactive',
					estimatedMinutes: 25,
					xpReward: 40,
					order: 6,
					prerequisites: ['train-a-5']
				},
				{
					id: 'train-a-7',
					slug: 'quiz-aesthetics',
					title: 'Quiz: Aesthetic Training',
					description: 'Apply hypertrophy principles correctly',
					contentType: 'practice',
					estimatedMinutes: 12,
					xpReward: 30,
					order: 7,
					prerequisites: ['train-a-6']
				}
			]
		}
	]
};
