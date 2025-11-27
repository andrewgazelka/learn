import type { Course } from '$lib/types/courses';
import PhotographyIllustration from '$lib/components/illustrations/PhotographyIllustration.svelte';

export const photographyCourse: Course = {
	id: 'seeing-light',
	slug: 'seeing-light',
	title: 'Seeing Light',
	description: 'Master exposure, composition, and visual storytelling',
	isGoal: true,
	goalCategory: 'creative',
	longDescription:
		'Stop shooting on auto and start making intentional images. Through interactive simulations, master the exposure triangle, understand how light shapes your subjects, and develop the compositional eye that separates snapshots from photographs.',
	difficulty: 'beginner',
	estimatedHours: 10,
	totalXP: 1100,
	tags: ['visual-arts', 'creativity', 'technical-skills', 'light'],
	illustration: PhotographyIllustration,
	modules: [
		{
			id: 'photo-exposure',
			slug: 'exposure-triangle',
			title: 'The Exposure Triangle',
			description: 'Aperture, shutter speed, and ISO—the three controls',
			icon: 'aperture',
			order: 1,
			lessons: [
				{
					id: 'photo-exp-1',
					slug: 'exposure-game',
					title: 'Play: The Exposure Game',
					description: 'Balance brightness by adjusting three sliders',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 25,
					order: 1
				},
				{
					id: 'photo-exp-2',
					slug: 'aperture-depth',
					title: 'Aperture & Depth of Field',
					description: 'How f-stops control what\'s sharp and what\'s blurry',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 2,
					prerequisites: ['photo-exp-1']
				},
				{
					id: 'photo-exp-3',
					slug: 'shutter-motion',
					title: 'Shutter Speed & Motion',
					description: 'Freeze action or capture blur—your choice',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 3,
					prerequisites: ['photo-exp-2']
				},
				{
					id: 'photo-exp-4',
					slug: 'iso-noise',
					title: 'ISO & Noise',
					description: 'Sensitivity trade-offs in low light',
					contentType: 'concept',
					estimatedMinutes: 8,
					xpReward: 10,
					order: 4,
					prerequisites: ['photo-exp-3']
				},
				{
					id: 'photo-exp-5',
					slug: 'exposure-simulator',
					title: 'Interactive: Exposure Simulator',
					description: 'Achieve target shots by choosing the right settings',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 30,
					order: 5,
					prerequisites: ['photo-exp-4']
				},
				{
					id: 'photo-exp-6',
					slug: 'quiz-exposure',
					title: 'Quiz: Exposure Mastery',
					description: 'Diagnose exposure problems and prescribe solutions',
					contentType: 'practice',
					estimatedMinutes: 10,
					xpReward: 25,
					order: 6,
					prerequisites: ['photo-exp-5']
				}
			]
		},
		{
			id: 'photo-light',
			slug: 'understanding-light',
			title: 'Understanding Light',
			description: 'The raw material of photography',
			icon: 'sun',
			order: 2,
			prerequisites: ['photo-exposure'],
			lessons: [
				{
					id: 'photo-light-1',
					slug: 'light-direction-game',
					title: 'Play: Light Direction',
					description: 'Move the sun and see how shadows transform portraits',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 1
				},
				{
					id: 'photo-light-2',
					slug: 'quality-of-light',
					title: 'Hard vs Soft Light',
					description: 'Why window light looks different from direct sun',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 2,
					prerequisites: ['photo-light-1']
				},
				{
					id: 'photo-light-3',
					slug: 'golden-hour',
					title: 'The Golden Hours',
					description: 'Why timing transforms ordinary scenes',
					contentType: 'concept',
					estimatedMinutes: 8,
					xpReward: 10,
					order: 3,
					prerequisites: ['photo-light-2']
				},
				{
					id: 'photo-light-4',
					slug: 'color-temperature',
					title: 'Color Temperature',
					description: 'Warm, cool, and white balance',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 10,
					order: 4,
					prerequisites: ['photo-light-3']
				},
				{
					id: 'photo-light-5',
					slug: 'light-studio',
					title: 'Interactive: Virtual Light Studio',
					description: 'Position lights to achieve specific moods',
					contentType: 'interactive',
					estimatedMinutes: 18,
					xpReward: 30,
					order: 5,
					prerequisites: ['photo-light-4']
				},
				{
					id: 'photo-light-6',
					slug: 'quiz-light',
					title: 'Quiz: Reading Light',
					description: 'Identify light sources and predict their effects',
					contentType: 'practice',
					estimatedMinutes: 10,
					xpReward: 25,
					order: 6,
					prerequisites: ['photo-light-5']
				}
			]
		},
		{
			id: 'photo-comp',
			slug: 'composition',
			title: 'Composition',
			description: 'Arranging elements to tell a story',
			icon: 'grid',
			order: 3,
			prerequisites: ['photo-light'],
			lessons: [
				{
					id: 'photo-comp-1',
					slug: 'framing-game',
					title: 'Play: The Framing Game',
					description: 'Crop images to find the strongest composition',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 25,
					order: 1
				},
				{
					id: 'photo-comp-2',
					slug: 'rule-of-thirds',
					title: 'Rule of Thirds',
					description: 'The most useful compositional guideline',
					contentType: 'concept',
					estimatedMinutes: 8,
					xpReward: 10,
					order: 2,
					prerequisites: ['photo-comp-1']
				},
				{
					id: 'photo-comp-3',
					slug: 'leading-lines',
					title: 'Leading Lines & Patterns',
					description: 'Guiding the viewer\'s eye through the frame',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 10,
					order: 3,
					prerequisites: ['photo-comp-2']
				},
				{
					id: 'photo-comp-4',
					slug: 'negative-space',
					title: 'Negative Space',
					description: 'The power of what you leave out',
					contentType: 'concept',
					estimatedMinutes: 8,
					xpReward: 10,
					order: 4,
					prerequisites: ['photo-comp-3']
				},
				{
					id: 'photo-comp-5',
					slug: 'breaking-rules',
					title: 'Breaking the Rules',
					description: 'When centering works and when to go asymmetric',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 5,
					prerequisites: ['photo-comp-4']
				},
				{
					id: 'photo-comp-6',
					slug: 'composition-challenge',
					title: 'Interactive: Composition Challenge',
					description: 'Analyze famous photos and recreate their structure',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 30,
					order: 6,
					prerequisites: ['photo-comp-5']
				},
				{
					id: 'photo-comp-7',
					slug: 'quiz-composition',
					title: 'Quiz: Compositional Eye',
					description: 'Identify techniques and suggest improvements',
					contentType: 'practice',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 7,
					prerequisites: ['photo-comp-6']
				}
			]
		},
		{
			id: 'photo-story',
			slug: 'visual-storytelling',
			title: 'Visual Storytelling',
			description: 'From technical skill to artistic vision',
			icon: 'book-open',
			order: 4,
			prerequisites: ['photo-comp'],
			lessons: [
				{
					id: 'photo-story-1',
					slug: 'moment-game',
					title: 'Play: Capture the Moment',
					description: 'Time your shots to catch peak action and emotion',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 25,
					order: 1
				},
				{
					id: 'photo-story-2',
					slug: 'decisive-moment',
					title: 'The Decisive Moment',
					description: 'Anticipation and timing in photography',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 2,
					prerequisites: ['photo-story-1']
				},
				{
					id: 'photo-story-3',
					slug: 'context-story',
					title: 'Context & Environment',
					description: 'How background tells the story',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 10,
					order: 3,
					prerequisites: ['photo-story-2']
				},
				{
					id: 'photo-story-4',
					slug: 'series-sequence',
					title: 'Photo Series',
					description: 'Telling stories across multiple images',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 4,
					prerequisites: ['photo-story-3']
				},
				{
					id: 'photo-story-5',
					slug: 'story-builder',
					title: 'Interactive: Story Builder',
					description: 'Sequence photos to create a narrative',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 35,
					order: 5,
					prerequisites: ['photo-story-4']
				},
				{
					id: 'photo-story-6',
					slug: 'quiz-final',
					title: 'Final: Photography Integration',
					description: 'Combine exposure, light, composition, and story',
					contentType: 'practice',
					estimatedMinutes: 15,
					xpReward: 40,
					order: 6,
					prerequisites: ['photo-story-5']
				}
			]
		}
	]
};
