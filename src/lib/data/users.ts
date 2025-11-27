import type { User, DailyActivity, Activity } from '$lib/types/user';
import type { Follow, UserSearchResult } from '$lib/types/social';
import { mockEarnedBadges } from './badges';

// Current logged-in user
export const currentUser: User = {
	id: 'user-1',
	username: 'andrewgazelka',
	displayName: 'Andrew Gazelka',
	avatar: 'https://github.com/andrewgazelka.png',
	bio: 'Building things that matter. Learning every day.',
	joinedAt: '2024-08-15',
	totalXP: 1247,
	currentStreak: 34,
	longestStreak: 34,
	badgesUnlocked: mockEarnedBadges.length,
	coursesCompleted: 2,
	lessonsCompleted: 47
};

// Other mock users
export const mockUsers: User[] = [
	currentUser,
	{
		id: 'user-2',
		username: 'sarahchen',
		displayName: 'Sarah Chen',
		avatar: 'https://i.pravatar.cc/150?u=sarahchen',
		bio: 'Lifelong learner. Data scientist by day.',
		joinedAt: '2024-06-01',
		totalXP: 2340,
		currentStreak: 67,
		longestStreak: 67,
		badgesUnlocked: 8,
		coursesCompleted: 4,
		lessonsCompleted: 89
	},
	{
		id: 'user-3',
		username: 'marcusj',
		displayName: 'Marcus Johnson',
		avatar: 'https://i.pravatar.cc/150?u=marcusj',
		bio: 'Philosophy enthusiast. Always questioning.',
		joinedAt: '2024-09-10',
		totalXP: 890,
		currentStreak: 12,
		longestStreak: 21,
		badgesUnlocked: 4,
		coursesCompleted: 1,
		lessonsCompleted: 32
	},
	{
		id: 'user-4',
		username: 'emilyw',
		displayName: 'Emily Watson',
		avatar: 'https://i.pravatar.cc/150?u=emilyw',
		bio: 'Curious about everything.',
		joinedAt: '2024-07-20',
		totalXP: 1890,
		currentStreak: 45,
		longestStreak: 52,
		badgesUnlocked: 7,
		coursesCompleted: 3,
		lessonsCompleted: 71
	},
	{
		id: 'user-5',
		username: 'alexkim',
		displayName: 'Alex Kim',
		avatar: 'https://i.pravatar.cc/150?u=alexkim',
		bio: 'Engineer learning to think better.',
		joinedAt: '2024-10-01',
		totalXP: 560,
		currentStreak: 8,
		longestStreak: 14,
		badgesUnlocked: 3,
		coursesCompleted: 0,
		lessonsCompleted: 18
	}
];

// Mock follows
const mockFollows: Follow[] = [
	{ followerId: 'user-1', followingId: 'user-2', followedAt: '2024-10-15' },
	{ followerId: 'user-1', followingId: 'user-4', followedAt: '2024-11-01' },
	{ followerId: 'user-2', followingId: 'user-1', followedAt: '2024-10-20' },
	{ followerId: 'user-3', followingId: 'user-1', followedAt: '2024-11-10' },
	{ followerId: 'user-4', followingId: 'user-1', followedAt: '2024-11-05' },
	{ followerId: 'user-5', followingId: 'user-1', followedAt: '2024-11-15' }
];

// Generate realistic daily activity for last 365 days
export function generateDailyActivities(userId: string): DailyActivity[] {
	const activities: DailyActivity[] = [];
	const today = new Date();
	const seed = userId.charCodeAt(userId.length - 1);

	for (let i = 364; i >= 0; i--) {
		const date = new Date(today);
		date.setDate(date.getDate() - i);
		const dateStr = date.toISOString().split('T')[0];

		// Pseudo-random but deterministic based on date and user
		const dayOfWeek = date.getDay();
		const dayNum = date.getDate();
		const monthNum = date.getMonth();
		const hash = (dayNum * 31 + monthNum * 12 + seed) % 100;

		// Lower activity on weekends
		const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
		const baseChance = isWeekend ? 40 : 70;

		let totalXP = 0;
		if (hash < baseChance) {
			// Activity day - vary the amount
			if (hash < 15) {
				totalXP = 80 + (hash % 40); // High activity: 80-119 XP
			} else if (hash < 40) {
				totalXP = 40 + (hash % 40); // Medium activity: 40-79 XP
			} else {
				totalXP = 10 + (hash % 30); // Low activity: 10-39 XP
			}
		}

		// Calculate level based on XP
		let level: 0 | 1 | 2 | 3 | 4 = 0;
		if (totalXP > 100) level = 4;
		else if (totalXP > 60) level = 3;
		else if (totalXP > 30) level = 2;
		else if (totalXP > 0) level = 1;

		activities.push({ date: dateStr, totalXP, level });
	}

	return activities;
}

// Mock recent activities
export const mockRecentActivities: Activity[] = [
	{
		id: 'act-1',
		type: 'lesson_completed',
		xpEarned: 25,
		timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
		metadata: { lessonTitle: 'The Repeated Game', courseTitle: 'Game Theory' }
	},
	{
		id: 'act-2',
		type: 'badge_earned',
		xpEarned: 50,
		timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
		metadata: { badgeName: 'Edge Case Hunter' }
	},
	{
		id: 'act-3',
		type: 'lesson_completed',
		xpEarned: 15,
		timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
		metadata: { lessonTitle: 'Confirmation Bias', courseTitle: 'Critical Thinking' }
	},
	{
		id: 'act-4',
		type: 'streak_achieved',
		xpEarned: 30,
		timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
		metadata: { streakDays: 30 }
	},
	{
		id: 'act-5',
		type: 'lesson_completed',
		xpEarned: 20,
		timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
		metadata: { lessonTitle: 'Nash Equilibrium', courseTitle: 'Game Theory' }
	}
];

// Helper functions
export function getUserByUsername(username: string): User | undefined {
	return mockUsers.find((u) => u.username === username);
}

export function getUserById(id: string): User | undefined {
	return mockUsers.find((u) => u.id === id);
}

export function searchUsers(query: string): UserSearchResult[] {
	const lowerQuery = query.toLowerCase();
	return mockUsers
		.filter(
			(u) =>
				u.id !== currentUser.id &&
				(u.username.toLowerCase().includes(lowerQuery) ||
					u.displayName.toLowerCase().includes(lowerQuery))
		)
		.map((u) => ({
			id: u.id,
			username: u.username,
			displayName: u.displayName,
			avatar: u.avatar,
			totalXP: u.totalXP,
			isFollowing: isFollowing(u.id)
		}));
}

export function isFollowing(userId: string): boolean {
	return mockFollows.some((f) => f.followerId === currentUser.id && f.followingId === userId);
}

export function getFollowers(userId: string): User[] {
	const followerIds = mockFollows.filter((f) => f.followingId === userId).map((f) => f.followerId);
	return mockUsers.filter((u) => followerIds.includes(u.id));
}

export function getFollowing(userId: string): User[] {
	const followingIds = mockFollows.filter((f) => f.followerId === userId).map((f) => f.followingId);
	return mockUsers.filter((u) => followingIds.includes(u.id));
}

export function getFollowersCount(userId: string): number {
	return mockFollows.filter((f) => f.followingId === userId).length;
}

export function getFollowingCount(userId: string): number {
	return mockFollows.filter((f) => f.followerId === userId).length;
}
