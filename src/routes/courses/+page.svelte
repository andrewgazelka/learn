<script lang="ts">
	import { onMount } from 'svelte';
	import CourseCard from '$lib/components/courses/CourseCard.svelte';
	import { courses, mockProgress } from '$lib/data/courses';
	import { getModifierKey } from '$lib/keybinds.svelte';

	// Define topic categories that map to course tags
	const topics: { id: string; label: string; tags: string[] }[] = [
		{ id: 'all', label: 'All', tags: [] },
		{ id: 'thinking', label: 'Thinking', tags: ['critical-thinking', 'epistemology', 'logic', 'rationality'] },
		{ id: 'ai-powered', label: 'AI-Powered', tags: ['ai-powered'] },
		{ id: 'creative', label: 'Creative', tags: ['visual-arts', 'creativity', 'style'] },
		{ id: 'wellness', label: 'Wellness', tags: ['wellness', 'health', 'personal-development'] },
		{ id: 'technical', label: 'Technical', tags: ['machine-learning', 'ai', 'algorithms'] },
		{ id: 'social', label: 'Social', tags: ['leadership', 'social-skills', 'persuasion', 'debate'] }
	];

	let selectedTopic = $state<string>('all');
	let focusedTopicIndex = $state(0);

	const filteredCourses = $derived(
		selectedTopic === 'all'
			? courses
			: courses.filter((course) => {
					const topic = topics.find((t) => t.id === selectedTopic);
					if (!topic || topic.tags.length === 0) return true;
					return course.tags.some((tag) => topic.tags.includes(tag));
				})
	);

	function handleKeydown(e: KeyboardEvent) {
		// Number keys 1-7 select topics
		const num = parseInt(e.key);
		if (num >= 1 && num <= topics.length) {
			e.preventDefault();
			selectedTopic = topics[num - 1].id;
			focusedTopicIndex = num - 1;
			return;
		}

		// Arrow keys navigate topics
		if (e.key === 'ArrowLeft' || e.key === 'h') {
			e.preventDefault();
			focusedTopicIndex = (focusedTopicIndex - 1 + topics.length) % topics.length;
			selectedTopic = topics[focusedTopicIndex].id;
		} else if (e.key === 'ArrowRight' || e.key === 'l') {
			e.preventDefault();
			focusedTopicIndex = (focusedTopicIndex + 1) % topics.length;
			selectedTopic = topics[focusedTopicIndex].id;
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});
</script>

<div class="max-w-2xl mx-auto px-6 md:px-8 py-16 md:py-24">
	<header class="mb-8">
		<h1 class="text-3xl md:text-4xl font-serif text-text-primary dark:text-text-primary-dark">
			Courses
		</h1>
		<p class="mt-2 text-text-secondary dark:text-text-secondary-dark">
			Explore topics at your own pace.
		</p>
	</header>

	<!-- Topic filters -->
	<div class="mb-8">
		<div class="flex flex-wrap gap-2" role="tablist" aria-label="Filter courses by topic">
			{#each topics as topic, i (topic.id)}
				<button
					role="tab"
					aria-selected={selectedTopic === topic.id}
					class="group relative px-3 py-1.5 text-sm font-sans rounded-full border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary dark:focus-visible:ring-text-primary-dark {selectedTopic === topic.id
						? 'bg-text-primary dark:bg-text-primary-dark text-surface dark:text-surface-dark border-transparent'
						: 'text-text-secondary dark:text-text-secondary-dark border-border dark:border-border-dark hover:border-text-primary dark:hover:border-text-primary-dark hover:text-text-primary dark:hover:text-text-primary-dark'}"
					onclick={() => {
						selectedTopic = topic.id;
						focusedTopicIndex = i;
					}}
				>
					<span class="flex items-center gap-1.5">
						<span
							class="text-[10px] font-mono opacity-50 {selectedTopic === topic.id
								? 'text-surface dark:text-surface-dark'
								: ''}">[{i + 1}]</span
						>
						{topic.label}
					</span>
				</button>
			{/each}
		</div>
		<p class="mt-3 text-xs text-text-muted dark:text-text-muted-dark">
			Press <kbd
				class="px-1 py-0.5 rounded border border-border dark:border-border-dark bg-surface-elevated dark:bg-surface-elevated-dark"
				>1</kbd
			>-<kbd
				class="px-1 py-0.5 rounded border border-border dark:border-border-dark bg-surface-elevated dark:bg-surface-elevated-dark"
				>{topics.length}</kbd
			>
			to filter, or <kbd
				class="px-1 py-0.5 rounded border border-border dark:border-border-dark bg-surface-elevated dark:bg-surface-elevated-dark"
				>h</kbd
			>/<kbd
				class="px-1 py-0.5 rounded border border-border dark:border-border-dark bg-surface-elevated dark:bg-surface-elevated-dark"
				>l</kbd
			> to navigate
		</p>
	</div>

	<!-- Course count -->
	<p class="mb-4 text-sm text-text-muted dark:text-text-muted-dark">
		{filteredCourses.length}
		{filteredCourses.length === 1 ? 'course' : 'courses'}
		{selectedTopic !== 'all' ? `in ${topics.find((t) => t.id === selectedTopic)?.label}` : ''}
	</p>

	<!-- Course list -->
	<div class="space-y-4">
		{#each filteredCourses as course (course.id)}
			<CourseCard {course} progress={mockProgress.get(course.id)} />
		{:else}
			<p class="py-12 text-center text-text-muted dark:text-text-muted-dark">
				No courses in this category yet.
			</p>
		{/each}
	</div>
</div>
