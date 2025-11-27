<script lang="ts">
	import { Handle, Position, type Node, type NodeProps } from '@xyflow/svelte';

	interface CourseNodeData extends Record<string, unknown> {
		label: string;
		description?: string;
		difficulty?: 'beginner' | 'intermediate' | 'advanced';
		isGoal?: boolean;
		completed?: boolean;
		hours?: number;
	}

	type CourseNode = Node<CourseNodeData, 'course'>;

	let { data }: NodeProps<CourseNode> = $props();

	const difficultyColors: Record<string, string> = {
		beginner: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400',
		intermediate: 'bg-amber-500/20 text-amber-700 dark:text-amber-400',
		advanced: 'bg-rose-500/20 text-rose-700 dark:text-rose-400'
	};
</script>

<div
	class="relative px-4 py-3 min-w-[180px] max-w-[220px] rounded-lg border transition-all
		{data.completed
		? 'bg-accent/5 border-accent/30 dark:bg-accent-dark/5 dark:border-accent-dark/30'
		: 'bg-surface-elevated dark:bg-surface-elevated-dark border-border dark:border-border-dark'}
		{data.isGoal ? 'ring-2 ring-accent/20 dark:ring-accent-dark/20' : ''}
		hover:shadow-md hover:border-accent/50 dark:hover:border-accent-dark/50"
>
	<!-- Target handle (top) -->
	<Handle
		type="target"
		position={Position.Top}
		class="!w-3 !h-3 !bg-text-muted dark:!bg-text-muted-dark !border-2 !border-surface dark:!border-surface-dark"
	/>

	<!-- Content -->
	<div class="text-center">
		<h3
			class="font-serif text-sm font-medium text-text-primary dark:text-text-primary-dark leading-tight"
		>
			{data.label}
		</h3>

		{#if data.description}
			<p class="mt-1 text-xs text-text-muted dark:text-text-muted-dark line-clamp-2">
				{data.description}
			</p>
		{/if}

		<div class="mt-2 flex items-center justify-center gap-2 flex-wrap">
			{#if data.difficulty}
				<span class="text-[10px] px-1.5 py-0.5 rounded font-sans {difficultyColors[data.difficulty]}">
					{data.difficulty}
				</span>
			{/if}

			{#if data.hours}
				<span class="text-[10px] text-text-muted dark:text-text-muted-dark font-sans">
					{data.hours}h
				</span>
			{/if}

			{#if data.isGoal}
				<span
					class="text-[10px] px-1.5 py-0.5 rounded font-sans bg-accent/10 text-accent dark:bg-accent-dark/10 dark:text-accent-dark"
				>
					goal
				</span>
			{/if}

			{#if data.completed}
				<span class="text-[10px] text-success dark:text-success-dark font-sans">done</span>
			{/if}
		</div>
	</div>

	<!-- Source handle (bottom) -->
	<Handle
		type="source"
		position={Position.Bottom}
		class="!w-3 !h-3 !bg-text-muted dark:!bg-text-muted-dark !border-2 !border-surface dark:!border-surface-dark"
	/>
</div>
