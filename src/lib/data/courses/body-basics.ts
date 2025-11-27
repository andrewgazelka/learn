import type { Course } from '$lib/types/courses';
import BodyBasicsIllustration from '$lib/components/illustrations/BodyBasicsIllustration.svelte';

export const bodyBasicsCourse: Course = {
	id: 'body-basics',
	slug: 'body-basics',
	title: 'Body Basics',
	description: 'How your body actually works',
	longDescription:
		'Before optimizing, understand the machine. Learn the core principles of how your body maintains balance, adapts to stress, and converts food into energy. This foundation makes everything else click.',
	difficulty: 'beginner',
	estimatedHours: 1,
	totalXP: 150,
	tags: ['wellness', 'biology', 'foundation'],
	illustration: BodyBasicsIllustration,
	modules: [
		{
			id: 'bb-core',
			slug: 'core-systems',
			title: 'Core Systems',
			description: 'The fundamentals of how your body works',
			icon: 'heart-pulse',
			order: 1,
			lessons: [
				{
					id: 'bb-core-1',
					slug: 'homeostasis-game',
					title: 'Play: The Balance Game',
					description: 'See how your body maintains equilibrium',
					contentType: 'interactive',
					estimatedMinutes: 10,
					xpReward: 25,
					order: 1
				},
				{
					id: 'bb-core-2',
					slug: 'energy-systems',
					title: 'Energy In, Energy Out',
					description: 'The basics of metabolism and calories',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 20,
					order: 2,
					prerequisites: ['bb-core-1']
				},
				{
					id: 'bb-core-3',
					slug: 'adaptation',
					title: 'Adaptation & Stress',
					description: 'How your body gets stronger (or weaker)',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 20,
					order: 3,
					prerequisites: ['bb-core-2']
				},
				{
					id: 'bb-core-4',
					slug: 'quiz-basics',
					title: 'Quiz: Body Basics',
					description: 'Test your foundational understanding',
					contentType: 'practice',
					estimatedMinutes: 8,
					xpReward: 25,
					order: 4,
					prerequisites: ['bb-core-3']
				}
			]
		}
	]
};
