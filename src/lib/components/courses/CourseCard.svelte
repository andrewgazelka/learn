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
		<!-- Progress ring or placeholder -->
		<div class="shrink-0">
			{#if progress}
				<ProgressRing progress={progressPercent} size={48} />
			{:else}
				<div
					class="w-12 h-12 rounded-full border-2 border-border-subtle dark:border-border-subtle-dark"
				></div>
			{/if}
		</div>

		<!-- Content -->
		<div class="flex-1 min-w-0">
			<h3
				class="font-serif text-lg text-text-primary dark:text-text-primary-dark group-hover:text-accent dark:group-hover:text-accent-dark transition-colors"
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
