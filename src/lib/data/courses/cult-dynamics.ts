import type { Course } from '$lib/types/courses';
import CultIllustration from '$lib/components/illustrations/CultIllustration.svelte';

export const cultDynamicsCourse: Course = {
	id: 'cult-dynamics',
	slug: 'cult-dynamics',
	title: 'Cult Dynamics',
	description: 'Build a following in a simulated world',
	longDescription:
		'Run your own cult in a simulated world. Recruit followers, manage defectors, and see how far you can push before it collapses. Discover firsthand why certain techniques work—and recognize when they\'re being used on you.',
	difficulty: 'advanced',
	estimatedHours: 4,
	totalXP: 500,
	tags: ['psychology', 'influence', 'social-dynamics', 'leadership', 'simulation'],
	illustration: CultIllustration,
	prerequisites: ['earned-respect', 'clear-thinking'],
	isGoal: true,
	goalCategory: 'social',
	modules: [
		{
			id: 'cult-recruit',
			slug: 'recruitment',
			title: 'Recruitment',
			description: 'Get your first followers',
			icon: 'user-plus',
			order: 1,
			lessons: [
				{
					id: 'cult-rec-1',
					slug: 'first-follower',
					title: 'Sim: Your First Follower',
					description: 'Convince someone to join your cause',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 30,
					order: 1
				},
				{
					id: 'cult-rec-2',
					slug: 'vulnerability-targeting',
					title: 'Sim: Find the Vulnerable',
					description: 'Identify which personalities are susceptible',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 25,
					order: 2,
					prerequisites: ['cult-rec-1']
				},
				{
					id: 'cult-rec-3',
					slug: 'love-bombing',
					title: 'Sim: Love Bombing',
					description: 'Overwhelm new recruits with attention and approval',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 3,
					prerequisites: ['cult-rec-2']
				},
				{
					id: 'cult-rec-4',
					slug: 'us-vs-them',
					title: 'Sim: Create an Enemy',
					description: 'Define an outgroup to strengthen your ingroup',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 4,
					prerequisites: ['cult-rec-3']
				},
				{
					id: 'cult-rec-5',
					slug: 'recruitment-debrief',
					title: 'Debrief: Why It Worked',
					description: 'The BITE model and psychological principles you just used',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 20,
					order: 5,
					prerequisites: ['cult-rec-4']
				}
			]
		},
		{
			id: 'cult-control',
			slug: 'control',
			title: 'Control',
			description: 'Keep them loyal',
			icon: 'lock',
			order: 2,
			prerequisites: ['cult-recruit'],
			lessons: [
				{
					id: 'cult-ctrl-1',
					slug: 'information-control',
					title: 'Sim: Control the Narrative',
					description: 'Limit what your followers see and hear',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 30,
					order: 1
				},
				{
					id: 'cult-ctrl-2',
					slug: 'intermittent-reinforcement',
					title: 'Sim: Hot and Cold',
					description: 'Use unpredictable approval to create addiction',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 2,
					prerequisites: ['cult-ctrl-1']
				},
				{
					id: 'cult-ctrl-3',
					slug: 'sunk-cost',
					title: 'Sim: Raise the Stakes',
					description: 'Make them invest so much they can\'t leave',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 3,
					prerequisites: ['cult-ctrl-2']
				},
				{
					id: 'cult-ctrl-4',
					slug: 'handle-doubters',
					title: 'Sim: Handle Doubters',
					description: 'A follower questions you—respond without losing them',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 30,
					order: 4,
					prerequisites: ['cult-ctrl-3']
				},
				{
					id: 'cult-ctrl-5',
					slug: 'control-debrief',
					title: 'Debrief: The Psychology of Loyalty',
					description: 'Why these techniques create such strong bonds',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 20,
					order: 5,
					prerequisites: ['cult-ctrl-4']
				}
			]
		},
		{
			id: 'cult-collapse',
			slug: 'collapse',
			title: 'Collapse',
			description: 'Watch it fall apart',
			icon: 'trending-down',
			order: 3,
			prerequisites: ['cult-control'],
			lessons: [
				{
					id: 'cult-col-1',
					slug: 'defection',
					title: 'Sim: The First Defector',
					description: 'A follower tries to leave—what do you do?',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 30,
					order: 1
				},
				{
					id: 'cult-col-2',
					slug: 'cascade',
					title: 'Sim: Cascade Failure',
					description: 'One defection triggers others—try to stop the bleeding',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 30,
					order: 2,
					prerequisites: ['cult-col-1']
				},
				{
					id: 'cult-col-3',
					slug: 'true-believers',
					title: 'Sim: The True Believers',
					description: 'Some stay no matter what—understand why',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 3,
					prerequisites: ['cult-col-2']
				},
				{
					id: 'cult-col-4',
					slug: 'aftermath',
					title: 'Sim: The Aftermath',
					description: 'See the damage to your followers\' simulated lives',
					contentType: 'interactive',
					estimatedMinutes: 10,
					xpReward: 25,
					order: 4,
					prerequisites: ['cult-col-3']
				},
				{
					id: 'cult-col-5',
					slug: 'final-debrief',
					title: 'Debrief: Recognizing Manipulation',
					description: 'Now you know the playbook—spot it in the real world',
					contentType: 'concept',
					estimatedMinutes: 15,
					xpReward: 30,
					order: 5,
					prerequisites: ['cult-col-4']
				}
			]
		}
	]
};
