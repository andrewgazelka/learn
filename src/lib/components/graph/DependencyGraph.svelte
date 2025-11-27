<script lang="ts">
	import { SvelteFlow, Controls, Background, type Node, type Edge } from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';
	import CourseNode from './CourseNode.svelte';
	import { courses, mockCompletedCourses } from '$lib/data/courses';
	import type { Course } from '$lib/types/courses';
	import { goto } from '$app/navigation';

	const nodeTypes = {
		course: CourseNode
	};

	// Build graph from courses
	function buildGraph(): { nodes: Node[]; edges: Edge[] } {
		const nodes: Node[] = [];
		const edges: Edge[] = [];

		// Calculate levels based on dependency depth
		const levels = new Map<string, number>();

		function getLevel(courseId: string, visited = new Set<string>()): number {
			if (visited.has(courseId)) return 0;
			visited.add(courseId);

			if (levels.has(courseId)) return levels.get(courseId)!;

			const course = courses.find((c) => c.id === courseId);
			if (!course?.prerequisites?.length) {
				levels.set(courseId, 0);
				return 0;
			}

			const maxPrereqLevel = Math.max(
				...course.prerequisites.map((prereqId) => getLevel(prereqId, visited))
			);
			const level = maxPrereqLevel + 1;
			levels.set(courseId, level);
			return level;
		}

		// Calculate all levels first
		courses.forEach((c) => getLevel(c.id));

		// Group courses by level
		const coursesByLevel = new Map<number, Course[]>();
		courses.forEach((course) => {
			const level = levels.get(course.id) ?? 0;
			if (!coursesByLevel.has(level)) coursesByLevel.set(level, []);
			coursesByLevel.get(level)!.push(course);
		});

		// Position nodes
		const nodeSpacingX = 280;
		const nodeSpacingY = 180;

		coursesByLevel.forEach((levelCourses, level) => {
			const totalWidth = (levelCourses.length - 1) * nodeSpacingX;
			const startX = -totalWidth / 2;

			levelCourses.forEach((course, index) => {
				nodes.push({
					id: course.id,
					type: 'course',
					position: {
						x: startX + index * nodeSpacingX,
						y: level * nodeSpacingY
					},
					data: {
						label: course.title,
						description: course.description,
						difficulty: course.difficulty,
						isGoal: course.isGoal,
						completed: mockCompletedCourses.has(course.id),
						hours: course.estimatedHours
					}
				});

				// Create edges from prerequisites
				course.prerequisites?.forEach((prereqId) => {
					edges.push({
						id: `${prereqId}->${course.id}`,
						source: prereqId,
						target: course.id,
						animated: !mockCompletedCourses.has(prereqId),
						style: mockCompletedCourses.has(prereqId)
							? 'stroke: var(--color-text-muted); stroke-width: 2px;'
							: 'stroke: var(--color-accent); stroke-width: 2px;'
					});
				});
			});
		});

		return { nodes, edges };
	}

	const { nodes: initialNodes, edges: initialEdges } = buildGraph();
	let nodes = $state.raw(initialNodes);
	let edges = $state.raw(initialEdges);

	function handleNodeClick({ node }: { node: Node; event: MouseEvent | TouchEvent }) {
		const courseId = node.id;
		const course = courses.find((c) => c.id === courseId);
		if (course) {
			goto(`/courses/${course.slug}`);
		}
	}
</script>

<div class="w-full h-full">
	<SvelteFlow
		{nodes}
		{edges}
		{nodeTypes}
		fitView
		minZoom={0.2}
		maxZoom={1.5}
		defaultEdgeOptions={{
			type: 'smoothstep'
		}}
		onnodeclick={handleNodeClick}
		class="bg-surface dark:bg-surface-dark"
	>
		<Controls
			class="!bg-surface-elevated dark:!bg-surface-elevated-dark !border-border dark:!border-border-dark !shadow-sm"
		/>
		<Background class="!bg-surface dark:!bg-surface-dark" gap={20} />
	</SvelteFlow>
</div>

<style>
	:global(.svelte-flow) {
		--xy-edge-stroke-default: var(--color-text-muted);
		--xy-edge-stroke-width-default: 2;
		--xy-handle-background-color-default: var(--color-text-muted);
		--xy-handle-border-color-default: var(--color-surface);
	}

	:global(.dark .svelte-flow) {
		--xy-edge-stroke-default: var(--color-text-muted-dark);
		--xy-handle-background-color-default: var(--color-text-muted-dark);
		--xy-handle-border-color-default: var(--color-surface-dark);
	}

	:global(.svelte-flow__controls button) {
		background: var(--color-surface-elevated) !important;
		border-color: var(--color-border) !important;
		color: var(--color-text-primary) !important;
	}

	:global(.dark .svelte-flow__controls button) {
		background: var(--color-surface-elevated-dark) !important;
		border-color: var(--color-border-dark) !important;
		color: var(--color-text-primary-dark) !important;
	}

	:global(.svelte-flow__controls button:hover) {
		background: var(--color-accent-subtle) !important;
	}

	:global(.dark .svelte-flow__controls button:hover) {
		background: var(--color-accent-subtle-dark) !important;
	}
</style>
