import type { PageLoad } from './$types';
import {
	getUserByUsername,
	currentUser,
	generateDailyActivities,
	mockRecentActivities,
	getFollowersCount,
	getFollowingCount,
	isFollowing
} from '$lib/data/users';
import { mockEarnedBadges } from '$lib/data/badges';
import { error } from '@sveltejs/kit';

export const load: PageLoad = ({ params }) => {
	const user = getUserByUsername(params.username);

	if (!user) {
		throw error(404, 'User not found');
	}

	const isOwnProfile = user.id === currentUser.id;

	return {
		user,
		isOwnProfile,
		isFollowing: isOwnProfile ? false : isFollowing(user.id),
		followersCount: getFollowersCount(user.id),
		followingCount: getFollowingCount(user.id),
		dailyActivities: generateDailyActivities(user.id),
		recentActivities: isOwnProfile ? mockRecentActivities : mockRecentActivities.slice(0, 3),
		badges: isOwnProfile ? mockEarnedBadges : mockEarnedBadges.slice(0, 3)
	};
};
