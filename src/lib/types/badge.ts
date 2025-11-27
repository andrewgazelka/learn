export type BadgeCategory = 'depth' | 'retention' | 'consistency' | 'breadth' | 'teaching';
export type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Badge {
	id: string;
	name: string;
	description: string;
	icon: string;
	category: BadgeCategory;
	rarity: BadgeRarity;
	requirement: string;
}

export interface EarnedBadge extends Badge {
	earnedAt: string;
}
