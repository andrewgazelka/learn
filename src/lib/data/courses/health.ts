import type { Course } from '$lib/types/courses';
import HealthIllustration from '$lib/components/illustrations/HealthIllustration.svelte';

export const healthCourse: Course = {
	id: 'health-fundamentals',
	slug: 'health',
	title: 'Health Fundamentals',
	description: 'Evidence-based wellness without the nonsense',
	longDescription:
		'Cut through the noise of health influencers and fad diets. Through interactive experiments, understand how your body actually works—from sleep and stress to nutrition and exercise. Build sustainable habits based on what the research actually says, not what sells supplements.',
	difficulty: 'beginner',
	estimatedHours: 12,
	totalXP: 1300,
	tags: ['wellness', 'nutrition', 'sleep', 'exercise', 'evidence-based'],
	illustration: HealthIllustration,
	modules: [
		{
			id: 'health-sleep',
			slug: 'sleep-science',
			title: 'Sleep Science',
			description: 'The foundation everything else builds on',
			icon: 'moon',
			order: 1,
			lessons: [
				{
					id: 'health-sleep-1',
					slug: 'sleep-debt-game',
					title: 'Play: Sleep Debt Simulator',
					description: 'See how sleep deprivation compounds over a week',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 1
				},
				{
					id: 'health-sleep-2',
					slug: 'sleep-cycles',
					title: 'Sleep Architecture',
					description: 'Light, deep, and REM—what each stage does',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 2,
					prerequisites: ['health-sleep-1']
				},
				{
					id: 'health-sleep-3',
					slug: 'circadian-rhythm',
					title: 'Your Internal Clock',
					description: 'Circadian rhythms and why timing matters',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 10,
					order: 3,
					prerequisites: ['health-sleep-2']
				},
				{
					id: 'health-sleep-4',
					slug: 'sleep-disruptors',
					title: 'What Ruins Sleep',
					description: 'Light, caffeine, alcohol—the science of disruption',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 4,
					prerequisites: ['health-sleep-3']
				},
				{
					id: 'health-sleep-5',
					slug: 'sleep-optimizer',
					title: 'Interactive: Sleep Schedule Builder',
					description: 'Design your optimal sleep routine based on your life',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 30,
					order: 5,
					prerequisites: ['health-sleep-4']
				},
				{
					id: 'health-sleep-6',
					slug: 'quiz-sleep',
					title: 'Quiz: Sleep Mastery',
					description: 'Diagnose sleep problems and prescribe evidence-based fixes',
					contentType: 'practice',
					estimatedMinutes: 10,
					xpReward: 25,
					order: 6,
					prerequisites: ['health-sleep-5']
				}
			]
		},
		{
			id: 'health-nutrition',
			slug: 'nutrition-basics',
			title: 'Nutrition Without Nonsense',
			description: 'What the research actually shows',
			icon: 'utensils',
			order: 2,
			prerequisites: ['health-sleep'],
			lessons: [
				{
					id: 'health-nutr-1',
					slug: 'calorie-game',
					title: 'Play: The Calorie Guessing Game',
					description: 'Test your intuition about energy in foods',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 1
				},
				{
					id: 'health-nutr-2',
					slug: 'macronutrients',
					title: 'Macronutrients',
					description: 'Protein, carbs, and fat—what they do',
					contentType: 'concept',
					estimatedMinutes: 15,
					xpReward: 15,
					order: 2,
					prerequisites: ['health-nutr-1']
				},
				{
					id: 'health-nutr-3',
					slug: 'metabolism-myths',
					title: 'Metabolism Myths',
					description: 'What actually affects your metabolic rate',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 3,
					prerequisites: ['health-nutr-2']
				},
				{
					id: 'health-nutr-4',
					slug: 'diet-comparison',
					title: 'Diet Wars: The Evidence',
					description: 'Keto, vegan, paleo—what studies actually show',
					contentType: 'concept',
					estimatedMinutes: 15,
					xpReward: 15,
					order: 4,
					prerequisites: ['health-nutr-3']
				},
				{
					id: 'health-nutr-5',
					slug: 'plate-builder',
					title: 'Interactive: Build Your Plate',
					description: 'Create balanced meals for different goals',
					contentType: 'interactive',
					estimatedMinutes: 18,
					xpReward: 30,
					order: 5,
					prerequisites: ['health-nutr-4']
				},
				{
					id: 'health-nutr-6',
					slug: 'quiz-nutrition',
					title: 'Quiz: Nutrition IQ',
					description: 'Separate fact from marketing',
					contentType: 'practice',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 6,
					prerequisites: ['health-nutr-5']
				}
			]
		},
		{
			id: 'health-exercise',
			slug: 'exercise-essentials',
			title: 'Exercise Essentials',
			description: 'Minimum effective dose for maximum benefit',
			icon: 'activity',
			order: 3,
			prerequisites: ['health-nutrition'],
			lessons: [
				{
					id: 'health-exer-1',
					slug: 'movement-tracker',
					title: 'Play: Activity Multiplier',
					description: 'See how different activities stack up for health benefits',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 1
				},
				{
					id: 'health-exer-2',
					slug: 'cardio-science',
					title: 'Cardio: What Works',
					description: 'Heart rate zones and actual benefits',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 2,
					prerequisites: ['health-exer-1']
				},
				{
					id: 'health-exer-3',
					slug: 'strength-basics',
					title: 'Strength Training Basics',
					description: 'Why muscle matters for everyone',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 3,
					prerequisites: ['health-exer-2']
				},
				{
					id: 'health-exer-4',
					slug: 'neat',
					title: 'NEAT: The Hidden Factor',
					description: 'Why daily movement beats gym heroics',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 10,
					order: 4,
					prerequisites: ['health-exer-3']
				},
				{
					id: 'health-exer-5',
					slug: 'routine-builder',
					title: 'Interactive: Routine Builder',
					description: 'Design a sustainable exercise routine for your life',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 30,
					order: 5,
					prerequisites: ['health-exer-4']
				},
				{
					id: 'health-exer-6',
					slug: 'quiz-exercise',
					title: 'Quiz: Exercise Principles',
					description: 'Apply evidence-based exercise recommendations',
					contentType: 'practice',
					estimatedMinutes: 10,
					xpReward: 25,
					order: 6,
					prerequisites: ['health-exer-5']
				}
			]
		},
		{
			id: 'health-stress',
			slug: 'stress-recovery',
			title: 'Stress & Recovery',
			description: 'Managing the modern epidemic',
			icon: 'heart',
			order: 4,
			prerequisites: ['health-exercise'],
			lessons: [
				{
					id: 'health-stress-1',
					slug: 'stress-response-sim',
					title: 'Play: Stress Response Simulator',
					description: 'Experience how chronic stress affects your systems',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 25,
					order: 1
				},
				{
					id: 'health-stress-2',
					slug: 'nervous-system',
					title: 'Your Nervous System',
					description: 'Fight-or-flight vs rest-and-digest',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 2,
					prerequisites: ['health-stress-1']
				},
				{
					id: 'health-stress-3',
					slug: 'chronic-stress',
					title: 'Chronic Stress Effects',
					description: 'How ongoing stress damages health',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 3,
					prerequisites: ['health-stress-2']
				},
				{
					id: 'health-stress-4',
					slug: 'recovery-methods',
					title: 'Evidence-Based Recovery',
					description: 'What actually works for stress reduction',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 4,
					prerequisites: ['health-stress-3']
				},
				{
					id: 'health-stress-5',
					slug: 'breathing-lab',
					title: 'Interactive: Breathing Lab',
					description: 'Practice techniques that activate parasympathetic response',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 30,
					order: 5,
					prerequisites: ['health-stress-4']
				},
				{
					id: 'health-stress-6',
					slug: 'quiz-stress',
					title: 'Quiz: Stress Management',
					description: 'Identify stressors and prescribe interventions',
					contentType: 'practice',
					estimatedMinutes: 10,
					xpReward: 25,
					order: 6,
					prerequisites: ['health-stress-5']
				}
			]
		},
		{
			id: 'health-habits',
			slug: 'habit-formation',
			title: 'Building Lasting Habits',
			description: 'From knowledge to sustainable change',
			icon: 'repeat',
			order: 5,
			prerequisites: ['health-stress'],
			lessons: [
				{
					id: 'health-habit-1',
					slug: 'habit-loop-game',
					title: 'Play: The Habit Loop',
					description: 'See how cue-routine-reward shapes behavior',
					contentType: 'interactive',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 1
				},
				{
					id: 'health-habit-2',
					slug: 'habit-science',
					title: 'The Science of Habits',
					description: 'Why willpower fails and systems succeed',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 2,
					prerequisites: ['health-habit-1']
				},
				{
					id: 'health-habit-3',
					slug: 'environment-design',
					title: 'Environment Design',
					description: 'Making good choices the default',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 3,
					prerequisites: ['health-habit-2']
				},
				{
					id: 'health-habit-4',
					slug: 'habit-stacking',
					title: 'Habit Stacking',
					description: 'Attaching new behaviors to existing routines',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 10,
					order: 4,
					prerequisites: ['health-habit-3']
				},
				{
					id: 'health-habit-5',
					slug: 'habit-designer',
					title: 'Interactive: Habit Designer',
					description: 'Create implementation intentions for your health goals',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 35,
					order: 5,
					prerequisites: ['health-habit-4']
				},
				{
					id: 'health-habit-6',
					slug: 'quiz-final-health',
					title: 'Final: Health Integration',
					description: 'Design a complete, sustainable health protocol',
					contentType: 'practice',
					estimatedMinutes: 18,
					xpReward: 50,
					order: 6,
					prerequisites: ['health-habit-5']
				}
			]
		}
	]
};
