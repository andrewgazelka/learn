import type { Course } from '$lib/types/courses';
import StressIllustration from '$lib/components/illustrations/StressIllustration.svelte';

export const stressRecoveryCourse: Course = {
	id: 'stress-recovery',
	slug: 'stress-recovery',
	title: 'Stress & Recovery',
	description: 'Managing the modern epidemic',
	longDescription:
		'Chronic stress damages everything. Understand your nervous system, recognize stress patterns, and learn evidence-based techniques that actually shift you into recovery mode.',
	difficulty: 'beginner',
	estimatedHours: 2,
	totalXP: 230,
	tags: ['wellness', 'stress', 'recovery', 'mental-health'],
	illustration: StressIllustration,
	prerequisites: ['body-basics'],
	modules: [
		{
			id: 'stress-main',
			slug: 'stress-management',
			title: 'Stress Management',
			description: 'Understanding and managing stress',
			icon: 'brain',
			order: 1,
			lessons: [
				{
					id: 'stress-1',
					slug: 'stress-response-sim',
					title: 'Play: Stress Response Simulator',
					description: 'Experience how chronic stress affects your systems',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 25,
					order: 1
				},
				{
					id: 'stress-2',
					slug: 'nervous-system',
					title: 'Your Nervous System',
					description: 'Fight-or-flight vs rest-and-digest',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 2,
					prerequisites: ['stress-1']
				},
				{
					id: 'stress-3',
					slug: 'chronic-stress',
					title: 'Chronic Stress Effects',
					description: 'How ongoing stress damages health',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 3,
					prerequisites: ['stress-2']
				},
				{
					id: 'stress-4',
					slug: 'recovery-methods',
					title: 'Evidence-Based Recovery',
					description: 'What actually works for stress reduction',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 4,
					prerequisites: ['stress-3']
				},
				{
					id: 'stress-5',
					slug: 'breathing-lab',
					title: 'Interactive: Breathing Lab',
					description: 'Practice techniques that activate parasympathetic response',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 30,
					order: 5,
					prerequisites: ['stress-4']
				},
				{
					id: 'stress-6',
					slug: 'quiz-stress',
					title: 'Quiz: Stress Management',
					description: 'Identify stressors and prescribe interventions',
					contentType: 'practice',
					estimatedMinutes: 10,
					xpReward: 25,
					order: 6,
					prerequisites: ['stress-5']
				}
			]
		}
	]
};
