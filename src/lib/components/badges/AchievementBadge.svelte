<script lang="ts">
	import type { BadgeRarity } from '$lib/types/badge';
	import type { Snippet } from 'svelte';

	interface Props {
		rarity: BadgeRarity;
		size?: 'sm' | 'md' | 'lg';
		count?: number;
		class?: string;
		children?: Snippet;
	}

	const { rarity, size = 'md', count, class: className = '', children }: Props = $props();

	const sizeClasses = {
		sm: 'w-14 h-14',
		md: 'w-16 h-16',
		lg: 'w-20 h-20'
	};

	// Vibrant distinct colors per rarity
	const rarityColors = {
		common: {
			ringOuter: '#6b7280',
			ringInner: '#9ca3af',
			bgGradientFrom: '#f3f4f6',
			bgGradientTo: '#d1d5db',
			glowColor: '#9ca3af',
			glowOpacity: 0.2
		},
		rare: {
			ringOuter: '#0ea5e9',
			ringInner: '#38bdf8',
			bgGradientFrom: '#7dd3fc',
			bgGradientTo: '#0ea5e9',
			glowColor: '#38bdf8',
			glowOpacity: 0.4
		},
		epic: {
			ringOuter: '#9333ea',
			ringInner: '#c084fc',
			bgGradientFrom: '#d8b4fe',
			bgGradientTo: '#a855f7',
			glowColor: '#c084fc',
			glowOpacity: 0.5
		},
		legendary: {
			ringOuter: '#ea580c',
			ringInner: '#fdba74',
			bgGradientFrom: '#fde047',
			bgGradientTo: '#f97316',
			glowColor: '#fbbf24',
			glowOpacity: 0.6
		}
	};

	const colors = $derived(rarityColors[rarity]);
	const isLegendary = $derived(rarity === 'legendary');
	const isEpic = $derived(rarity === 'epic');

	// Generate unique IDs for SVG gradients
	const uniqueId = $derived(`badge-${rarity}-${Math.random().toString(36).slice(2, 8)}`);
</script>

<div
	class="relative inline-flex {sizeClasses[size]} {className}"
	class:legendary-badge={isLegendary}
	class:epic-badge={isEpic}
>
	<!-- Animated glow layer for legendary -->
	{#if isLegendary}
		<div class="absolute inset-[-4px] rounded-full legendary-glow"></div>
	{/if}

	<svg viewBox="0 0 64 64" class="w-full h-full relative z-10">
		<defs>
			<!-- Radial gradient for the inner fill -->
			<radialGradient id="bg-{uniqueId}" cx="30%" cy="30%" r="70%">
				<stop offset="0%" stop-color={colors.bgGradientFrom} />
				<stop offset="100%" stop-color={colors.bgGradientTo} />
			</radialGradient>

			<!-- Linear gradient for the ring -->
			<linearGradient id="ring-{uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stop-color={colors.ringInner} />
				<stop offset="50%" stop-color={colors.ringOuter} />
				<stop offset="100%" stop-color={colors.ringInner} />
			</linearGradient>

			<!-- Glow filter -->
			<filter id="glow-{uniqueId}" x="-50%" y="-50%" width="200%" height="200%">
				<feGaussianBlur stdDeviation="2" result="blur" />
				<feFlood flood-color={colors.glowColor} flood-opacity={colors.glowOpacity} />
				<feComposite in2="blur" operator="in" />
				<feMerge>
					<feMergeNode />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>

			<!-- Clip path for shimmer -->
			<clipPath id="circle-clip-{uniqueId}">
				<circle cx="32" cy="32" r="25" />
			</clipPath>
		</defs>

		<!-- Outer ring -->
		<circle
			cx="32"
			cy="32"
			r="29"
			fill="none"
			stroke="url(#ring-{uniqueId})"
			stroke-width="4"
			filter="url(#glow-{uniqueId})"
		/>

		<!-- Inner colored circle with gradient -->
		<circle cx="32" cy="32" r="25" fill="url(#bg-{uniqueId})" />

		<!-- Highlight arc for 3D effect -->
		<path
			d="M 14 32 A 18 18 0 0 1 50 32"
			fill="none"
			stroke="white"
			stroke-width="2"
			stroke-linecap="round"
			opacity="0.4"
		/>

		<!-- Inner shadow -->
		<circle cx="32" cy="32" r="25" fill="none" stroke="black" stroke-width="1" opacity="0.1" />
	</svg>

	<!-- Shimmer overlay for legendary - CSS animated -->
	{#if isLegendary}
		<div class="absolute inset-0 z-20 overflow-hidden rounded-full pointer-events-none shimmer-container">
			<div class="shimmer-streak"></div>
		</div>
	{/if}

	<!-- Icon in center -->
	<div
		class="absolute inset-0 flex items-center justify-center drop-shadow-sm z-30"
		class:text-gray-600={rarity === 'common'}
		class:text-white={rarity !== 'common'}
	>
		{#if children}
			{@render children()}
		{/if}
	</div>

	<!-- Count badge -->
	{#if count && count > 1}
		<div
			class="absolute -bottom-1 -right-1 text-[10px] font-sans font-bold rounded-full px-1.5 py-0.5 min-w-[22px] text-center shadow-sm z-40"
			style="background: {colors.ringOuter}; color: white;"
		>
			x{count}
		</div>
	{/if}
</div>

<style>
	/* Legendary animated glow */
	.legendary-glow {
		background: conic-gradient(
			from 0deg,
			#fbbf24,
			#f97316,
			#ef4444,
			#f97316,
			#fbbf24,
			#fde047,
			#fbbf24
		);
		animation: rotate-glow 3s linear infinite;
		opacity: 0.6;
		filter: blur(4px);
	}

	@keyframes rotate-glow {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	/* Shimmer streak that sweeps across */
	.shimmer-container {
		mask-image: radial-gradient(circle at center, black 60%, transparent 70%);
		-webkit-mask-image: radial-gradient(circle at center, black 60%, transparent 70%);
	}

	.shimmer-streak {
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: linear-gradient(
			105deg,
			transparent 40%,
			rgba(255, 255, 255, 0) 45%,
			rgba(255, 255, 255, 0.5) 50%,
			rgba(255, 255, 255, 0.8) 51%,
			rgba(255, 255, 255, 0.5) 52%,
			rgba(255, 255, 255, 0) 55%,
			transparent 60%
		);
		animation: shimmer-sweep 2s ease-in-out infinite;
	}

	@keyframes shimmer-sweep {
		0% {
			transform: translateX(-100%) rotate(0deg);
		}
		100% {
			transform: translateX(100%) rotate(0deg);
		}
	}

	/* Epic badge subtle pulse */
	.epic-badge {
		animation: epic-pulse 2s ease-in-out infinite;
	}

	@keyframes epic-pulse {
		0%, 100% {
			filter: drop-shadow(0 0 4px rgba(168, 85, 247, 0.4));
		}
		50% {
			filter: drop-shadow(0 0 12px rgba(168, 85, 247, 0.7));
		}
	}

	/* Legendary badge overall glow pulse */
	.legendary-badge {
		animation: legendary-pulse 1.5s ease-in-out infinite;
	}

	@keyframes legendary-pulse {
		0%, 100% {
			filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.5));
		}
		50% {
			filter: drop-shadow(0 0 14px rgba(251, 191, 36, 0.8));
		}
	}

	/* Respect reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.legendary-glow,
		.shimmer-streak,
		.epic-badge,
		.legendary-badge {
			animation: none;
		}
		.legendary-glow {
			opacity: 0.4;
		}
	}
</style>
