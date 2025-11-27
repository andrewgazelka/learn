import type { Badge, EarnedBadge, BadgeCategory } from '$lib/types/badge';

export const BADGE_DEFINITIONS: Badge[] = [
	// Depth badges
	{
		id: 'edge-case-hunter',
		name: 'Edge Case Hunter',
		description: 'Identified 5 edge cases in lessons',
		icon: 'microscope',
		category: 'depth',
		rarity: 'rare',
		requirement: 'Identify 5 edge cases'
	},
	{
		id: 'misconception-buster',
		name: 'Misconception Buster',
		description: 'Corrected 10 common misconceptions',
		icon: 'lightbulb-off',
		category: 'depth',
		rarity: 'epic',
		requirement: 'Address 10 misconceptions'
	},
	{
		id: 'connection-maker',
		name: 'Connection Maker',
		description: 'Found connections between 3 different topics',
		icon: 'git-branch',
		category: 'depth',
		rarity: 'rare',
		requirement: 'Connect 3 topics'
	},

	// Retention badges
	{
		id: 'spaced-learner',
		name: 'Spaced Learner',
		description: 'Completed 10 spaced reviews at optimal timing',
		icon: 'calendar-clock',
		category: 'retention',
		rarity: 'common',
		requirement: '10 spaced reviews'
	},
	{
		id: 'long-term-memory',
		name: 'Long-Term Memory',
		description: 'Recalled concepts after 30+ days',
		icon: 'brain',
		category: 'retention',
		rarity: 'epic',
		requirement: 'Recall after 30 days'
	},

	// Consistency badges
	{
		id: 'week-warrior',
		name: 'Week Warrior',
		description: 'Maintained a 7-day learning streak',
		icon: 'flame',
		category: 'consistency',
		rarity: 'common',
		requirement: '7-day streak'
	},
	{
		id: 'month-master',
		name: 'Month Master',
		description: 'Maintained a 30-day learning streak',
		icon: 'calendar-check',
		category: 'consistency',
		rarity: 'rare',
		requirement: '30-day streak'
	},
	{
		id: 'century-scholar',
		name: 'Century Scholar',
		description: 'Maintained a 100-day learning streak',
		icon: 'trophy',
		category: 'consistency',
		rarity: 'legendary',
		requirement: '100-day streak'
	},

	// Breadth badges
	{
		id: 'explorer',
		name: 'Explorer',
		description: 'Started 5 different courses',
		icon: 'compass',
		category: 'breadth',
		rarity: 'common',
		requirement: 'Start 5 courses'
	},
	{
		id: 'renaissance-learner',
		name: 'Renaissance Learner',
		description: 'Completed courses in 3 different categories',
		icon: 'sparkles',
		category: 'breadth',
		rarity: 'epic',
		requirement: '3 category completions'
	},

	// Teaching badges
	{
		id: 'first-explanation',
		name: 'First Explanation',
		description: 'Explained a concept in your own words',
		icon: 'message-square',
		category: 'teaching',
		rarity: 'common',
		requirement: 'Explain 1 concept'
	},
	{
		id: 'mentor',
		name: 'Mentor',
		description: 'Your explanations helped others learn',
		icon: 'graduation-cap',
		category: 'teaching',
		rarity: 'legendary',
		requirement: 'Help others learn'
	}
];

export const BADGE_CATEGORY_INFO: Record<BadgeCategory, { label: string; icon: string }> = {
	depth: { label: 'Depth', icon: 'layers' },
	retention: { label: 'Retention', icon: 'brain' },
	consistency: { label: 'Consistency', icon: 'flame' },
	breadth: { label: 'Breadth', icon: 'compass' },
	teaching: { label: 'Teaching', icon: 'users' }
};

export function getBadgeById(id: string): Badge | undefined {
	return BADGE_DEFINITIONS.find((b) => b.id === id);
}

export function getBadgesByCategory(category: BadgeCategory): Badge[] {
	return BADGE_DEFINITIONS.filter((b) => b.category === category);
}

// Rarity sort order (highest first)
const RARITY_ORDER: Record<string, number> = {
	legendary: 0,
	epic: 1,
	rare: 2,
	common: 3
};

// Mock earned badges for the current user - includes all rarities for variety
export const mockEarnedBadges: EarnedBadge[] = [
	{ ...BADGE_DEFINITIONS.find((b) => b.id === 'century-scholar')!, earnedAt: '2024-11-25' }, // legendary
	{ ...BADGE_DEFINITIONS.find((b) => b.id === 'misconception-buster')!, earnedAt: '2024-11-20' }, // epic
	{ ...BADGE_DEFINITIONS.find((b) => b.id === 'long-term-memory')!, earnedAt: '2024-11-18' }, // epic
	{ ...BADGE_DEFINITIONS.find((b) => b.id === 'month-master')!, earnedAt: '2024-11-15' }, // rare
	{ ...BADGE_DEFINITIONS.find((b) => b.id === 'edge-case-hunter')!, earnedAt: '2024-11-10' }, // rare
	{ ...BADGE_DEFINITIONS.find((b) => b.id === 'week-warrior')!, earnedAt: '2024-11-01' }, // common
	{ ...BADGE_DEFINITIONS.find((b) => b.id === 'explorer')!, earnedAt: '2024-10-15' }, // common
	{ ...BADGE_DEFINITIONS.find((b) => b.id === 'first-explanation')!, earnedAt: '2024-10-20' } // common
].sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity]);
