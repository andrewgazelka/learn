<script lang="ts">
	import CourseCard from '$lib/components/courses/CourseCard.svelte';
	import { courses, mockProgress } from '$lib/data/courses';
</script>

<div class="max-w-2xl mx-auto px-6 md:px-8 py-16 md:py-24">
	<header class="mb-12">
		<h1 class="text-3xl md:text-4xl font-serif text-text-primary dark:text-text-primary-dark">
			Courses
		</h1>
		<p class="mt-2 text-text-secondary dark:text-text-secondary-dark">
			Explore topics at your own pace.
		</p>
	</header>

	<div class="space-y-4">
		{#each courses as course (course.id)}
			<CourseCard {course} progress={mockProgress.get(course.id)} />
		{/each}
	</div>
</div>
