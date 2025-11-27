import type { Course } from '$lib/types/courses';
import RhetoricIllustration from '$lib/components/illustrations/RhetoricIllustration.svelte';

export const rhetoricCourse: Course = {
	id: 'clear-thinking',
	slug: 'clear-thinking',
	title: 'Clear Thinking',
	description: 'Win arguments against opponents who fight back',
	isGoal: true,
	goalCategory: 'thinking',
	longDescription:
		'Debate opponents who fight back. Build arguments, spot fallacies, and hold your ground under pressure. By the end, you\'ll demolish weak reasoning—including your own.',
	difficulty: 'intermediate',
	estimatedHours: 10,
	totalXP: 1400,
	tags: ['critical-thinking', 'debate', 'logic', 'persuasion', 'simulation'],
	illustration: RhetoricIllustration,
	modules: [
		{
			id: 'rhet-foundations',
			slug: 'foundations',
			title: 'Build Arguments',
			description: 'Construct claims that hold up',
			icon: 'hammer',
			order: 1,
			lessons: [
				{
					id: 'rhet-found-1',
					slug: 'argument-dissection',
					title: 'Sim: Dissect the Argument',
					description: 'Arguments are presented—break them into claims, evidence, warrants',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 1
				},
				{
					id: 'rhet-found-2',
					slug: 'weak-evidence',
					title: 'Sim: Spot Weak Evidence',
					description: 'Claims are made—challenge the support',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 2,
					prerequisites: ['rhet-found-1']
				},
				{
					id: 'rhet-found-3',
					slug: 'hidden-assumptions',
					title: 'Sim: Find the Hidden Assumption',
					description: 'Every argument has one—find it before your opponent does',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 3,
					prerequisites: ['rhet-found-2']
				},
				{
					id: 'rhet-found-4',
					slug: 'build-your-case',
					title: 'Sim: Build Your Case',
					description: 'Construct an argument on a random topic—then defend it',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 35,
					order: 4,
					prerequisites: ['rhet-found-3']
				}
			]
		},
		{
			id: 'rhet-fallacies',
			slug: 'fallacies',
			title: 'Spot Fallacies',
			description: 'Catch bad reasoning in real-time',
			icon: 'alert-triangle',
			order: 2,
			prerequisites: ['rhet-foundations'],
			lessons: [
				{
					id: 'rhet-fall-1',
					slug: 'fallacy-blitz',
					title: 'Sim: Fallacy Blitz',
					description: 'Arguments rapid-fire—call out the fallacies before time runs out',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 30,
					order: 1
				},
				{
					id: 'rhet-fall-2',
					slug: 'straw-man-defense',
					title: 'Sim: Straw Man Defense',
					description: 'Your position gets misrepresented—correct it without losing ground',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 2,
					prerequisites: ['rhet-fall-1']
				},
				{
					id: 'rhet-fall-3',
					slug: 'ad-hominem-counter',
					title: 'Sim: Ad Hominem Counter',
					description: 'You get attacked personally—redirect to the argument',
					contentType: 'interactive',
					estimatedMinutes: 10,
					xpReward: 25,
					order: 3,
					prerequisites: ['rhet-fall-2']
				},
				{
					id: 'rhet-fall-4',
					slug: 'gray-zone-fallacies',
					title: 'Sim: The Gray Zone',
					description: 'Is it a fallacy or valid reasoning? Edge cases presented',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 35,
					order: 4,
					prerequisites: ['rhet-fall-3']
				},
				{
					id: 'rhet-fall-5',
					slug: 'fallacy-warfare',
					title: 'Sim: Fallacy Warfare',
					description: 'Every dirty trick in the book—survive the onslaught',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 40,
					order: 5,
					prerequisites: ['rhet-fall-4']
				}
			]
		},
		{
			id: 'rhet-persuasion',
			slug: 'persuasion',
			title: 'Persuade',
			description: 'Make someone change their mind',
			icon: 'target',
			order: 3,
			prerequisites: ['rhet-fallacies'],
			lessons: [
				{
					id: 'rhet-pers-1',
					slug: 'ethos-challenge',
					title: 'Sim: The Credibility Challenge',
					description: 'Convince a skeptic to trust you',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 30,
					order: 1
				},
				{
					id: 'rhet-pers-2',
					slug: 'pathos-challenge',
					title: 'Sim: The Emotion Challenge',
					description: 'Move someone emotionally without manipulation',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 30,
					order: 2,
					prerequisites: ['rhet-pers-1']
				},
				{
					id: 'rhet-pers-3',
					slug: 'logos-challenge',
					title: 'Sim: The Logic Challenge',
					description: 'Convince a purely rational thinker with airtight reasoning',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 30,
					order: 3,
					prerequisites: ['rhet-pers-2']
				},
				{
					id: 'rhet-pers-4',
					slug: 'resistant-agent',
					title: 'Sim: The Entrenched',
					description: 'Someone deeply committed to their view—change their mind anyway',
					contentType: 'interactive',
					estimatedMinutes: 18,
					xpReward: 40,
					order: 4,
					prerequisites: ['rhet-pers-3']
				}
			]
		},
		{
			id: 'rhet-debate',
			slug: 'debate',
			title: 'Debate',
			description: 'Real-time verbal combat',
			icon: 'swords',
			order: 4,
			prerequisites: ['rhet-persuasion'],
			lessons: [
				{
					id: 'rhet-deb-1',
					slug: 'rapid-rebuttal',
					title: 'Sim: Rapid Rebuttal',
					description: 'You get attacked—30 seconds to counter',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 30,
					order: 1
				},
				{
					id: 'rhet-deb-2',
					slug: 'steelman-then-destroy',
					title: 'Sim: Steelman Then Destroy',
					description: 'Make the argument stronger, then dismantle it anyway',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 35,
					order: 2,
					prerequisites: ['rhet-deb-1']
				},
				{
					id: 'rhet-deb-3',
					slug: 'concede-to-win',
					title: 'Sim: Concede to Win',
					description: 'Give ground strategically to take the high ground',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 30,
					order: 3,
					prerequisites: ['rhet-deb-2']
				},
				{
					id: 'rhet-deb-4',
					slug: 'full-debate-easy',
					title: 'Debate: Easy Opponent',
					description: 'Full structured debate against a novice',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 40,
					order: 4,
					prerequisites: ['rhet-deb-3']
				},
				{
					id: 'rhet-deb-5',
					slug: 'full-debate-hard',
					title: 'Debate: Formidable Opponent',
					description: 'Full debate against an expert debater',
					contentType: 'interactive',
					estimatedMinutes: 25,
					xpReward: 50,
					order: 5,
					prerequisites: ['rhet-deb-4']
				}
			]
		},
		{
			id: 'rhet-socratic',
			slug: 'socratic',
			title: 'Question',
			description: 'Destroy arguments with questions alone',
			icon: 'help-circle',
			order: 5,
			prerequisites: ['rhet-debate'],
			lessons: [
				{
					id: 'rhet-socr-1',
					slug: 'question-attack',
					title: 'Sim: Question Attack',
					description: 'Dismantle the opponent\'s position using only questions',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 30,
					order: 1
				},
				{
					id: 'rhet-socr-2',
					slug: 'assumption-expose',
					title: 'Sim: Expose Assumptions',
					description: 'Ask questions that reveal what\'s being taken for granted',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 30,
					order: 2,
					prerequisites: ['rhet-socr-1']
				},
				{
					id: 'rhet-socr-3',
					slug: 'socratic-trap',
					title: 'Sim: The Socratic Trap',
					description: 'Lead your opponent into contradicting themselves',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 35,
					order: 3,
					prerequisites: ['rhet-socr-2']
				},
				{
					id: 'rhet-socr-4',
					slug: 'survive-socrates',
					title: 'Sim: Survive Socrates',
					description: 'You get questioned—defend your position under cross-examination',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 40,
					order: 4,
					prerequisites: ['rhet-socr-3']
				}
			]
		},
		{
			id: 'rhet-tournament',
			slug: 'tournament',
			title: 'Tournament',
			description: 'Prove your mastery',
			icon: 'trophy',
			order: 6,
			prerequisites: ['rhet-socratic'],
			lessons: [
				{
					id: 'rhet-tourn-1',
					slug: 'devils-advocate',
					title: 'Sim: Devil\'s Advocate',
					description: 'Argue against your actual beliefs—and win',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 45,
					order: 1
				},
				{
					id: 'rhet-tourn-2',
					slug: 'topic-roulette',
					title: 'Sim: Topic Roulette',
					description: 'Random topic, random position, 60 seconds to prep—go',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 40,
					order: 2,
					prerequisites: ['rhet-tourn-1']
				},
				{
					id: 'rhet-tourn-3',
					slug: 'gauntlet',
					title: 'Sim: The Gauntlet',
					description: 'Three opponents in a row, escalating difficulty',
					contentType: 'interactive',
					estimatedMinutes: 30,
					xpReward: 55,
					order: 3,
					prerequisites: ['rhet-tourn-2']
				},
				{
					id: 'rhet-tourn-4',
					slug: 'championship',
					title: 'Sim: Championship',
					description: 'Final boss: the best debater, your hardest topic',
					contentType: 'interactive',
					estimatedMinutes: 25,
					xpReward: 60,
					order: 4,
					prerequisites: ['rhet-tourn-3']
				}
			]
		}
	]
};
