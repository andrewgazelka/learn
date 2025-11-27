<script lang="ts">
	import type { Course, CourseProgress, ModuleStatus } from '$lib/types/courses';
	import ModuleNode from './ModuleNode.svelte';

	interface Props {
		course: Course;
		progress?: CourseProgress;
	}

	const { course, progress }: Props = $props();

	function getModuleStatus(moduleId: string, moduleIndex: number): ModuleStatus {
		// TODO: Re-implement proper locking based on prerequisites and progress
		// For now, all modules are available for development/testing
		if (progress === undefined) {
			return 'available';
		}

		// Find completed modules
		const currentModuleIndex = course.modules.findIndex(
			(m) => m.id === progress.currentModuleId
		);

		if (moduleIndex < currentModuleIndex) {
			return 'completed';
		} else if (moduleIndex === currentModuleIndex) {
			return 'in_progress';
		}
		// All other modules are available (not locked)
		return 'available';
	}

	function getModuleProgress(moduleId: string): number {
		if (progress?.currentModuleId !== moduleId) {
			const moduleIndex = course.modules.findIndex((m) => m.id === moduleId);
			const currentIndex = course.modules.findIndex((m) => m.id === progress?.currentModuleId);
			if (moduleIndex < currentIndex) return 100;
			if (moduleIndex > currentIndex) return 0;
		}

		// Calculate progress within current module
		const module = course.modules.find((m) => m.id === moduleId);
		if (module === undefined) return 0;

		const lessonIndex = module.lessons.findIndex((l) => l.id === progress?.currentLessonId);
		if (lessonIndex === -1) return 0;

		return Math.round((lessonIndex / module.lessons.length) * 100);
	}
</script>

<div class="space-y-0">
	{#each course.modules as module, i (module.id)}
		<ModuleNode
			courseSlug={course.slug}
			isLast={i === course.modules.length - 1}
			{module}
			progress={getModuleProgress(module.id)}
			status={getModuleStatus(module.id, i)}
		/>
	{/each}
</div>
