<script lang="ts">
	import katex from 'katex';

	interface Props {
		/** The LaTeX expression to render */
		tex: string;
		/** Display mode (block) or inline */
		block?: boolean;
	}

	const { tex, block = false }: Props = $props();

	const html = $derived(
		katex.renderToString(tex, {
			displayMode: block,
			throwOnError: false,
			trust: true
		})
	);
</script>

<svelte:head>
	<link
		crossorigin="anonymous"
		href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
		rel="stylesheet"
	/>
</svelte:head>

{#if block}
	<div class="my-8 text-center overflow-x-auto">
		{@html html}
	</div>
{:else}
	<span class="inline-block align-middle">
		{@html html}
	</span>
{/if}
