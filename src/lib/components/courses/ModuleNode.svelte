<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Module, ModuleStatus } from '$lib/types/courses';
	import ProgressRing from './ProgressRing.svelte';
	import LockClosed from '~icons/lucide/lock';

	interface Props {
		module: Module;
		status: ModuleStatus;
		progress: number;
		isLast: boolean;
		courseSlug: string;
	}

	const { module, status, progress, isLast, courseSlug }: Props = $props();

	const isLocked = status === 'locked';
	const isCompleted = status === 'completed';
	const firstLessonId = module.lessons[0]?.id;
</script>

<div class="relative flex items-start gap-6">
	<!-- Vertical line connector -->
	{#if !isLast}
		<div
			class="absolute left-6 top-14 w-px h-[calc(100%-3rem)] {isCompleted
				? 'bg-accent dark:bg-accent-dark'
				: 'bg-border-subtle dark:bg-border-subtle-dark'}"
		></div>
	{/if}

	<!-- Progress ring / status indicator -->
	<div class="relative z-10 shrink-0">
		{#if isLocked}
			<div
				class="w-12 h-12 rounded-full bg-surface dark:bg-surface-dark border-2 border-border-subtle dark:border-border-subtle-dark flex items-center justify-center"
			>
				<LockClosed class="w-4 h-4 text-text-muted dark:text-text-muted-dark" />
			</div>
		{:else if isCompleted}
			<div
				class="w-12 h-12 rounded-full bg-accent dark:bg-accent-dark flex items-center justify-center"
			>
				<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					></path>
				</svg>
			</div>
		{:else}
			<ProgressRing {progress} size={48} strokeWidth={3} />
		{/if}
	</div>

	<!-- Content -->
	{#if isLocked}
		<div class="flex-1 pt-2 pb-8 opacity-50">
			<h3 class="font-serif text-lg text-text-primary dark:text-text-primary-dark">
				{module.title}
			</h3>
			<p class="mt-1 text-sm text-text-muted dark:text-text-muted-dark">
				{module.description}
			</p>
		</div>
	{:else}
		<a
			class="group flex-1 pt-2 pb-8 block"
			href={resolve(`/courses/${courseSlug}/lessons/${firstLessonId}`)}
		>
			<h3
				class="font-serif text-lg text-text-primary dark:text-text-primary-dark group-hover:text-accent dark:group-hover:text-accent-dark transition-colors"
			>
				{module.title}
			</h3>
			<p class="mt-1 text-sm text-text-secondary dark:text-text-secondary-dark">
				{module.description}
			</p>
			<div class="mt-2 text-xs font-sans text-text-muted dark:text-text-muted-dark">
				{module.lessons.length} lessons
			</div>
		</a>
	{/if}
</div>
