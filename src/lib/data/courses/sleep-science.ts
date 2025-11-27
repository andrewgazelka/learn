import type { Course } from '$lib/types/courses';
import SleepIllustration from '$lib/components/illustrations/SleepIllustration.svelte';

export const sleepScienceCourse: Course = {
	id: 'sleep-science',
	slug: 'sleep-science',
	title: 'Sleep Science',
	description: 'The foundation everything else builds on',
	longDescription:
		'Sleep is the single highest-leverage health intervention. Understand sleep architecture, circadian rhythms, and what actually disrupts quality rest. Build a sleep routine that works.',
	difficulty: 'beginner',
	estimatedHours: 2,
	totalXP: 220,
	tags: ['wellness', 'sleep', 'recovery'],
	illustration: SleepIllustration,
	prerequisites: ['body-basics'],
	modules: [
		{
			id: 'sleep-main',
			slug: 'sleep-mastery',
			title: 'Sleep Mastery',
			description: 'Everything about quality rest',
			icon: 'moon',
			order: 1,
			lessons: [
				{
					id: 'sleep-1',
					slug: 'sleep-debt-game',
					title: 'Play: Sleep Debt Simulator',
					description: 'See how sleep deprivation compounds over a week',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 1
				},
				{
					id: 'sleep-2',
					slug: 'sleep-cycles',
					title: 'Sleep Architecture',
					description: 'Light, deep, and REM—what each stage does',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 2,
					prerequisites: ['sleep-1']
				},
				{
					id: 'sleep-3',
					slug: 'circadian-rhythm',
					title: 'Your Internal Clock',
					description: 'Circadian rhythms and why timing matters',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 10,
					order: 3,
					prerequisites: ['sleep-2']
				},
				{
					id: 'sleep-4',
					slug: 'sleep-disruptors',
					title: 'What Ruins Sleep',
					description: 'Light, caffeine, alcohol—the science of disruption',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 4,
					prerequisites: ['sleep-3']
				},
				{
					id: 'sleep-5',
					slug: 'sleep-optimizer',
					title: 'Interactive: Sleep Schedule Builder',
					description: 'Design your optimal sleep routine based on your life',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 30,
					order: 5,
					prerequisites: ['sleep-4']
				},
				{
					id: 'sleep-6',
					slug: 'quiz-sleep',
					title: 'Quiz: Sleep Mastery',
					description: 'Diagnose sleep problems and prescribe evidence-based fixes',
					contentType: 'practice',
					estimatedMinutes: 10,
					xpReward: 25,
					order: 6,
					prerequisites: ['sleep-5']
				}
			]
		}
	]
};
