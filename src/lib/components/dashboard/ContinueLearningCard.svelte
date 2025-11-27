<script lang="ts">
	import Kbd from '$lib/components/ui/Kbd.svelte';

	interface Props {
		courseName: string;
		moduleName: string;
		lessonName: string;
		progress: number;
		href: string;
	}

	let { courseName, moduleName, lessonName, progress, href }: Props = $props();
</script>

<a
	{href}
	class="group block p-8 md:p-10 bg-surface-elevated dark:bg-surface-elevated-dark rounded-xl border border-border-subtle dark:border-border-subtle-dark hover:border-border dark:hover:border-border-dark transition-colors"
>
	<div class="space-y-6">
		<!-- Course & Module -->
		<div>
			<div class="text-sm font-sans text-text-muted dark:text-text-muted-dark uppercase tracking-wide">
				{courseName}
			</div>
			<h2 class="mt-1 text-2xl md:text-3xl font-serif text-text-primary dark:text-text-primary-dark">
				{moduleName}
			</h2>
			<p class="mt-2 text-text-secondary dark:text-text-secondary-dark">
				{lessonName}
			</p>
		</div>

		<!-- Progress bar -->
		<div class="space-y-2">
			<div class="h-1 bg-border-subtle dark:bg-border-subtle-dark rounded-full overflow-hidden">
				<div
					class="h-full bg-text-muted dark:bg-text-muted-dark rounded-full transition-all duration-500"
					style="width: {progress}%"
				></div>
			</div>
			<div class="text-sm font-sans text-text-muted dark:text-text-muted-dark tabular-nums">
				{progress}% complete
			</div>
		</div>

		<!-- CTA -->
		<div class="flex items-center gap-3">
			<span
				class="text-accent dark:text-accent-dark font-sans font-medium group-hover:underline underline-offset-4"
			>
				Continue
			</span>
			<Kbd key="R" size="sm" />
		</div>
	</div>
</a>
