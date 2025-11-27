import type { Course } from '$lib/types/courses';
import CharacterIllustration from '$lib/components/illustrations/CharacterIllustration.svelte';

export const characterCourse: Course = {
	id: 'character-fundamentals',
	slug: 'character',
	title: 'Character & Integrity',
	description: 'Become someone others trust and respect',
	longDescription:
		'Earning respect isn\'t about tricks—it\'s about consistent character. Through AI-powered social simulations, navigate difficult conversations, handle betrayals wisely, and practice the principles that make people naturally trust and follow you. Role-play scenarios where your choices shape how AI characters perceive and treat you.',
	difficulty: 'intermediate',
	estimatedHours: 12,
	totalXP: 1450,
	tags: ['leadership', 'ethics', 'social-skills', 'integrity', 'ai-powered'],
	illustration: CharacterIllustration,
	modules: [
		{
			id: 'char-trust',
			slug: 'building-trust',
			title: 'Building Trust',
			description: 'The foundation of all influence',
			icon: 'shield',
			order: 1,
			lessons: [
				{
					id: 'char-trust-1',
					slug: 'trust-game',
					title: 'Play: The Trust Game',
					description: 'See how your actions compound into reputation over time',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 25,
					order: 1
				},
				{
					id: 'char-trust-2',
					slug: 'trust-equation',
					title: 'The Trust Equation',
					description: 'Credibility, reliability, intimacy, and self-orientation',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 2,
					prerequisites: ['char-trust-1']
				},
				{
					id: 'char-trust-3',
					slug: 'consistency',
					title: 'The Power of Consistency',
					description: 'Why small actions matter more than grand gestures',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 3,
					prerequisites: ['char-trust-2']
				},
				{
					id: 'char-trust-4',
					slug: 'vulnerability-strength',
					title: 'Vulnerability as Strength',
					description: 'When admitting weakness builds respect',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 4,
					prerequisites: ['char-trust-3']
				},
				{
					id: 'char-trust-5',
					slug: 'ai-trust-sim',
					title: 'AI Sim: New Team Member',
					description: 'Navigate your first month with AI colleagues—build or destroy trust',
					contentType: 'interactive',
					estimatedMinutes: 25,
					xpReward: 40,
					order: 5,
					prerequisites: ['char-trust-4']
				},
				{
					id: 'char-trust-6',
					slug: 'quiz-trust',
					title: 'Quiz: Trust Principles',
					description: 'Diagnose trust issues and prescribe fixes',
					contentType: 'practice',
					estimatedMinutes: 10,
					xpReward: 25,
					order: 6,
					prerequisites: ['char-trust-5']
				}
			]
		},
		{
			id: 'char-difficult',
			slug: 'difficult-conversations',
			title: 'Difficult Conversations',
			description: 'Handling conflict without burning bridges',
			icon: 'message-circle',
			order: 2,
			prerequisites: ['char-trust'],
			lessons: [
				{
					id: 'char-diff-1',
					slug: 'confrontation-game',
					title: 'Play: Confrontation Roulette',
					description: 'Practice delivering hard truths in different styles',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 25,
					order: 1
				},
				{
					id: 'char-diff-2',
					slug: 'radical-candor',
					title: 'Radical Candor',
					description: 'Caring personally while challenging directly',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 2,
					prerequisites: ['char-diff-1']
				},
				{
					id: 'char-diff-3',
					slug: 'nonviolent-comm',
					title: 'Nonviolent Communication',
					description: 'Observations, feelings, needs, and requests',
					contentType: 'concept',
					estimatedMinutes: 15,
					xpReward: 20,
					order: 3,
					prerequisites: ['char-diff-2']
				},
				{
					id: 'char-diff-4',
					slug: 'defensiveness',
					title: 'Managing Defensiveness',
					description: 'Yours and theirs',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 4,
					prerequisites: ['char-diff-3']
				},
				{
					id: 'char-diff-5',
					slug: 'ai-hard-convo',
					title: 'AI Sim: The Hard Conversation',
					description: 'Role-play firing, confronting, or disappointing AI characters',
					contentType: 'interactive',
					estimatedMinutes: 25,
					xpReward: 40,
					order: 5,
					prerequisites: ['char-diff-4']
				},
				{
					id: 'char-diff-6',
					slug: 'quiz-difficult',
					title: 'Quiz: Conversation Strategies',
					description: 'Choose the right approach for each scenario',
					contentType: 'practice',
					estimatedMinutes: 10,
					xpReward: 25,
					order: 6,
					prerequisites: ['char-diff-5']
				}
			]
		},
		{
			id: 'char-betrayal',
			slug: 'handling-betrayal',
			title: 'Handling Betrayal',
			description: 'Responding to bad actors without becoming one',
			icon: 'shield-off',
			order: 3,
			prerequisites: ['char-difficult'],
			lessons: [
				{
					id: 'char-betr-1',
					slug: 'betrayal-game',
					title: 'Play: The Betrayal Response',
					description: 'React to AI characters who have wronged you—see consequences',
					contentType: 'interactive',
					estimatedMinutes: 18,
					xpReward: 30,
					order: 1
				},
				{
					id: 'char-betr-2',
					slug: 'tit-for-tat',
					title: 'Tit for Tat and Forgiveness',
					description: 'Game theory of retaliation and reconciliation',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 20,
					order: 2,
					prerequisites: ['char-betr-1']
				},
				{
					id: 'char-betr-3',
					slug: 'reputation-protection',
					title: 'Protecting Your Reputation',
					description: 'Responding to attacks without escalating',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 3,
					prerequisites: ['char-betr-2']
				},
				{
					id: 'char-betr-4',
					slug: 'boundaries-consequences',
					title: 'Boundaries & Consequences',
					description: 'When to cut people off vs give second chances',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 4,
					prerequisites: ['char-betr-3']
				},
				{
					id: 'char-betr-5',
					slug: 'ai-office-politics',
					title: 'AI Sim: Office Politics',
					description: 'Navigate AI colleagues with hidden agendas and competing interests',
					contentType: 'interactive',
					estimatedMinutes: 30,
					xpReward: 45,
					order: 5,
					prerequisites: ['char-betr-4']
				},
				{
					id: 'char-betr-6',
					slug: 'quiz-betrayal',
					title: 'Quiz: Strategic Responses',
					description: 'Evaluate responses to betrayal scenarios',
					contentType: 'practice',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 6,
					prerequisites: ['char-betr-5']
				}
			]
		},
		{
			id: 'char-leadership',
			slug: 'earned-leadership',
			title: 'Earned Leadership',
			description: 'Influence without authority',
			icon: 'users',
			order: 4,
			prerequisites: ['char-betrayal'],
			lessons: [
				{
					id: 'char-lead-1',
					slug: 'influence-game',
					title: 'Play: The Influence Network',
					description: 'Build coalitions among AI characters with different motivations',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 30,
					order: 1
				},
				{
					id: 'char-lead-2',
					slug: 'servant-leadership',
					title: 'Servant Leadership',
					description: 'Leading by making others successful',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 2,
					prerequisites: ['char-lead-1']
				},
				{
					id: 'char-lead-3',
					slug: 'giving-credit',
					title: 'Giving Credit Strategically',
					description: 'How sharing success multiplies your influence',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 3,
					prerequisites: ['char-lead-2']
				},
				{
					id: 'char-lead-4',
					slug: 'standing-ground',
					title: 'Standing Your Ground',
					description: 'When to hold firm vs when to compromise',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 4,
					prerequisites: ['char-lead-3']
				},
				{
					id: 'char-lead-5',
					slug: 'ai-team-crisis',
					title: 'AI Sim: Team Crisis',
					description: 'Lead AI team members through a crisis with no formal authority',
					contentType: 'interactive',
					estimatedMinutes: 30,
					xpReward: 45,
					order: 5,
					prerequisites: ['char-lead-4']
				},
				{
					id: 'char-lead-6',
					slug: 'quiz-leadership',
					title: 'Quiz: Influence Principles',
					description: 'Identify effective vs manipulative leadership',
					contentType: 'practice',
					estimatedMinutes: 10,
					xpReward: 25,
					order: 6,
					prerequisites: ['char-lead-5']
				}
			]
		},
		{
			id: 'char-integrity',
			slug: 'integrity-under-pressure',
			title: 'Integrity Under Pressure',
			description: 'When doing right costs something',
			icon: 'anchor',
			order: 5,
			prerequisites: ['char-leadership'],
			lessons: [
				{
					id: 'char-integ-1',
					slug: 'pressure-game',
					title: 'Play: The Pressure Cooker',
					description: 'Face escalating ethical dilemmas with real consequences',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 35,
					order: 1
				},
				{
					id: 'char-integ-2',
					slug: 'slippery-slope',
					title: 'The Slippery Slope',
					description: 'How small compromises lead to big ones',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 20,
					order: 2,
					prerequisites: ['char-integ-1']
				},
				{
					id: 'char-integ-3',
					slug: 'whistleblowing',
					title: 'When to Speak Up',
					description: 'Calculating the ethics and costs of disclosure',
					contentType: 'concept',
					estimatedMinutes: 15,
					xpReward: 20,
					order: 3,
					prerequisites: ['char-integ-2']
				},
				{
					id: 'char-integ-4',
					slug: 'living-values',
					title: 'Living Your Values',
					description: 'From abstract principles to daily decisions',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 4,
					prerequisites: ['char-integ-3']
				},
				{
					id: 'char-integ-5',
					slug: 'ai-ethical-dilemma',
					title: 'AI Sim: The Ethical Gauntlet',
					description: 'Navigate a multi-week simulation where your choices compound',
					contentType: 'interactive',
					estimatedMinutes: 35,
					xpReward: 50,
					order: 5,
					prerequisites: ['char-integ-4']
				},
				{
					id: 'char-integ-6',
					slug: 'quiz-integrity',
					title: 'Quiz: Integrity Check',
					description: 'Evaluate ethical reasoning in complex scenarios',
					contentType: 'practice',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 6,
					prerequisites: ['char-integ-5']
				}
			]
		},
		{
			id: 'char-synthesis',
			slug: 'character-synthesis',
			title: 'Character Synthesis',
			description: 'Becoming the person you want to be',
			icon: 'star',
			order: 6,
			prerequisites: ['char-integrity'],
			lessons: [
				{
					id: 'char-synth-1',
					slug: 'life-sim-intro',
					title: 'AI Sim: Life Scenario',
					description: 'Extended simulation integrating all character skills',
					contentType: 'interactive',
					estimatedMinutes: 40,
					xpReward: 55,
					order: 1
				},
				{
					id: 'char-synth-2',
					slug: 'character-reflection',
					title: 'AI Lab: Character Reflection',
					description: 'AI analyzes patterns in your choices across all simulations',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 35,
					order: 2,
					prerequisites: ['char-synth-1']
				},
				{
					id: 'char-synth-3',
					slug: 'growth-plan',
					title: 'Building Your Growth Plan',
					description: 'From insights to actionable change',
					contentType: 'concept',
					estimatedMinutes: 15,
					xpReward: 20,
					order: 3,
					prerequisites: ['char-synth-2']
				},
				{
					id: 'char-synth-4',
					slug: 'final-sim',
					title: 'AI Tournament: Character Challenge',
					description: 'Final simulation testing all aspects of character under pressure',
					contentType: 'interactive',
					estimatedMinutes: 45,
					xpReward: 60,
					order: 4,
					prerequisites: ['char-synth-3']
				},
				{
					id: 'char-synth-5',
					slug: 'quiz-final-character',
					title: 'Final: Character Mastery',
					description: 'Comprehensive assessment of character principles',
					contentType: 'practice',
					estimatedMinutes: 18,
					xpReward: 45,
					order: 5,
					prerequisites: ['char-synth-4']
				}
			]
		}
	]
};
