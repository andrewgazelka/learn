<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Module, ModuleStatus } from '$lib/types/courses';
	import { hasLessonContent } from '$lib/content/lessons';
	import ProgressRing from './ProgressRing.svelte';
	import LockClosed from '~icons/lucide/lock';
	import IconBookOpen from '~icons/lucide/book-open';
	// Sensemaking course icons
	import IconNewspaper from '~icons/lucide/newspaper';
	import IconSplit from '~icons/lucide/split';
	import IconSwords from '~icons/lucide/swords';
	import IconSparkles from '~icons/lucide/sparkles';
	import IconMapPin from '~icons/lucide/map-pin';
	// Deep dive icons
	import IconLandmark from '~icons/lucide/landmark';
	import IconVote from '~icons/lucide/vote';
	import IconMegaphone from '~icons/lucide/megaphone';
	import IconShield from '~icons/lucide/shield';
	import IconLanguages from '~icons/lucide/languages';
	import IconScrollText from '~icons/lucide/scroll-text';
	import IconAudioWaveform from '~icons/lucide/audio-waveform';
	import IconWheatOff from '~icons/lucide/wheat-off';
	import IconBookMarked from '~icons/lucide/book-marked';
	import IconNetwork from '~icons/lucide/network';
	import IconHammer from '~icons/lucide/hammer';
	import IconBuilding from '~icons/lucide/building';
	import IconCrown from '~icons/lucide/crown';
	import IconSunrise from '~icons/lucide/sunrise';
	import IconMoonStar from '~icons/lucide/moon-star';
	import IconCigarette from '~icons/lucide/cigarette';
	import IconStar from '~icons/lucide/star';
	import IconScale from '~icons/lucide/scale';
	import IconEye from '~icons/lucide/eye';
	import IconFlame from '~icons/lucide/flame';
	import IconBot from '~icons/lucide/bot';
	import IconAlertTriangle from '~icons/lucide/alert-triangle';
	// More deep dive icons
	import IconUserCircle from '~icons/lucide/user-circle';
	import IconRocket from '~icons/lucide/rocket';
	import IconGlobe from '~icons/lucide/globe';
	import IconPhoneCall from '~icons/lucide/phone-call';
	import IconBriefcase from '~icons/lucide/briefcase';
	import IconTowerControl from '~icons/lucide/tower-control';
	import IconTv from '~icons/lucide/tv';
	import IconFileKey from '~icons/lucide/file-key';
	import IconCrosshair from '~icons/lucide/crosshair';
	import IconPlane from '~icons/lucide/plane';
	import IconFlaskConical from '~icons/lucide/flask-conical';
	import IconMicroscope from '~icons/lucide/microscope';
	import IconTrendingDown from '~icons/lucide/trending-down';
	import IconPlaneTakeoff from '~icons/lucide/plane-takeoff';
	import IconPill from '~icons/lucide/pill';
	import IconGavel from '~icons/lucide/gavel';
	import IconShieldAlert from '~icons/lucide/shield-alert';
	import IconMic from '~icons/lucide/mic';
	import IconAtSign from '~icons/lucide/at-sign';

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
	const isDeepDive = module.type === 'deep-dive';

	// Link to the first lesson with content, or first lesson if none have content
	const targetLessonId = $derived(() => {
		const lessonWithContent = module.lessons.find((l) => hasLessonContent(l.id));
		return lessonWithContent?.id ?? module.lessons[0]?.id;
	});

	const iconMap: Record<string, typeof IconBookOpen> = {
		'newspaper': IconNewspaper,
		'split': IconSplit,
		'swords': IconSwords,
		'sparkles': IconSparkles,
		'map-pin': IconMapPin,
		'book-open': IconBookOpen,
		'landmark': IconLandmark,
		'vote': IconVote,
		'megaphone': IconMegaphone,
		'shield': IconShield,
		'languages': IconLanguages,
		'scroll-text': IconScrollText,
		'audio-waveform': IconAudioWaveform,
		'wheat-off': IconWheatOff,
		'book-marked': IconBookMarked,
		'network': IconNetwork,
		'hammer': IconHammer,
		'building': IconBuilding,
		'crown': IconCrown,
		'sunrise': IconSunrise,
		'moon-star': IconMoonStar,
		'cigarette': IconCigarette,
		'star': IconStar,
		'scale': IconScale,
		'eye': IconEye,
		'flame': IconFlame,
		'bot': IconBot,
		'alert-triangle': IconAlertTriangle,
		'user-circle': IconUserCircle,
		'rocket': IconRocket,
		'globe': IconGlobe,
		'phone-call': IconPhoneCall,
		'briefcase': IconBriefcase,
		'tower-control': IconTowerControl,
		'tv': IconTv,
		'file-key': IconFileKey,
		'crosshair': IconCrosshair,
		'plane': IconPlane,
		'flask-conical': IconFlaskConical,
		'microscope': IconMicroscope,
		'trending-down': IconTrendingDown,
		'plane-takeoff': IconPlaneTakeoff,
		'pill': IconPill,
		'gavel': IconGavel,
		'shield-alert': IconShieldAlert,
		'mic': IconMic,
		'at-sign': IconAtSign
	};

	const ModuleIcon = $derived(module.icon ? iconMap[module.icon] : IconBookOpen);
</script>

<div class="relative flex items-start gap-6">
	<!-- Vertical line connector -->
	{#if !isLast}
		<div
			class="absolute left-6 top-14 w-px h-[calc(100%-3rem)] {isCompleted
				? 'bg-text-primary dark:bg-text-primary-dark'
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
				class="w-12 h-12 rounded-full bg-text-primary dark:bg-text-primary-dark flex items-center justify-center"
			>
				<svelte:component this={ModuleIcon} class="w-5 h-5 text-white" />
			</div>
		{:else if isDeepDive}
			<!-- Deep dive: inverted style (filled circle with white icon) -->
			<div
				class="w-12 h-12 rounded-full bg-text-primary dark:bg-text-primary-dark flex items-center justify-center"
			>
				<svelte:component this={ModuleIcon} class="w-5 h-5 text-white dark:text-black" />
			</div>
		{:else}
			<div class="relative">
				<ProgressRing {progress} size={48} strokeWidth={3} />
				<div class="absolute inset-0 flex items-center justify-center">
					<svelte:component this={ModuleIcon} class="w-5 h-5 text-text-secondary dark:text-text-secondary-dark" />
				</div>
			</div>
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
	{:else if module.lessons.length === 0}
		<!-- Empty module (coming soon) -->
		<div class="flex-1 pt-2 pb-8 opacity-60">
			<h3 class="font-serif text-lg text-text-primary dark:text-text-primary-dark">
				{module.title}
			</h3>
			<p class="mt-1 text-sm text-text-secondary dark:text-text-secondary-dark">
				{module.description}
			</p>
			<div class="mt-2 text-xs font-sans text-text-muted dark:text-text-muted-dark italic flex items-center gap-2">
				{#if module.variant === 'simulator'}
					<span class="not-italic font-medium text-text-secondary dark:text-text-secondary-dark">Simulator</span>
					<span>·</span>
				{/if}
				Coming soon
			</div>
		</div>
	{:else}
		<a
			class="group flex-1 pt-2 pb-8 block"
			href={resolve(`/courses/${courseSlug}/lessons/${targetLessonId()}`)}
		>
			<h3
				class="font-serif text-lg text-text-primary dark:text-text-primary-dark group-hover:underline underline-offset-4 transition-colors"
			>
				{module.title}
			</h3>
			<p class="mt-1 text-sm text-text-secondary dark:text-text-secondary-dark">
				{module.description}
			</p>
			<div class="mt-2 text-xs font-sans text-text-muted dark:text-text-muted-dark">
				{module.lessons.length} {module.lessons.length === 1 ? 'lesson' : 'lessons'}
			</div>
		</a>
	{/if}
</div>
