import type { Course } from '$lib/types/courses';
import NutritionIllustration from '$lib/components/illustrations/NutritionIllustration.svelte';

export const nutritionCourse: Course = {
	id: 'nutrition-101',
	slug: 'nutrition',
	title: 'Nutrition',
	description: 'What the research actually shows',
	longDescription:
		'Cut through the noise of diet culture. Understand macronutrients, metabolism myths, and what evidence-based nutrition actually looks like. No fads, no supplements—just science.',
	difficulty: 'beginner',
	estimatedHours: 2,
	totalXP: 250,
	tags: ['wellness', 'nutrition', 'diet'],
	illustration: NutritionIllustration,
	prerequisites: ['body-basics'],
	modules: [
		{
			id: 'nutr-main',
			slug: 'nutrition-essentials',
			title: 'Nutrition Essentials',
			description: 'Evidence-based eating',
			icon: 'utensils',
			order: 1,
			lessons: [
				{
					id: 'nutr-1',
					slug: 'calorie-game',
					title: 'Play: The Calorie Guessing Game',
					description: 'Test your intuition about energy in foods',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 1
				},
				{
					id: 'nutr-2',
					slug: 'macronutrients',
					title: 'Macronutrients',
					description: 'Protein, carbs, and fat—what they do',
					contentType: 'concept',
					estimatedMinutes: 15,
					xpReward: 15,
					order: 2,
					prerequisites: ['nutr-1']
				},
				{
					id: 'nutr-3',
					slug: 'metabolism-myths',
					title: 'Metabolism Myths',
					description: 'What actually affects your metabolic rate',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 3,
					prerequisites: ['nutr-2']
				},
				{
					id: 'nutr-4',
					slug: 'diet-comparison',
					title: 'Diet Wars: The Evidence',
					description: 'Keto, vegan, paleo—what studies actually show',
					contentType: 'concept',
					estimatedMinutes: 15,
					xpReward: 15,
					order: 4,
					prerequisites: ['nutr-3']
				},
				{
					id: 'nutr-5',
					slug: 'plate-builder',
					title: 'Interactive: Build Your Plate',
					description: 'Create balanced meals for different goals',
					contentType: 'interactive',
					estimatedMinutes: 18,
					xpReward: 30,
					order: 5,
					prerequisites: ['nutr-4']
				},
				{
					id: 'nutr-6',
					slug: 'quiz-nutrition',
					title: 'Quiz: Nutrition IQ',
					description: 'Separate fact from marketing',
					contentType: 'practice',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 6,
					prerequisites: ['nutr-5']
				}
			]
		}
	]
};
