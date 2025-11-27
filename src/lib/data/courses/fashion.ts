import type { Course } from '$lib/types/courses';
import FashionIllustration from '$lib/components/illustrations/FashionIllustration.svelte';

export const fashionCourse: Course = {
	id: 'visual-style',
	slug: 'visual-style',
	title: 'Visual Style',
	description: 'Develop your personal style through understanding',
	isGoal: true,
	goalCategory: 'creative',
	longDescription:
		'Move beyond "I don\'t know what looks good" to understanding why certain combinations work. Through interactive styling games, discover the principles of color theory, proportion, and silhouette that underpin all great outfits—then build a wardrobe that actually works for you.',
	difficulty: 'beginner',
	estimatedHours: 8,
	totalXP: 950,
	tags: ['style', 'color-theory', 'wardrobe', 'personal-development'],
	illustration: FashionIllustration,
	modules: [
		{
			id: 'fash-color',
			slug: 'color-theory',
			title: 'Color Theory for Style',
			description: 'Why some colors make you look amazing and others wash you out',
			icon: 'palette',
			order: 1,
			lessons: [
				{
					id: 'fash-color-1',
					slug: 'color-matching-game',
					title: 'Play: The Color Game',
					description: 'Match outfits and discover what your eye naturally likes',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 1
				},
				{
					id: 'fash-color-2',
					slug: 'color-wheel-basics',
					title: 'The Color Wheel',
					description: 'Complementary, analogous, and triadic—the science of harmony',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 10,
					order: 2,
					prerequisites: ['fash-color-1']
				},
				{
					id: 'fash-color-3',
					slug: 'undertones',
					title: 'Your Undertones',
					description: 'Warm, cool, or neutral—and why it matters',
					contentType: 'concept',
					estimatedMinutes: 8,
					xpReward: 10,
					order: 3,
					prerequisites: ['fash-color-2']
				},
				{
					id: 'fash-color-4',
					slug: 'seasonal-analysis',
					title: 'Interactive: Find Your Season',
					description: 'Discover your optimal color palette through comparison',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 30,
					order: 4,
					prerequisites: ['fash-color-3']
				},
				{
					id: 'fash-color-5',
					slug: 'quiz-color',
					title: 'Quiz: Color Mastery',
					description: 'Test your understanding of color principles',
					contentType: 'practice',
					estimatedMinutes: 8,
					xpReward: 25,
					order: 5,
					prerequisites: ['fash-color-4']
				}
			]
		},
		{
			id: 'fash-proportion',
			slug: 'proportion',
			title: 'Proportion & Silhouette',
			description: 'The geometry of looking good',
			icon: 'ruler',
			order: 2,
			prerequisites: ['fash-color'],
			lessons: [
				{
					id: 'fash-prop-1',
					slug: 'silhouette-game',
					title: 'Play: Silhouette Builder',
					description: 'Mix and match tops and bottoms to see what balances',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 25,
					order: 1
				},
				{
					id: 'fash-prop-2',
					slug: 'body-geometry',
					title: 'Understanding Proportions',
					description: 'The visual weight of different shapes and cuts',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 10,
					order: 2,
					prerequisites: ['fash-prop-1']
				},
				{
					id: 'fash-prop-3',
					slug: 'balance-principle',
					title: 'The Balance Principle',
					description: 'Volume on top vs bottom—when to break the rules',
					contentType: 'concept',
					estimatedMinutes: 8,
					xpReward: 10,
					order: 3,
					prerequisites: ['fash-prop-2']
				},
				{
					id: 'fash-prop-4',
					slug: 'line-eye',
					title: 'Training Your Eye',
					description: 'How lines draw attention up, down, or across',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 10,
					order: 4,
					prerequisites: ['fash-prop-3']
				},
				{
					id: 'fash-prop-5',
					slug: 'quiz-proportion',
					title: 'Quiz: Proportion Principles',
					description: 'Identify what makes outfits visually balanced',
					contentType: 'practice',
					estimatedMinutes: 10,
					xpReward: 25,
					order: 5,
					prerequisites: ['fash-prop-4']
				}
			]
		},
		{
			id: 'fash-wardrobe',
			slug: 'capsule-wardrobe',
			title: 'Building a Capsule Wardrobe',
			description: 'Fewer pieces, more outfits',
			icon: 'briefcase',
			order: 3,
			prerequisites: ['fash-proportion'],
			lessons: [
				{
					id: 'fash-ward-1',
					slug: 'outfit-combinator',
					title: 'Play: Outfit Combinator',
					description: 'See how many outfits you can make from limited pieces',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 25,
					order: 1
				},
				{
					id: 'fash-ward-2',
					slug: 'capsule-math',
					title: 'The Math of Versatility',
					description: 'Why 15 pieces can create 100+ outfits',
					contentType: 'concept',
					estimatedMinutes: 8,
					xpReward: 10,
					order: 2,
					prerequisites: ['fash-ward-1']
				},
				{
					id: 'fash-ward-3',
					slug: 'essentials',
					title: 'The Essential Pieces',
					description: 'Workhorses vs statement pieces',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 10,
					order: 3,
					prerequisites: ['fash-ward-2']
				},
				{
					id: 'fash-ward-4',
					slug: 'wardrobe-audit',
					title: 'Interactive: Wardrobe Audit',
					description: 'Analyze outfit potential and identify gaps',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 30,
					order: 4,
					prerequisites: ['fash-ward-3']
				},
				{
					id: 'fash-ward-5',
					slug: 'quiz-wardrobe',
					title: 'Quiz: Capsule Strategy',
					description: 'Test your wardrobe building knowledge',
					contentType: 'practice',
					estimatedMinutes: 8,
					xpReward: 25,
					order: 5,
					prerequisites: ['fash-ward-4']
				}
			]
		},
		{
			id: 'fash-style',
			slug: 'personal-style',
			title: 'Finding Your Style',
			description: 'From principles to personal expression',
			icon: 'star',
			order: 4,
			prerequisites: ['fash-wardrobe'],
			lessons: [
				{
					id: 'fash-style-1',
					slug: 'style-quiz-game',
					title: 'Play: Style DNA',
					description: 'Rapid-fire choices reveal your aesthetic preferences',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 1
				},
				{
					id: 'fash-style-2',
					slug: 'style-archetypes',
					title: 'Style Archetypes',
					description: 'Classic, dramatic, natural, romantic—and blends',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 2,
					prerequisites: ['fash-style-1']
				},
				{
					id: 'fash-style-3',
					slug: 'context-dressing',
					title: 'Dressing for Context',
					description: 'How environment changes what works',
					contentType: 'concept',
					estimatedMinutes: 8,
					xpReward: 10,
					order: 3,
					prerequisites: ['fash-style-2']
				},
				{
					id: 'fash-style-4',
					slug: 'style-board',
					title: 'Interactive: Build Your Style Board',
					description: 'Curate your signature look from everything you\'ve learned',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 35,
					order: 4,
					prerequisites: ['fash-style-3']
				},
				{
					id: 'fash-style-5',
					slug: 'quiz-style-final',
					title: 'Final: Style Integration',
					description: 'Put it all together—color, proportion, and personal expression',
					contentType: 'practice',
					estimatedMinutes: 15,
					xpReward: 40,
					order: 5,
					prerequisites: ['fash-style-4']
				}
			]
		}
	]
};
