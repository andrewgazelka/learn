export interface Follow {
	followerId: string;
	followingId: string;
	followedAt: string;
}

export interface UserSearchResult {
	id: string;
	username: string;
	displayName: string;
	avatar?: string;
	totalXP: number;
	isFollowing: boolean;
}
