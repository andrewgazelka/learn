import type { Course } from '$lib/types/courses';
import RhetoricIllustration from '$lib/components/illustrations/RhetoricIllustration.svelte';

export const rhetoricCourse: Course = {
	id: 'rhetoric-fundamentals',
	slug: 'rhetoric',
	title: 'Rhetoric & Argumentation',
	description: 'Persuade, debate, and think critically',
	longDescription:
		'Master the ancient art of persuasion updated for the modern world. Through AI-powered debate practice, real-time argument analysis, and Socratic dialogue, learn to construct bulletproof arguments, identify logical fallacies, and hold your own in any intellectual exchange.',
	difficulty: 'intermediate',
	estimatedHours: 14,
	totalXP: 1600,
	tags: ['critical-thinking', 'debate', 'logic', 'persuasion', 'ai-powered'],
	illustration: RhetoricIllustration,
	modules: [
		{
			id: 'rhet-foundations',
			slug: 'foundations',
			title: 'Foundations of Argument',
			description: 'The building blocks of persuasion',
			icon: 'layers',
			order: 1,
			lessons: [
				{
					id: 'rhet-found-1',
					slug: 'argument-anatomy-game',
					title: 'Play: Argument Anatomy',
					description: 'Dissect arguments into claims, evidence, and warrants',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 25,
					order: 1
				},
				{
					id: 'rhet-found-2',
					slug: 'claims-evidence',
					title: 'Claims & Evidence',
					description: 'What makes support actually support?',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 2,
					prerequisites: ['rhet-found-1']
				},
				{
					id: 'rhet-found-3',
					slug: 'warrants',
					title: 'The Hidden Warrant',
					description: 'The assumptions that connect evidence to claims',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 3,
					prerequisites: ['rhet-found-2']
				},
				{
					id: 'rhet-found-4',
					slug: 'ai-argument-builder',
					title: 'AI Lab: Build an Argument',
					description: 'Write your own argument and get AI feedback on its structure',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 35,
					order: 4,
					prerequisites: ['rhet-found-3']
				},
				{
					id: 'rhet-found-5',
					slug: 'quiz-foundations',
					title: 'Quiz: Argument Structure',
					description: 'Identify components and evaluate strength',
					contentType: 'practice',
					estimatedMinutes: 10,
					xpReward: 25,
					order: 5,
					prerequisites: ['rhet-found-4']
				}
			]
		},
		{
			id: 'rhet-fallacies',
			slug: 'logical-fallacies',
			title: 'Logical Fallacies',
			description: 'Recognizing (and avoiding) bad reasoning',
			icon: 'alert-triangle',
			order: 2,
			prerequisites: ['rhet-foundations'],
			lessons: [
				{
					id: 'rhet-fall-1',
					slug: 'fallacy-spotter-game',
					title: 'Play: Fallacy Spotter',
					description: 'Race to identify fallacies in real-world arguments',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 25,
					order: 1
				},
				{
					id: 'rhet-fall-2',
					slug: 'formal-fallacies',
					title: 'Formal Fallacies',
					description: 'When the logic itself is broken',
					contentType: 'concept',
					estimatedMinutes: 15,
					xpReward: 15,
					order: 2,
					prerequisites: ['rhet-fall-1']
				},
				{
					id: 'rhet-fall-3',
					slug: 'informal-fallacies',
					title: 'Informal Fallacies',
					description: 'Ad hominem, straw man, and their friends',
					contentType: 'concept',
					estimatedMinutes: 18,
					xpReward: 20,
					order: 3,
					prerequisites: ['rhet-fall-2']
				},
				{
					id: 'rhet-fall-4',
					slug: 'fallacy-gray-zones',
					title: 'The Gray Zones',
					description: 'When "fallacies" are actually valid reasoning',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 20,
					order: 4,
					prerequisites: ['rhet-fall-3']
				},
				{
					id: 'rhet-fall-5',
					slug: 'ai-fallacy-challenge',
					title: 'AI Challenge: Fallacy Defense',
					description: 'AI throws fallacious arguments at you—identify and counter them',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 40,
					order: 5,
					prerequisites: ['rhet-fall-4']
				},
				{
					id: 'rhet-fall-6',
					slug: 'quiz-fallacies',
					title: 'Quiz: Fallacy Master',
					description: 'Name, explain, and demonstrate fallacies',
					contentType: 'practice',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 6,
					prerequisites: ['rhet-fall-5']
				}
			]
		},
		{
			id: 'rhet-ethos-pathos',
			slug: 'modes-of-persuasion',
			title: 'Modes of Persuasion',
			description: 'Ethos, pathos, logos—and when to use each',
			icon: 'target',
			order: 3,
			prerequisites: ['rhet-fallacies'],
			lessons: [
				{
					id: 'rhet-modes-1',
					slug: 'speech-analyzer-game',
					title: 'Play: Speech Analyzer',
					description: 'Tag famous speeches by their persuasive techniques',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 25,
					order: 1
				},
				{
					id: 'rhet-modes-2',
					slug: 'ethos',
					title: 'Ethos: Credibility',
					description: 'Why we believe who we trust',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 2,
					prerequisites: ['rhet-modes-1']
				},
				{
					id: 'rhet-modes-3',
					slug: 'pathos',
					title: 'Pathos: Emotion',
					description: 'The legitimate (and illegitimate) role of feelings',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 3,
					prerequisites: ['rhet-modes-2']
				},
				{
					id: 'rhet-modes-4',
					slug: 'logos',
					title: 'Logos: Logic',
					description: 'When reason reigns supreme',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 4,
					prerequisites: ['rhet-modes-3']
				},
				{
					id: 'rhet-modes-5',
					slug: 'ai-persuasion-lab',
					title: 'AI Lab: Write to Persuade',
					description: 'Write persuasive pieces targeting different modes—get AI critique',
					contentType: 'interactive',
					estimatedMinutes: 25,
					xpReward: 40,
					order: 5,
					prerequisites: ['rhet-modes-4']
				},
				{
					id: 'rhet-modes-6',
					slug: 'quiz-modes',
					title: 'Quiz: Persuasion Toolkit',
					description: 'Match techniques to situations',
					contentType: 'practice',
					estimatedMinutes: 10,
					xpReward: 25,
					order: 6,
					prerequisites: ['rhet-modes-5']
				}
			]
		},
		{
			id: 'rhet-debate',
			slug: 'debate-practice',
			title: 'Debate Practice',
			description: 'Real-time argument under pressure',
			icon: 'message-square',
			order: 4,
			prerequisites: ['rhet-ethos-pathos'],
			lessons: [
				{
					id: 'rhet-debate-1',
					slug: 'rapid-rebuttal-game',
					title: 'Play: Rapid Rebuttal',
					description: 'Practice quick counter-arguments against AI positions',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 30,
					order: 1
				},
				{
					id: 'rhet-debate-2',
					slug: 'steelmanning-debate',
					title: 'The Steel Man',
					description: 'Strengthen opposing arguments before attacking them',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 20,
					order: 2,
					prerequisites: ['rhet-debate-1']
				},
				{
					id: 'rhet-debate-3',
					slug: 'concession-strategy',
					title: 'Strategic Concession',
					description: 'When agreeing makes you stronger',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 3,
					prerequisites: ['rhet-debate-2']
				},
				{
					id: 'rhet-debate-4',
					slug: 'burden-of-proof',
					title: 'Burden of Proof',
					description: 'Who needs to prove what?',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 4,
					prerequisites: ['rhet-debate-3']
				},
				{
					id: 'rhet-debate-5',
					slug: 'ai-debate-arena',
					title: 'AI Arena: Full Debate',
					description: 'Debate the AI on a topic—receive scored feedback',
					contentType: 'interactive',
					estimatedMinutes: 30,
					xpReward: 50,
					order: 5,
					prerequisites: ['rhet-debate-4']
				},
				{
					id: 'rhet-debate-6',
					slug: 'quiz-debate',
					title: 'Quiz: Debate Tactics',
					description: 'Choose optimal responses to debate situations',
					contentType: 'practice',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 6,
					prerequisites: ['rhet-debate-5']
				}
			]
		},
		{
			id: 'rhet-socratic',
			slug: 'socratic-method',
			title: 'Socratic Method',
			description: 'Finding truth through questions',
			icon: 'help-circle',
			order: 5,
			prerequisites: ['rhet-debate'],
			lessons: [
				{
					id: 'rhet-socr-1',
					slug: 'question-game',
					title: 'Play: The Question Game',
					description: 'Ask questions that reveal hidden assumptions',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 30,
					order: 1
				},
				{
					id: 'rhet-socr-2',
					slug: 'maieutics',
					title: 'Maieutics: Intellectual Midwifery',
					description: 'Helping others discover what they already know',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 2,
					prerequisites: ['rhet-socr-1']
				},
				{
					id: 'rhet-socr-3',
					slug: 'elenchus',
					title: 'Elenchus: The Cross-Examination',
					description: 'Testing beliefs through systematic questioning',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 3,
					prerequisites: ['rhet-socr-2']
				},
				{
					id: 'rhet-socr-4',
					slug: 'question-types',
					title: 'Types of Socratic Questions',
					description: 'Clarifying, probing, and assumption-testing',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 4,
					prerequisites: ['rhet-socr-3']
				},
				{
					id: 'rhet-socr-5',
					slug: 'ai-socratic-dialogue',
					title: 'AI Lab: Socratic Dialogue',
					description: 'Practice questioning the AI (and being questioned) on tough topics',
					contentType: 'interactive',
					estimatedMinutes: 25,
					xpReward: 45,
					order: 5,
					prerequisites: ['rhet-socr-4']
				},
				{
					id: 'rhet-socr-6',
					slug: 'quiz-socratic',
					title: 'Quiz: Question Mastery',
					description: 'Craft the perfect question for each situation',
					contentType: 'practice',
					estimatedMinutes: 10,
					xpReward: 25,
					order: 6,
					prerequisites: ['rhet-socr-5']
				}
			]
		},
		{
			id: 'rhet-synthesis',
			slug: 'synthesis',
			title: 'Synthesis & Mastery',
			description: 'Putting it all together',
			icon: 'award',
			order: 6,
			prerequisites: ['rhet-socratic'],
			lessons: [
				{
					id: 'rhet-synth-1',
					slug: 'position-paper',
					title: 'AI Lab: Position Paper',
					description: 'Write a full argument on a controversial topic—get comprehensive feedback',
					contentType: 'interactive',
					estimatedMinutes: 35,
					xpReward: 50,
					order: 1
				},
				{
					id: 'rhet-synth-2',
					slug: 'devils-advocate',
					title: 'AI Arena: Devil\'s Advocate',
					description: 'Argue the opposite of your actual beliefs convincingly',
					contentType: 'interactive',
					estimatedMinutes: 25,
					xpReward: 45,
					order: 2,
					prerequisites: ['rhet-synth-1']
				},
				{
					id: 'rhet-synth-3',
					slug: 'real-world-analysis',
					title: 'AI Lab: Real-World Rhetoric',
					description: 'Analyze a current debate—identify all techniques and fallacies',
					contentType: 'interactive',
					estimatedMinutes: 30,
					xpReward: 45,
					order: 3,
					prerequisites: ['rhet-synth-2']
				},
				{
					id: 'rhet-synth-4',
					slug: 'tournament-mode',
					title: 'AI Tournament: Debate Championship',
					description: 'Multiple rounds of debate on escalating difficulty topics',
					contentType: 'interactive',
					estimatedMinutes: 40,
					xpReward: 60,
					order: 4,
					prerequisites: ['rhet-synth-3']
				},
				{
					id: 'rhet-synth-5',
					slug: 'quiz-final-rhetoric',
					title: 'Final: Rhetoric Mastery',
					description: 'Comprehensive test of all rhetorical skills',
					contentType: 'practice',
					estimatedMinutes: 20,
					xpReward: 50,
					order: 5,
					prerequisites: ['rhet-synth-4']
				}
			]
		}
	]
};
