export interface User {
	id: string;
	username: string;
	displayName: string;
	avatar?: string;
	bio?: string;
	joinedAt: string;
	totalXP: number;
	currentStreak: number;
	longestStreak: number;
	badgesUnlocked: number;
	coursesCompleted: number;
	lessonsCompleted: number;
}

export interface DailyActivity {
	date: string; // YYYY-MM-DD
	totalXP: number;
	level: 0 | 1 | 2 | 3 | 4;
}

export type ActivityType =
	| 'lesson_completed'
	| 'badge_earned'
	| 'course_completed'
	| 'streak_achieved';

export interface Activity {
	id: string;
	type: ActivityType;
	xpEarned: number;
	timestamp: string;
	metadata: {
		lessonTitle?: string;
		courseTitle?: string;
		badgeName?: string;
		streakDays?: number;
	};
}
