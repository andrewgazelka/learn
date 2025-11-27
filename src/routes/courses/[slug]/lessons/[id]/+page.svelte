<script lang="ts">
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';
	import { getCourseBySlug } from '$lib/data/courses';
	import Kbd from '$lib/components/ui/Kbd.svelte';
	import ChevronLeft from '~icons/lucide/chevron-left';
	import ChevronRight from '~icons/lucide/chevron-right';

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

	// Navigation
	const navigation = $derived(() => {
		if (course === undefined || current === null) return { prev: null, next: null };

		let prev = null;
		let next = null;

		// Previous lesson
		if (current.lessonIndex > 0) {
			prev = current.module.lessons[current.lessonIndex - 1];
		} else if (current.moduleIndex > 0) {
			const prevModule = course.modules[current.moduleIndex - 1];
			prev = prevModule.lessons[prevModule.lessons.length - 1];
		}

		// Next lesson
		if (current.lessonIndex < current.module.lessons.length - 1) {
			next = current.module.lessons[current.lessonIndex + 1];
		} else if (current.moduleIndex < course.modules.length - 1) {
			const nextModule = course.modules[current.moduleIndex + 1];
			next = nextModule.lessons[0];
		}

		return { prev, next };
	});

	const nav = $derived(navigation());
</script>

{#if course !== undefined && current !== null}
	<div class="max-w-2xl mx-auto px-6 md:px-8 py-16 md:py-24">
		<!-- Breadcrumb -->
		<nav class="mb-8">
			<a
				class="text-sm font-sans text-text-muted dark:text-text-muted-dark hover:text-text-secondary dark:hover:text-text-secondary-dark transition-colors"
				href={resolve(`/courses/${course.slug}`)}
			>
				&larr; {course.title}
			</a>
		</nav>

		<!-- Lesson header -->
		<header class="mb-12">
			<div
				class="text-sm font-sans text-text-muted dark:text-text-muted-dark uppercase tracking-wide"
			>
				{current.module.title}
			</div>
			<h1 class="mt-2 text-3xl md:text-4xl font-serif text-text-primary dark:text-text-primary-dark">
				{current.lesson.title}
			</h1>
			<p class="mt-3 text-lg text-text-secondary dark:text-text-secondary-dark">
				{current.lesson.description}
			</p>

			<div
				class="mt-4 flex items-center gap-4 text-sm font-sans text-text-muted dark:text-text-muted-dark"
			>
				<span>{current.lesson.estimatedMinutes} min</span>
				<span>&middot;</span>
				<span>{current.lesson.xpReward} XP</span>
			</div>
		</header>

		<!-- Content placeholder -->
		<article class="prose prose-lg dark:prose-invert max-w-none mb-16">
			<p>
				This is where the lesson content would appear. The content could include explanations,
				interactive elements, code examples, and quizzes depending on the lesson type.
			</p>

			{#if current.lesson.contentType === 'concept'}
				<div
					class="p-6 bg-surface-elevated dark:bg-surface-elevated-dark rounded-xl border border-border-subtle dark:border-border-subtle-dark"
				>
					<p class="text-text-secondary dark:text-text-secondary-dark italic m-0">
						Concept lesson content would be rendered here with rich text, diagrams, and examples.
					</p>
				</div>
			{:else if current.lesson.contentType === 'interactive'}
				<div
					class="p-6 bg-surface-elevated dark:bg-surface-elevated-dark rounded-xl border border-border-subtle dark:border-border-subtle-dark"
				>
					<p class="text-text-secondary dark:text-text-secondary-dark italic m-0">
						Interactive simulation or visualization would be embedded here.
					</p>
				</div>
			{:else if current.lesson.contentType === 'practice'}
				<div
					class="p-6 bg-surface-elevated dark:bg-surface-elevated-dark rounded-xl border border-border-subtle dark:border-border-subtle-dark"
				>
					<p class="text-text-secondary dark:text-text-secondary-dark italic m-0">
						Quiz questions and practice exercises would appear here.
					</p>
				</div>
			{/if}
		</article>

		<!-- Navigation -->
		<footer
			class="flex items-center justify-between pt-8 border-t border-border-subtle dark:border-border-subtle-dark"
		>
			{#if nav.prev !== null}
				<a
					class="group flex items-center gap-2 text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark transition-colors"
					href={resolve(`/courses/${course.slug}/lessons/${nav.prev.id}`)}
				>
					<ChevronLeft class="w-4 h-4" />
					<span class="font-serif">{nav.prev.title}</span>
					<Kbd key="P" size="sm" />
				</a>
			{:else}
				<div></div>
			{/if}

			{#if nav.next !== null}
				<a
					class="group flex items-center gap-2 text-accent dark:text-accent-dark hover:underline underline-offset-4"
					href={resolve(`/courses/${course.slug}/lessons/${nav.next.id}`)}
				>
					<span class="font-serif">{nav.next.title}</span>
					<ChevronRight class="w-4 h-4" />
					<Kbd key="N" size="sm" />
				</a>
			{:else}
				<a
					class="text-accent dark:text-accent-dark hover:underline underline-offset-4"
					href={resolve(`/courses/${course.slug}`)}
				>
					Complete module &rarr;
				</a>
			{/if}
		</footer>
	</div>
{:else}
	<div class="max-w-2xl mx-auto px-6 md:px-8 py-16 md:py-24">
		<h1 class="text-2xl font-serif text-text-primary dark:text-text-primary-dark">
			Lesson not found
		</h1>
		<a class="mt-4 inline-block text-accent dark:text-accent-dark hover:underline" href={resolve('/courses')}>
			Browse all courses
		</a>
	</div>
{/if}
