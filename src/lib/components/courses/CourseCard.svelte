<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Course, CourseProgress } from '$lib/types/courses';
	import ProgressRing from './ProgressRing.svelte';

	interface Props {
		course: Course;
		progress?: CourseProgress;
	}

	const { course, progress }: Props = $props();

	const progressPercent = progress !== undefined
		? Math.round((progress.lessonsCompleted / progress.totalLessons) * 100)
		: 0;

	const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
</script>

<a
	class="group block p-6 bg-surface-elevated dark:bg-surface-elevated-dark rounded-xl border border-border-subtle dark:border-border-subtle-dark hover:border-border dark:hover:border-border-dark transition-colors"
	href={resolve(`/courses/${course.slug}`)}
>
	<div class="flex items-start gap-4">
		<!-- Course illustration with progress ring -->
		<div class="shrink-0 relative w-12 h-12">
			{#if progress}
				<ProgressRing progress={progressPercent} size={48} />
			{:else}
				<svg class="w-12 h-12" viewBox="0 0 48 48">
					<circle
						class="text-border-subtle dark:text-border-subtle-dark"
						cx="24"
						cy="24"
						fill="none"
						r="22.5"
						stroke="currentColor"
						stroke-width="3"
					/>
				</svg>
			{/if}
			{#if course.illustration}
				<div class="absolute inset-0 flex items-center justify-center">
					<course.illustration class="w-7 h-7" />
				</div>
			{/if}
		</div>

		<!-- Content -->
		<div class="flex-1 min-w-0">
			<h3
				class="font-serif text-lg text-text-primary dark:text-text-primary-dark group-hover:underline underline-offset-4 transition-all"
			>
				{course.title}
			</h3>
			<p class="mt-1 text-sm text-text-secondary dark:text-text-secondary-dark line-clamp-2">
				{course.description}
			</p>

			<!-- Meta -->
			<div
				class="mt-3 flex items-center gap-4 text-xs font-sans text-text-muted dark:text-text-muted-dark"
			>
				<span class="capitalize">{course.difficulty}</span>
				<span>&middot;</span>
				<span>{course.estimatedHours}h</span>
				<span>&middot;</span>
				<span>{totalLessons} lessons</span>
			</div>
		</div>
	</div>
</a>
