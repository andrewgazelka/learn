<script lang="ts">
	import type { Component } from 'svelte';
	import { page } from '$app/stores';
	import { getCourseBySlug } from '$lib/data/courses';
	import { getLessonContent, hasLessonContent } from '$lib/content/lessons';

	const slug = $derived($page.params.slug ?? '');
	const lessonId = $derived($page.params.id ?? '');
	const course = $derived(getCourseBySlug(slug));

	// Find current lesson and module
	const lessonData = $derived(() => {
		if (course === undefined) return null;

		for (const module of course.modules) {
			const lessonIndex = module.lessons.findIndex((l) => l.id === lessonId);
			if (lessonIndex !== -1) {
				return {
					module,
					lesson: module.lessons[lessonIndex],
					lessonIndex,
					moduleIndex: course.modules.indexOf(module)
				};
			}
		}
		return null;
	});

	const current = $derived(lessonData());

	// Navigation for completion
	const navigation = $derived(() => {
		if (course === undefined || current === null) return { prev: null, next: null };

		let prev = null;
		let next = null;

		if (current.lessonIndex > 0) {
			prev = current.module.lessons[current.lessonIndex - 1];
		} else if (current.moduleIndex > 0) {
			const prevModule = course.modules[current.moduleIndex - 1];
			prev = prevModule.lessons[prevModule.lessons.length - 1];
		}

		if (current.lessonIndex < current.module.lessons.length - 1) {
			next = current.module.lessons[current.lessonIndex + 1];
		} else if (current.moduleIndex < course.modules.length - 1) {
			const nextModule = course.modules[current.moduleIndex + 1];
			next = nextModule.lessons[0];
		}

		return { prev, next };
	});

	const nav = $derived(navigation());

	// Load lesson content dynamically
	let LessonContent = $state<Component | null>(null);

	$effect(() => {
		if (hasLessonContent(lessonId)) {
			getLessonContent(lessonId).then((content) => {
				LessonContent = content;
			});
		} else {
			LessonContent = null;
		}
	});

	// Pass context to lesson
	const lessonContext = $derived({
		course: course!,
		module: current?.module,
		lesson: current?.lesson,
		nav,
		courseSlug: slug
	});
</script>

{#if course !== undefined && current !== null}
	{#if LessonContent}
		<!-- Interactive lessons take over the full page -->
		<LessonContent {...lessonContext} />
	{:else}
		<!-- Placeholder for lessons without content -->
		<div class="min-h-screen flex items-center justify-center px-6">
			<div class="text-center max-w-md">
				<div class="text-6xl mb-6">📚</div>
				<h1 class="text-2xl font-serif text-text-primary dark:text-text-primary-dark mb-2">
					{current.lesson.title}
				</h1>
				<p class="text-text-secondary dark:text-text-secondary-dark mb-6">
					{current.lesson.description}
				</p>
				<p class="text-sm text-text-muted dark:text-text-muted-dark">
					Content coming soon
				</p>
				<a
					class="inline-block mt-8 text-text-primary dark:text-text-primary-dark hover:underline"
					href="/courses/{course.slug}"
				>
					← Back to course
				</a>
			</div>
		</div>
	{/if}
{:else}
	<div class="min-h-screen flex items-center justify-center px-6">
		<div class="text-center">
			<h1 class="text-2xl font-serif text-text-primary dark:text-text-primary-dark">
				Lesson not found
			</h1>
			<a class="mt-4 inline-block text-text-primary dark:text-text-primary-dark hover:underline" href="/courses">
				Browse all courses
			</a>
		</div>
	</div>
{/if}
