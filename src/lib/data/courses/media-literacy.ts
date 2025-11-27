import type { Course } from '$lib/types/courses';
import MediaLiteracyIllustration from '$lib/components/illustrations/MediaLiteracyIllustration.svelte';

// TODO: Re-enable module prerequisites once all lessons have content implemented
// Currently all modules are unlocked for development/testing

export const mediaLiteracyCourse: Course = {
	id: 'media-literacy',
	slug: 'sensemaking',
	title: 'Sensemaking',
	description: 'Navigate narratives without getting played',
	longDescription:
		'Everyone is trying to shape how you see the world. Through interactive simulations, discover how incentives drive narratives, apply game theory to understand why conflicts persist, and build your own framework for figuring out what\'s actually happening—using the Israel-Gaza conflict as a case study.',
	difficulty: 'intermediate',
	estimatedHours: 10,
	totalXP: 1200,
	tags: ['epistemology', 'game-theory', 'incentives', 'geopolitics'],
	illustration: MediaLiteracyIllustration,
	modules: [
		{
			id: 'ml-incentives',
			slug: 'incentives',
			title: 'The Incentive Game',
			description: 'Why media covers stories the way it does',
			icon: 'newspaper',
			order: 1,
			lessons: [
				{
					id: 'ml-incentives-1',
					slug: 'the-news-game',
					title: 'Play: The News Editor',
					description: 'Run a news outlet and discover what drives coverage',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 25,
					order: 1
				},
				{
					id: 'ml-incentives-2',
					slug: 'attention-economy',
					title: 'The Attention Economy',
					description: 'Why engagement beats accuracy',
					contentType: 'concept',
					estimatedMinutes: 8,
					xpReward: 10,
					order: 2,
					prerequisites: ['ml-incentives-1']
				},
				{
					id: 'ml-incentives-3',
					slug: 'funding-models',
					title: 'Follow the Money',
					description: 'How funding shapes editorial decisions',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 10,
					order: 3,
					prerequisites: ['ml-incentives-2']
				},
				{
					id: 'ml-incentives-4',
					slug: 'quiz-incentives',
					title: 'Quiz: Media Incentives',
					description: 'Test your understanding of media economics',
					contentType: 'practice',
					estimatedMinutes: 8,
					xpReward: 25,
					order: 4,
					prerequisites: ['ml-incentives-3']
				}
			]
		},
		{
			id: 'ml-framing',
			slug: 'framing',
			title: 'The Framing Problem',
			description: 'How the same facts become different stories',
			icon: 'split',
			order: 2,
			lessons: [
				{
					id: 'ml-framing-1',
					slug: 'narrative-simulator',
					title: 'Play: Same Event, Different Stories',
					description: 'See how outlets frame identical events differently',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 30,
					order: 1
				},
				{
					id: 'ml-framing-2',
					slug: 'word-choice',
					title: 'The Power of Word Choice',
					description: '"Terrorists" vs "fighters" vs "militants" — each word is a verdict',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 2,
					prerequisites: ['ml-framing-1']
				},
				{
					id: 'ml-framing-3',
					slug: 'omission',
					title: 'What\'s Missing?',
					description: 'The invisible bias of omission',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 3,
					prerequisites: ['ml-framing-2']
				},
				{
					id: 'ml-framing-4',
					slug: 'quiz-framing',
					title: 'Quiz: Framing Analysis',
					description: 'Identify framing techniques in real headlines',
					contentType: 'practice',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 4,
					prerequisites: ['ml-framing-3']
				}
			]
		},
		{
			id: 'ml-gametheory',
			slug: 'game-theory',
			title: 'Game Theory of Conflict',
			description: 'Why rational actors make "irrational" choices',
			icon: 'swords',
			order: 3,
			lessons: [
				{
					id: 'ml-game-1',
					slug: 'prisoners-dilemma',
					title: 'Play: The Conflict Game',
					description: 'Experience why cooperation is hard through game theory',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 30,
					order: 1
				},
				{
					id: 'ml-game-2',
					slug: 'iterated-games',
					title: 'The Shadow of the Future',
					description: 'Why repeated interactions change everything',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 2,
					prerequisites: ['ml-game-1']
				},
				{
					id: 'ml-game-3',
					slug: 'spoilers',
					title: 'Spoilers and Hardliners',
					description: 'Those who benefit from conflict',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 3,
					prerequisites: ['ml-game-2']
				},
				{
					id: 'ml-game-4',
					slug: 'quiz-gametheory',
					title: 'Quiz: Strategic Thinking',
					description: 'Apply game theory to real scenarios',
					contentType: 'practice',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 4,
					prerequisites: ['ml-game-3']
				}
			]
		},
		{
			id: 'ml-beliefs',
			slug: 'belief-formation',
			title: 'Why People Believe',
			description: 'Information, identity, and incentives',
			icon: 'sparkles',
			order: 4,
			lessons: [
				{
					id: 'ml-belief-1',
					slug: 'belief-mapper',
					title: 'Play: Belief Explorer',
					description: 'Understand different perspectives from the inside',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 30,
					order: 1
				},
				{
					id: 'ml-belief-2',
					slug: 'information-diet',
					title: 'Your Information Diet',
					description: 'How sources shape worldview',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 2,
					prerequisites: ['ml-belief-1']
				},
				{
					id: 'ml-belief-3',
					slug: 'identity-beliefs',
					title: 'Identity and Belief',
					description: 'Why some beliefs feel personal',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 3,
					prerequisites: ['ml-belief-2']
				},
				{
					id: 'ml-belief-4',
					slug: 'steelmanning',
					title: 'Steel Manning',
					description: 'Understanding the strongest version of opposing views',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 4,
					prerequisites: ['ml-belief-3']
				},
				{
					id: 'ml-belief-5',
					slug: 'quiz-beliefs',
					title: 'Quiz: Epistemic Humility',
					description: 'Test your understanding of belief formation',
					contentType: 'practice',
					estimatedMinutes: 10,
					xpReward: 25,
					order: 5,
					prerequisites: ['ml-belief-4']
				}
			]
		},
		{
			id: 'ml-deepdive',
			slug: 'israel-gaza-deep-dive',
			title: 'Deep Dive: Israel-Gaza',
			description: 'Apply all your tools to the hardest case',
			icon: 'map-pin',
			order: 5,
			// TODO: Re-enable prerequisites once all modules have content
			// prerequisites: ['ml-beliefs'],
			lessons: [
				{
					id: 'ml-deep-1',
					slug: 'conflict-deep-dive',
					title: 'The Complete Framework',
					description: 'Stakeholders, framing, game theory, and beliefs in one analysis',
					contentType: 'interactive',
					estimatedMinutes: 45,
					xpReward: 50,
					order: 1
				},
				{
					id: 'ml-deep-2',
					slug: 'stakeholder-analysis',
					title: 'Play: Who Wants What?',
					description: 'Map the true incentives of every major actor',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 30,
					order: 2,
					prerequisites: ['ml-deep-1']
				},
				{
					id: 'ml-deep-3',
					slug: 'your-blind-spots',
					title: 'Your Blind Spots',
					description: 'What you might be missing based on your information diet',
					contentType: 'practice',
					estimatedMinutes: 15,
					xpReward: 25,
					order: 3,
					prerequisites: ['ml-deep-2']
				},
				{
					id: 'ml-deep-4',
					slug: 'synthesis',
					title: 'Building Your Framework',
					description: 'Your personal toolkit for evaluating any conflict coverage',
					contentType: 'practice',
					estimatedMinutes: 15,
					xpReward: 40,
					order: 4,
					prerequisites: ['ml-deep-3']
				}
			]
		}
	]
};
