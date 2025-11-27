<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		open: boolean;
		onclose: () => void;
		size?: 'sm' | 'md' | 'lg';
		children: Snippet;
	}

	const { open, onclose, size = 'md', children }: Props = $props();

	const sizeClasses = {
		sm: 'max-w-sm',
		md: 'max-w-md',
		lg: 'max-w-lg'
	};

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			onclose();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			onclose();
		}
	}
</script>

{#if open}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
		aria-modal="true"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		role="dialog"
	>
		<div class="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
		<div
			class="relative w-full {sizeClasses[size]} bg-surface-elevated dark:bg-surface-elevated-dark rounded-xl shadow-2xl border border-border-subtle dark:border-border-subtle-dark overflow-hidden"
		>
			{@render children()}
		</div>
	</div>
{/if}
