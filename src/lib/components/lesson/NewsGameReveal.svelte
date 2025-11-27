<script lang="ts">
	import IconTrendingUp from '~icons/lucide/trending-up';
	import IconTrendingDown from '~icons/lucide/trending-down';
	import IconDollarSign from '~icons/lucide/dollar-sign';
	import IconStar from '~icons/lucide/star';

	interface Props {
		revenue: number;
		credibility: number;
		choices: string[];
	}

	const { revenue, credibility, choices }: Props = $props();

	const sensationalCount = $derived(choices.filter(c => c === 'sensational').length);
	const clickbaitCount = $derived(choices.filter(c => c === 'clickbait').length);
	const balancedCount = $derived(choices.filter(c => c === 'balanced').length);
	const investigativeCount = $derived(choices.filter(c => c === 'investigative').length);

	const engagementHeavy = $derived(sensationalCount + clickbaitCount >= choices.length / 2);
	const qualityFocused = $derived(balancedCount + investigativeCount >= choices.length / 2);

	function getPatternInsight(): { title: string; description: string } {
		if (clickbaitCount >= 3) {
			return {
				title: 'The Clickbait Trap',
				description: 'You maximized short-term revenue but destroyed trust. This is exactly what many digital-first outlets face: algorithms reward engagement, not accuracy.'
			};
		}
		if (balancedCount + investigativeCount >= 4) {
			return {
				title: 'The Quality Gamble',
				description: 'You prioritized accuracy over engagement. Sustainable long-term, but hard to survive the quarter. This is the challenge facing traditional journalism.'
			};
		}
		if (engagementHeavy) {
			return {
				title: 'The Engagement Race',
				description: 'You leaned toward sensationalism. Many outlets make this choice: inflammatory content drives traffic, even if it erodes credibility over time.'
			};
		}
		return {
			title: 'The Balancing Act',
			description: 'You mixed approaches. This reflects the real tension editors face: staying financially viable while maintaining journalistic standards.'
		};
	}

	const insight = $derived(getPatternInsight());
</script>

<div class="space-y-6">
	<!-- Final stats -->
	<div class="grid grid-cols-2 gap-4">
		<div class="p-4 rounded-lg bg-surface dark:bg-surface-dark text-center">
			<div class="flex items-center justify-center gap-1 mb-1">
				<IconDollarSign class="w-4 h-4 text-emerald-500" />
			</div>
			<div class="text-2xl font-mono text-text-primary dark:text-text-primary-dark">
				${revenue.toLocaleString()}
			</div>
			<div class="text-xs text-text-muted dark:text-text-muted-dark">Final Revenue</div>
		</div>
		<div class="p-4 rounded-lg bg-surface dark:bg-surface-dark text-center">
			<div class="flex items-center justify-center gap-1 mb-1">
				<IconStar class="w-4 h-4 text-amber-500" />
			</div>
			<div class="text-2xl font-mono {credibility > 50 ? 'text-emerald-600 dark:text-emerald-400' : credibility > 20 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'}">
				{credibility}%
			</div>
			<div class="text-xs text-text-muted dark:text-text-muted-dark">Reader Trust</div>
		</div>
	</div>

	<!-- Choice breakdown -->
	<div class="p-4 rounded-lg bg-surface dark:bg-surface-dark">
		<div class="text-sm font-medium text-text-secondary dark:text-text-secondary-dark mb-3">
			Your Editorial Choices
		</div>
		<div class="grid grid-cols-2 gap-2 text-sm">
			<div class="flex items-center justify-between">
				<span class="text-rose-600 dark:text-rose-400">Clickbait</span>
				<span class="font-mono text-text-muted dark:text-text-muted-dark">{clickbaitCount}</span>
			</div>
			<div class="flex items-center justify-between">
				<span class="text-amber-600 dark:text-amber-400">Sensational</span>
				<span class="font-mono text-text-muted dark:text-text-muted-dark">{sensationalCount}</span>
			</div>
			<div class="flex items-center justify-between">
				<span class="text-emerald-600 dark:text-emerald-400">Balanced</span>
				<span class="font-mono text-text-muted dark:text-text-muted-dark">{balancedCount}</span>
			</div>
			<div class="flex items-center justify-between">
				<span class="text-blue-600 dark:text-blue-400">Investigative</span>
				<span class="font-mono text-text-muted dark:text-text-muted-dark">{investigativeCount}</span>
			</div>
		</div>
	</div>

	<!-- Pattern insight -->
	<div class="p-5 rounded-xl border border-border dark:border-border-dark">
		<div class="text-lg font-serif text-text-primary dark:text-text-primary-dark mb-2">
			{insight.title}
		</div>
		<p class="text-text-secondary dark:text-text-secondary-dark leading-relaxed">
			{insight.description}
		</p>
	</div>
</div>
