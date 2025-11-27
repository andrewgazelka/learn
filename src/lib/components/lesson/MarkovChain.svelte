<script lang="ts">
	import { untrack, type Component } from 'svelte';

	interface State {
		id: string;
		label: string;
		icon?: Component;
		x: number;
		y: number;
	}

	interface Transition {
		from: string;
		to: string;
		probability: number;
	}

	interface Props {
		states: State[];
		transitions: Transition[];
		width?: number;
		height?: number;
	}

	const { states, transitions, width = 400, height = 200 }: Props = $props();

	let currentState = $state(states[0]?.id ?? '');
	let history = $state<string[]>([]);
	let isAnimating = $state(false);

	function getTransitionsFrom(stateId: string): Transition[] {
		return transitions.filter((t) => t.from === stateId);
	}

	function selectNextState(): string {
		const available = getTransitionsFrom(currentState);
		const rand = Math.random();
		let cumulative = 0;

		for (const t of available) {
			cumulative += t.probability;
			if (rand <= cumulative) {
				return t.to;
			}
		}
		return available[available.length - 1]?.to ?? currentState;
	}

	async function step() {
		if (isAnimating) return;
		isAnimating = true;

		const next = selectNextState();
		history = [...history.slice(-9), next];

		await new Promise((r) => setTimeout(r, 300));
		currentState = next;
		isAnimating = false;
	}

	function reset() {
		currentState = states[0]?.id ?? '';
		history = [];
	}

	function getStatePos(id: string): { x: number; y: number } {
		const state = states.find((s) => s.id === id);
		return state ? { x: state.x, y: state.y } : { x: 0, y: 0 };
	}

	// Calculate arrow path between two states
	function getArrowPath(from: string, to: string, isSelf: boolean): string {
		const fromPos = getStatePos(from);
		const toPos = getStatePos(to);
		const r = 28; // state radius

		if (isSelf) {
			// Self-loop
			return `M ${fromPos.x - r * 0.7} ${fromPos.y - r * 0.7}
							C ${fromPos.x - r * 2} ${fromPos.y - r * 2},
								${fromPos.x + r * 2} ${fromPos.y - r * 2},
								${fromPos.x + r * 0.7} ${fromPos.y - r * 0.7}`;
		}

		const dx = toPos.x - fromPos.x;
		const dy = toPos.y - fromPos.y;
		const dist = Math.sqrt(dx * dx + dy * dy);
		const nx = dx / dist;
		const ny = dy / dist;

		// Start and end points (offset by radius)
		const startX = fromPos.x + nx * r;
		const startY = fromPos.y + ny * r;
		const endX = toPos.x - nx * r;
		const endY = toPos.y - ny * r;

		// Curve offset for bidirectional arrows
		const hasReverse = transitions.some((t) => t.from === to && t.to === from);
		const offset = hasReverse ? 15 : 0;
		const perpX = -ny * offset;
		const perpY = nx * offset;

		const midX = (startX + endX) / 2 + perpX;
		const midY = (startY + endY) / 2 + perpY;

		return `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;
	}
</script>

<div class="my-10">
	<!-- SVG Visualization -->
	<div class="flex justify-center mb-6">
		<svg class="overflow-visible" {height} {width}>
			<defs>
				<marker
					id="arrowhead"
					markerHeight="7"
					markerWidth="10"
					orient="auto"
					refX="9"
					refY="3.5"
				>
					<polygon
						class="fill-text-muted dark:fill-text-muted-dark"
						points="0 0, 10 3.5, 0 7"
					/>
				</marker>
			</defs>

			<!-- Transitions (arrows) -->
			{#each transitions as t}
				{@const isSelf = t.from === t.to}
				{@const path = getArrowPath(t.from, t.to, isSelf)}
				{@const isActive = t.from === currentState}
				{@const fromPos = getStatePos(t.from)}
				{@const toPos = getStatePos(t.to)}
				{@const labelX = isSelf ? fromPos.x : (fromPos.x + toPos.x) / 2}
				{@const labelY = isSelf ? fromPos.y - 50 : (fromPos.y + toPos.y) / 2 - 10}
				<g class="transition-opacity duration-200" opacity={isActive ? 1 : 0.3}>
					<path
						class="stroke-text-muted dark:stroke-text-muted-dark"
						d={path}
						fill="none"
						marker-end="url(#arrowhead)"
						stroke-width={isActive ? 1.5 : 1}
					/>
					<!-- Probability label -->
					<text
						class="fill-text-muted dark:fill-text-muted-dark text-xs font-sans"
						text-anchor="middle"
						x={labelX}
						y={labelY}
					>
						{t.probability}
					</text>
				</g>
			{/each}

			<!-- States (circles) -->
			{#each states as state}
				{@const isActive = state.id === currentState}
				<g
					class="cursor-pointer transition-transform duration-200"
					onclick={() => { currentState = state.id; history = [...history.slice(-9), state.id]; }}
					onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { currentState = state.id; history = [...history.slice(-9), state.id]; } }}
					role="button"
					tabindex="0"
					transform="translate({state.x}, {state.y})"
				>
					<circle
						class="transition-all duration-200 {isActive
							? 'fill-text-primary dark:fill-text-primary-dark stroke-text-primary dark:stroke-text-primary-dark'
							: 'fill-surface-elevated dark:fill-surface-elevated-dark stroke-border dark:stroke-border-dark'}"
						r="28"
						stroke-width="2"
					/>
					{#if state.icon}
						<foreignObject x="-14" y="-14" width="28" height="28" class="pointer-events-none">
							<div class="w-full h-full flex items-center justify-center {isActive ? 'text-surface-elevated dark:text-surface-dark' : 'text-text-primary dark:text-text-primary-dark'}">
								<state.icon class="w-6 h-6" />
							</div>
						</foreignObject>
					{:else}
						<text
							class="text-sm font-sans pointer-events-none {isActive
								? 'fill-surface-elevated dark:fill-surface-dark'
								: 'fill-text-primary dark:fill-text-primary-dark'}"
							dy="0.35em"
							text-anchor="middle"
						>
							{state.label}
						</text>
					{/if}
				</g>
			{/each}
		</svg>
	</div>

	<!-- Controls -->
	<div class="flex items-center justify-center gap-4">
		<button
			class="px-4 py-2 text-sm font-sans bg-text-primary dark:bg-text-primary-dark text-surface-elevated dark:text-surface-dark rounded-lg hover:bg-text-secondary dark:hover:bg-text-secondary-dark disabled:opacity-50 transition-colors"
			disabled={isAnimating}
			onclick={step}
		>
			Step
		</button>
		<button
			class="px-4 py-2 text-sm font-sans border border-border dark:border-border-dark text-text-secondary dark:text-text-secondary-dark rounded-lg hover:bg-surface dark:hover:bg-surface-dark transition-colors"
			onclick={reset}
		>
			Reset
		</button>
	</div>

	<!-- History (always reserve space to prevent layout shift) -->
	<div class="mt-6 text-center min-h-[3.5rem]">
		<div class="text-xs font-sans text-text-muted dark:text-text-muted-dark uppercase tracking-widest mb-2 {history.length === 0 ? 'opacity-0' : ''}">
			History
		</div>
		<div class="flex items-center justify-center gap-1 font-mono text-sm text-text-secondary dark:text-text-secondary-dark min-h-[1.25rem]">
			{#each history as h, i}
				{@const historyState = states.find((s) => s.id === h)}
				{#if i > 0}
					<span class="text-text-muted dark:text-text-muted-dark">→</span>
				{/if}
				<span class={h === currentState ? 'text-text-primary dark:text-text-primary-dark font-semibold' : ''}>
					{#if historyState?.icon}
						<historyState.icon class="w-5 h-5 inline-block" />
					{:else}
						{historyState?.label ?? h}
					{/if}
				</span>
			{/each}
		</div>
	</div>
</div>
