<script lang="ts">
	import ContinueLearningCard from '$lib/components/dashboard/ContinueLearningCard.svelte';
	import QuietStatRow from '$lib/components/dashboard/QuietStatRow.svelte';
	import RecentActivityList from '$lib/components/dashboard/RecentActivityList.svelte';
	import { courses, mockProgress } from '$lib/data/courses';

	// Get current course progress
	const currentCourse = courses[0];
	const progress = mockProgress.get(currentCourse.id);
	const currentModule = currentCourse.modules.find((m) => m.id === progress?.currentModuleId);
	const currentLesson = currentModule?.lessons.find((l) => l.id === progress?.currentLessonId);

	// Calculate progress percentage
	const progressPercent = progress
		? Math.round((progress.lessonsCompleted / progress.totalLessons) * 100)
		: 0;

	// Mock stats
	const stats = {
		streak: 34,
		xp: 1247,
		topics: 12
	};

	// Recent activity
	const recentActivity = [
		{
			lesson: 'The RL Problem',
			module: 'What is RL?',
			href: '/courses/reinforcement-learning/lessons/rl-intro-1'
		},
		{
			lesson: 'RL vs Supervised',
			module: 'What is RL?',
			href: '/courses/reinforcement-learning/lessons/rl-intro-2'
		}
	];
</script>

<div class="max-w-2xl mx-auto px-6 md:px-8 py-16 md:py-24">
	<!-- Header -->
	<header class="flex items-baseline justify-between mb-12">
		<h1 class="text-2xl font-serif text-text-primary dark:text-text-primary-dark">Welcome back</h1>
		<QuietStatRow streak={stats.streak} xp={stats.xp} topics={stats.topics} />
	</header>

	<!-- Continue Learning - the hero -->
	<section class="mb-16">
		<ContinueLearningCard
			courseName={currentCourse.title}
			moduleName={currentModule?.title ?? 'Getting Started'}
			lessonName={currentLesson?.title ?? 'Begin your journey'}
			progress={progressPercent}
			href="/courses/{currentCourse.slug}/lessons/{currentLesson?.id ?? currentCourse.modules[0].lessons[0].id}"
		/>
	</section>

	<!-- Recently -->
	<section class="mb-16">
		<h2
			class="text-sm font-sans text-text-muted dark:text-text-muted-dark uppercase tracking-wide mb-4"
		>
			Recently
		</h2>
		<RecentActivityList activities={recentActivity} />
	</section>

	<!-- Explore -->
	<footer>
		<a
			href="/courses"
			class="text-text-secondary dark:text-text-secondary-dark hover:text-accent dark:hover:text-accent-dark transition-colors"
		>
			Or explore something new &rarr;
		</a>
	</footer>
</div>
