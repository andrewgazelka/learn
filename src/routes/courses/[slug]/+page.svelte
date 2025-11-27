<script lang="ts">
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';
	import {
		getCourseBySlug,
		getCourseById,
		mockProgress,
		getLearningPath,
		mockCompletedCourses
	} from '$lib/data/courses';
	import ModuleTree from '$lib/components/courses/ModuleTree.svelte';

	const slug = $derived($page.params.slug ?? '');
	const course = $derived(getCourseBySlug(slug));
	const progress = $derived(course !== undefined ? mockProgress.get(course.id) : undefined);

	const totalLessons = $derived(
		course?.modules.reduce((acc, m) => acc + m.lessons.length, 0) ?? 0
	);

	// Get prerequisite courses
	const prerequisiteCourses = $derived(
		course?.prerequisites?.map((id) => getCourseById(id)).filter(Boolean) ?? []
	);

	// Get full learning path if this is a goal course
	const learningPath = $derived(course ? getLearningPath(course.id) : []);
	const remainingPath = $derived(
		learningPath.filter((c) => !mockCompletedCourses.has(c.id) && c.id !== course?.id)
	);

	// First course to start with (if prereqs not met)
	const startCourse = $derived(remainingPath.length > 0 ? remainingPath[0] : course);
</script>

{#if course}
	<div class="max-w-2xl mx-auto px-6 md:px-8 py-16 md:py-24">
		<!-- Header -->
		<header class="mb-8">
			<a
				class="text-sm font-sans text-text-muted dark:text-text-muted-dark hover:text-text-secondary dark:hover:text-text-secondary-dark transition-colors"
				href={resolve('/courses')}
			>
				&larr; Courses
			</a>

			<h1
				class="mt-4 text-3xl md:text-4xl font-serif text-text-primary dark:text-text-primary-dark"
			>
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

		<!-- Prerequisites / Learning Path -->
		{#if remainingPath.length > 0}
			<section
				class="mb-8 p-4 rounded-lg bg-surface-elevated dark:bg-surface-elevated-dark border border-border-subtle dark:border-border-subtle-dark"
			>
				<p class="text-sm font-sans text-text-secondary dark:text-text-secondary-dark mb-3">
					Recommended path:
				</p>
				<div class="flex flex-wrap items-center gap-2">
					{#each remainingPath as prereq, i (prereq.id)}
						<a
							href={resolve(`/courses/${prereq.slug}`)}
							class="px-2.5 py-1 text-sm font-sans rounded-full border border-border dark:border-border-dark hover:border-text-primary dark:hover:border-text-primary-dark transition-colors {prereq.id ===
							startCourse?.id
								? 'bg-text-primary dark:bg-text-primary-dark text-surface dark:text-surface-dark border-transparent'
								: 'text-text-secondary dark:text-text-secondary-dark'}"
						>
							{prereq.title}
						</a>
						{#if i < remainingPath.length - 1}
							<span class="text-text-muted dark:text-text-muted-dark">&rarr;</span>
						{/if}
					{/each}
					<span class="text-text-muted dark:text-text-muted-dark">&rarr;</span>
					<span
						class="px-2.5 py-1 text-sm font-sans rounded-full border border-border-subtle dark:border-border-subtle-dark text-text-muted dark:text-text-muted-dark"
					>
						{course.title}
					</span>
				</div>
				<div class="mt-4 flex gap-3">
					<a
						href={resolve(`/courses/${startCourse?.slug}`)}
						class="text-sm font-sans text-text-primary dark:text-text-primary-dark border-b border-text-primary dark:border-text-primary-dark hover:opacity-70 transition-opacity"
					>
						Start from beginning
					</a>
					<span class="text-text-muted dark:text-text-muted-dark">or</span>
					<button
						class="text-sm font-sans text-text-muted dark:text-text-muted-dark hover:text-text-secondary dark:hover:text-text-secondary-dark transition-colors"
					>
						Skip to this course
					</button>
				</div>
			</section>
		{:else if prerequisiteCourses.length > 0}
			<section class="mb-8">
				<p class="text-sm font-sans text-text-muted dark:text-text-muted-dark mb-2">
					Builds on:
					{#each prerequisiteCourses as prereq, i (prereq?.id)}
						<a
							href={resolve(`/courses/${prereq?.slug}`)}
							class="text-text-secondary dark:text-text-secondary-dark hover:underline"
						>
							{prereq?.title}</a
						>{i < prerequisiteCourses.length - 1 ? ', ' : ''}
					{/each}
				</p>
			</section>
		{/if}

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
