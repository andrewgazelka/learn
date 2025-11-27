<script lang="ts">
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';
	import { getCourseBySlug, mockProgress } from '$lib/data/courses';
	import ModuleTree from '$lib/components/courses/ModuleTree.svelte';

	const slug = $derived($page.params.slug ?? '');
	const course = $derived(getCourseBySlug(slug));
	const progress = $derived(course !== undefined ? mockProgress.get(course.id) : undefined);

	const totalLessons = $derived(
		course?.modules.reduce((acc, m) => acc + m.lessons.length, 0) ?? 0
	);
</script>

{#if course}
	<div class="max-w-2xl mx-auto px-6 md:px-8 py-16 md:py-24">
		<!-- Header -->
		<header class="mb-12">
			<a
				class="text-sm font-sans text-text-muted dark:text-text-muted-dark hover:text-text-secondary dark:hover:text-text-secondary-dark transition-colors"
				href={resolve('/courses')}
			>
				&larr; Courses
			</a>

			<h1 class="mt-4 text-3xl md:text-4xl font-serif text-text-primary dark:text-text-primary-dark">
				{course.title}
			</h1>

			<p class="mt-3 text-lg text-text-secondary dark:text-text-secondary-dark">
				{course.longDescription ?? course.description}
			</p>

			<!-- Meta -->
			<div
				class="mt-4 flex items-center gap-4 text-sm font-sans text-text-muted dark:text-text-muted-dark"
			>
				<span class="capitalize">{course.difficulty}</span>
				<span>&middot;</span>
				<span>{course.estimatedHours} hours</span>
				<span>&middot;</span>
				<span>{totalLessons} lessons</span>
				<span>&middot;</span>
				<span>{course.totalXP} XP</span>
			</div>
		</header>

		<!-- Module Tree -->
		<section>
			<ModuleTree {course} {progress} />
		</section>
	</div>
{:else}
	<div class="max-w-2xl mx-auto px-6 md:px-8 py-16 md:py-24">
		<h1 class="text-2xl font-serif text-text-primary dark:text-text-primary-dark">
			Course not found
		</h1>
		<a
			class="mt-4 inline-block text-text-primary dark:text-text-primary-dark hover:underline"
			href={resolve('/courses')}
		>
			Browse all courses
		</a>
	</div>
{/if}
