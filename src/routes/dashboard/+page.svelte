<script lang="ts">
	import type { Component } from 'svelte';
	import Kbd from '$lib/components/ui/Kbd.svelte';
	import { courses, mockProgress } from '$lib/data/courses';

	// Get current course progress
	const currentCourse = courses[0];
	const progress = mockProgress.get(currentCourse.id);
	const currentModule = currentCourse.modules.find((m) => m.id === progress?.currentModuleId);
	const currentLesson = currentModule?.lessons.find((l) => l.id === progress?.currentLessonId);
	const Illustration: Component = currentCourse.illustration;

	const progressPercent = progress !== undefined
		? Math.round((progress.lessonsCompleted / progress.totalLessons) * 100)
		: 0;

	const stats = { streak: 34, xp: 1247, topics: 12 };

	function formatXP(value: number): string {
		return value >= 1000 ? `${(value / 1000).toFixed(1).replace(/\.0$/u, '')}k` : value.toLocaleString();
	}

	const recentActivity = [
		{ lesson: 'The RL Problem', module: 'What is RL?' },
		{ lesson: 'RL vs Supervised', module: 'What is RL?' }
	];

	const continueHref = `/courses/${currentCourse.slug}/lessons/${currentLesson?.id ?? currentCourse.modules[0].lessons[0].id}`;
</script>

<div class="min-h-[85vh] flex flex-col justify-center max-w-4xl mx-auto px-8 md:px-12 py-20">
	<!-- Hero -->
	<header>
		<!-- Stats - whisper quiet -->
		<div class="text-xs font-sans text-text-muted dark:text-text-muted-dark tracking-wider mb-12">
			{stats.streak} days &middot; {formatXP(stats.xp)} XP &middot; {stats.topics} topics
		</div>

		<div class="flex items-end justify-between gap-16">
			<div class="flex-1 max-w-2xl">
				<!-- Course label -->
				<div class="text-xs font-sans text-text-muted dark:text-text-muted-dark uppercase tracking-[0.2em] mb-6">
					{currentCourse.title}
				</div>

				<!-- Module title - dominant -->
				<h1 class="text-5xl sm:text-6xl md:text-7xl font-serif text-text-primary dark:text-text-primary-dark leading-[1.05] tracking-[-0.02em]">
					{currentModule?.title ?? 'Getting Started'}
				</h1>

				<!-- Lesson -->
				<p class="mt-8 text-xl md:text-2xl text-text-secondary dark:text-text-secondary-dark font-serif">
					{currentLesson?.title ?? 'Begin your journey'}
				</p>

				<!-- Progress bar - ultra thin -->
				<div class="mt-10 flex items-center gap-4 max-w-sm">
					<div class="flex-1 h-px bg-border dark:bg-border-dark">
						<div
							style:width="{progressPercent}%"
							class="h-full bg-text-secondary dark:bg-text-secondary-dark"
						></div>
					</div>
					<span class="text-xs font-sans text-text-muted dark:text-text-muted-dark tabular-nums">
						{progressPercent}%
					</span>
				</div>

				<!-- CTA -->
				<a
					class="group inline-flex items-center gap-3 mt-12"
					href={continueHref}
				>
					<span class="text-accent dark:text-accent-dark font-sans text-sm tracking-wide uppercase hover:underline underline-offset-4">
						Continue
					</span>
					<Kbd key="R" size="sm" />
				</a>
			</div>

			<!-- Illustration - ghostly -->
			<div class="hidden lg:block w-48 opacity-30">
				<Illustration class="w-full h-auto" />
			</div>
		</div>
	</header>

	<!-- Recently - pushed down, quiet -->
	<footer class="mt-auto pt-20">
		<div class="text-xs font-sans text-text-muted dark:text-text-muted-dark uppercase tracking-[0.2em] mb-4">
			Recently
		</div>
		<div class="space-y-1.5 text-sm">
			{#each recentActivity as activity (activity.lesson)}
				<div class="text-text-muted dark:text-text-muted-dark">
					<span class="font-serif text-text-secondary dark:text-text-secondary-dark">{activity.lesson}</span>
					<span class="mx-2 opacity-50">/</span>
					<span>{activity.module}</span>
				</div>
			{/each}
		</div>

		<a
			class="inline-block mt-8 text-xs font-sans text-text-muted dark:text-text-muted-dark uppercase tracking-wider hover:text-text-secondary dark:hover:text-text-secondary-dark"
			href="/courses"
		>
			All courses &rarr;
		</a>
	</footer>
</div>
