import type { Component } from 'svelte';

// Lazy load lesson content components
const lessonContent: Record<string, () => Promise<{ default: Component }>> = {
	'rl-mdp-2': () => import('./MarkovProperty.svelte'),
	'ml-incentives-1': () => import('./TheNewsGame.svelte'),
	'ml-deep-1': () => import('./ConflictDeepDive.svelte')
};

export async function getLessonContent(lessonId: string): Promise<Component | null> {
	const loader = lessonContent[lessonId];
	if (!loader) return null;

	const module = await loader();
	return module.default;
}

export function hasLessonContent(lessonId: string): boolean {
	return lessonId in lessonContent;
}
