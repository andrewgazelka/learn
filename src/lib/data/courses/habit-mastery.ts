import type { Course } from '$lib/types/courses';
import HabitIllustration from '$lib/components/illustrations/HabitIllustration.svelte';

export const habitMasteryCourse: Course = {
	id: 'habit-mastery',
	slug: 'habit-mastery',
	title: 'Habit Mastery',
	description: 'From knowledge to lasting change',
	longDescription:
		'Knowing what to do is easy. Actually doing it is hard. Master the science of habit formation, environment design, and behavior change. Turn your health knowledge into automatic daily actions.',
	difficulty: 'intermediate',
	estimatedHours: 2,
	totalXP: 270,
	tags: ['wellness', 'habits', 'behavior-change', 'psychology'],
	illustration: HabitIllustration,
	prerequisites: ['training-health', 'training-aesthetics'],
	isGoal: true,
	goalCategory: 'fitness',
	modules: [
		{
			id: 'habit-main',
			slug: 'building-habits',
			title: 'Building Lasting Habits',
			description: 'The science of behavior change',
			icon: 'repeat',
			order: 1,
			lessons: [
				{
					id: 'habit-1',
					slug: 'habit-loop-game',
					title: 'Play: The Habit Loop',
					description: 'See how cue-routine-reward shapes behavior',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 1
				},
				{
					id: 'habit-2',
					slug: 'habit-science',
					title: 'The Science of Habits',
					description: 'Why willpower fails and systems succeed',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 2,
					prerequisites: ['habit-1']
				},
				{
					id: 'habit-3',
					slug: 'environment-design',
					title: 'Environment Design',
					description: 'Making good choices the default',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 3,
					prerequisites: ['habit-2']
				},
				{
					id: 'habit-4',
					slug: 'habit-stacking',
					title: 'Habit Stacking',
					description: 'Attaching new behaviors to existing routines',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 4,
					prerequisites: ['habit-3']
				},
				{
					id: 'habit-5',
					slug: 'identity-habits',
					title: 'Identity-Based Habits',
					description: 'Becoming vs doing',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 20,
					order: 5,
					prerequisites: ['habit-4']
				},
				{
					id: 'habit-6',
					slug: 'habit-designer',
					title: 'Interactive: Habit Designer',
					description: 'Create implementation intentions for your goals',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 35,
					order: 6,
					prerequisites: ['habit-5']
				},
				{
					id: 'habit-7',
					slug: 'quiz-habits',
					title: 'Quiz: Habit Mastery',
					description: 'Design effective behavior change strategies',
					contentType: 'practice',
					estimatedMinutes: 12,
					xpReward: 30,
					order: 7,
					prerequisites: ['habit-6']
				}
			]
		}
	]
};
