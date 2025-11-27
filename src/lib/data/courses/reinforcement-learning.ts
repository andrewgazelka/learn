import type { Course } from '$lib/types/courses';

export const reinforcementLearningCourse: Course = {
	id: 'rl-fundamentals',
	slug: 'reinforcement-learning',
	title: 'Reinforcement Learning',
	description: 'How agents learn from interaction',
	longDescription:
		'Explore the foundations of reinforcement learning—from the basic framework of agents and environments through value functions and Q-learning. Build intuition through interactive simulations and discover how machines learn to make decisions.',
	difficulty: 'intermediate',
	estimatedHours: 12,
	totalXP: 1200,
	tags: ['machine-learning', 'ai', 'algorithms'],
	modules: [
		{
			id: 'rl-intro',
			slug: 'introduction',
			title: 'What is Reinforcement Learning?',
			description: 'The RL paradigm and how it differs from other approaches',
			icon: 'lightbulb',
			order: 1,
			lessons: [
				{
					id: 'rl-intro-1',
					slug: 'the-rl-problem',
					title: 'The Reinforcement Learning Problem',
					description: 'Agents, environments, actions, and rewards',
					contentType: 'concept',
					estimatedMinutes: 8,
					xpReward: 10,
					order: 1
				},
				{
					id: 'rl-intro-2',
					slug: 'rl-vs-supervised',
					title: 'RL vs Supervised Learning',
					description: 'No labels, delayed feedback, exploration',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 10,
					order: 2,
					prerequisites: ['rl-intro-1']
				},
				{
					id: 'rl-intro-3',
					slug: 'gridworld-intro',
					title: 'Interactive: Gridworld',
					description: 'Control an agent in a simple grid environment',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 15,
					order: 3,
					prerequisites: ['rl-intro-2']
				},
				{
					id: 'rl-intro-4',
					slug: 'quiz-rl-basics',
					title: 'Quiz: RL Fundamentals',
					description: 'Test your understanding of core concepts',
					contentType: 'practice',
					estimatedMinutes: 10,
					xpReward: 25,
					order: 4,
					prerequisites: ['rl-intro-3']
				}
			]
		},
		{
			id: 'rl-mdp',
			slug: 'markov-decision-processes',
			title: 'Markov Decision Processes',
			description: 'The mathematical framework underlying RL',
			icon: 'git-branch',
			order: 2,
			prerequisites: ['rl-intro'],
			lessons: [
				{
					id: 'rl-mdp-1',
					slug: 'states-actions-transitions',
					title: 'States, Actions, and Transitions',
					description: 'Formalizing the agent-environment interaction',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 10,
					order: 1
				},
				{
					id: 'rl-mdp-2',
					slug: 'markov-property',
					title: 'The Markov Property',
					description: 'Why the future depends only on the present',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 10,
					order: 2,
					prerequisites: ['rl-mdp-1']
				},
				{
					id: 'rl-mdp-3',
					slug: 'rewards-returns',
					title: 'Rewards and Returns',
					description: 'Immediate vs cumulative reward, discounting',
					contentType: 'concept',
					estimatedMinutes: 15,
					xpReward: 10,
					order: 3,
					prerequisites: ['rl-mdp-2']
				},
				{
					id: 'rl-mdp-4',
					slug: 'mdp-visualization',
					title: 'Interactive: MDP Builder',
					description: 'Build and visualize your own MDP',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 20,
					order: 4,
					prerequisites: ['rl-mdp-3']
				},
				{
					id: 'rl-mdp-5',
					slug: 'quiz-mdp',
					title: 'Quiz: MDPs',
					description: 'Calculate returns and identify MDP components',
					contentType: 'practice',
					estimatedMinutes: 15,
					xpReward: 25,
					order: 5,
					prerequisites: ['rl-mdp-4']
				}
			]
		},
		{
			id: 'rl-value',
			slug: 'value-functions',
			title: 'Value Functions',
			description: 'Estimating how good states and actions are',
			icon: 'trending-up',
			order: 3,
			prerequisites: ['rl-mdp'],
			lessons: [
				{
					id: 'rl-value-1',
					slug: 'state-value-function',
					title: 'The State-Value Function',
					description: 'V(s): Expected return from a state',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 10,
					order: 1
				},
				{
					id: 'rl-value-2',
					slug: 'action-value-function',
					title: 'The Action-Value Function',
					description: 'Q(s,a): Expected return from state-action pairs',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 10,
					order: 2,
					prerequisites: ['rl-value-1']
				},
				{
					id: 'rl-value-3',
					slug: 'bellman-equations',
					title: 'Bellman Equations',
					description: 'The recursive relationship that makes RL work',
					contentType: 'concept',
					estimatedMinutes: 20,
					xpReward: 15,
					order: 3,
					prerequisites: ['rl-value-2']
				},
				{
					id: 'rl-value-4',
					slug: 'value-iteration-demo',
					title: 'Interactive: Value Iteration',
					description: 'Watch values propagate through a gridworld',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 20,
					order: 4,
					prerequisites: ['rl-value-3']
				},
				{
					id: 'rl-value-5',
					slug: 'quiz-value-functions',
					title: 'Quiz: Value Functions',
					description: 'Compute values and understand Bellman updates',
					contentType: 'practice',
					estimatedMinutes: 15,
					xpReward: 25,
					order: 5,
					prerequisites: ['rl-value-4']
				}
			]
		},
		{
			id: 'rl-qlearning',
			slug: 'q-learning',
			title: 'Q-Learning',
			description: 'The classic model-free algorithm',
			icon: 'zap',
			order: 4,
			prerequisites: ['rl-value'],
			lessons: [
				{
					id: 'rl-q-1',
					slug: 'temporal-difference',
					title: 'Temporal Difference Learning',
					description: 'Learning from incomplete episodes',
					contentType: 'concept',
					estimatedMinutes: 15,
					xpReward: 10,
					order: 1
				},
				{
					id: 'rl-q-2',
					slug: 'q-learning-algorithm',
					title: 'The Q-Learning Algorithm',
					description: 'Update rules and convergence',
					contentType: 'concept',
					estimatedMinutes: 15,
					xpReward: 15,
					order: 2,
					prerequisites: ['rl-q-1']
				},
				{
					id: 'rl-q-3',
					slug: 'exploration-exploitation',
					title: 'Exploration vs Exploitation',
					description: 'Epsilon-greedy and other strategies',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 10,
					order: 3,
					prerequisites: ['rl-q-2']
				},
				{
					id: 'rl-q-4',
					slug: 'q-learning-simulation',
					title: 'Interactive: Q-Learning Agent',
					description: 'Train a Q-learning agent in real-time',
					contentType: 'interactive',
					estimatedMinutes: 25,
					xpReward: 25,
					order: 4,
					prerequisites: ['rl-q-3']
				},
				{
					id: 'rl-q-5',
					slug: 'implement-q-learning',
					title: 'Code Challenge: Implement Q-Learning',
					description: 'Write your own Q-learning implementation',
					contentType: 'practice',
					estimatedMinutes: 30,
					xpReward: 40,
					order: 5,
					prerequisites: ['rl-q-4']
				}
			]
		}
	]
};
