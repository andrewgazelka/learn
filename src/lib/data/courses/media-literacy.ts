import type { Course } from '$lib/types/courses';
import MediaLiteracyIllustration from '$lib/components/illustrations/MediaLiteracyIllustration.svelte';

// TODO: Re-enable module prerequisites once all lessons have content implemented
// Currently all modules are unlocked for development/testing

export const mediaLiteracyCourse: Course = {
	id: 'media-literacy',
	slug: 'sensemaking',
	title: 'Sensemaking',
	description: 'Navigate narratives without getting played',
	isGoal: true,
	goalCategory: 'thinking',
	longDescription:
		'Everyone is trying to shape how you see the world. Through interactive simulations, discover how incentives drive narratives, apply game theory to understand why conflicts persist, and build your own framework for figuring out what\'s actually happening—using the Israel-Gaza conflict as a case study.',
	difficulty: 'intermediate',
	estimatedHours: 10,
	totalXP: 1200,
	tags: ['epistemology', 'game-theory', 'incentives', 'geopolitics'],
	illustration: MediaLiteracyIllustration,
	modules: [
		{
			id: 'ml-incentives',
			slug: 'incentives',
			title: 'The Incentive Game',
			description: 'Why media covers stories the way it does',
			icon: 'newspaper',
			order: 1,
			lessons: [
				{
					id: 'ml-incentives-1',
					slug: 'the-news-game',
					title: 'Play: The News Editor',
					description: 'Run a news outlet and discover what drives coverage',
					contentType: 'interactive',
					estimatedMinutes: 15,
					xpReward: 25,
					order: 1
				},
				{
					id: 'ml-incentives-2',
					slug: 'attention-economy',
					title: 'The Attention Economy',
					description: 'Why engagement beats accuracy',
					contentType: 'concept',
					estimatedMinutes: 8,
					xpReward: 10,
					order: 2,
					prerequisites: ['ml-incentives-1']
				},
				{
					id: 'ml-incentives-3',
					slug: 'funding-models',
					title: 'Follow the Money',
					description: 'How funding shapes editorial decisions',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 10,
					order: 3,
					prerequisites: ['ml-incentives-2']
				},
				{
					id: 'ml-incentives-4',
					slug: 'quiz-incentives',
					title: 'Quiz: Media Incentives',
					description: 'Test your understanding of media economics',
					contentType: 'practice',
					estimatedMinutes: 8,
					xpReward: 25,
					order: 4,
					prerequisites: ['ml-incentives-3']
				}
			]
		},
		{
			id: 'ml-framing',
			slug: 'framing',
			title: 'The Framing Problem',
			description: 'How the same facts become different stories',
			icon: 'split',
			order: 2,
			lessons: [
				{
					id: 'ml-framing-1',
					slug: 'narrative-simulator',
					title: 'Play: Same Event, Different Stories',
					description: 'See how outlets frame identical events differently',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 30,
					order: 1
				},
				{
					id: 'ml-framing-2',
					slug: 'word-choice',
					title: 'The Power of Word Choice',
					description: '"Terrorists" vs "fighters" vs "militants" — each word is a verdict',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 2,
					prerequisites: ['ml-framing-1']
				},
				{
					id: 'ml-framing-3',
					slug: 'omission',
					title: 'What\'s Missing?',
					description: 'The invisible bias of omission',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 3,
					prerequisites: ['ml-framing-2']
				},
				{
					id: 'ml-framing-4',
					slug: 'quiz-framing',
					title: 'Quiz: Framing Analysis',
					description: 'Identify framing techniques in real headlines',
					contentType: 'practice',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 4,
					prerequisites: ['ml-framing-3']
				}
			]
		},
		{
			id: 'ml-gametheory',
			slug: 'game-theory',
			title: 'Game Theory of Conflict',
			description: 'Why rational actors make "irrational" choices',
			icon: 'swords',
			order: 3,
			lessons: [
				{
					id: 'ml-game-1',
					slug: 'prisoners-dilemma',
					title: 'Play: The Conflict Game',
					description: 'Experience why cooperation is hard through game theory',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 30,
					order: 1
				},
				{
					id: 'ml-game-2',
					slug: 'iterated-games',
					title: 'The Shadow of the Future',
					description: 'Why repeated interactions change everything',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 2,
					prerequisites: ['ml-game-1']
				},
				{
					id: 'ml-game-3',
					slug: 'spoilers',
					title: 'Spoilers and Hardliners',
					description: 'Those who benefit from conflict',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 3,
					prerequisites: ['ml-game-2']
				},
				{
					id: 'ml-game-4',
					slug: 'quiz-gametheory',
					title: 'Quiz: Strategic Thinking',
					description: 'Apply game theory to real scenarios',
					contentType: 'practice',
					estimatedMinutes: 12,
					xpReward: 25,
					order: 4,
					prerequisites: ['ml-game-3']
				}
			]
		},
		{
			id: 'ml-beliefs',
			slug: 'belief-formation',
			title: 'Why People Believe',
			description: 'Information, identity, and incentives',
			icon: 'sparkles',
			order: 4,
			lessons: [
				{
					id: 'ml-belief-1',
					slug: 'belief-mapper',
					title: 'Play: Belief Explorer',
					description: 'Understand different perspectives from the inside',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 30,
					order: 1
				},
				{
					id: 'ml-belief-2',
					slug: 'information-diet',
					title: 'Your Information Diet',
					description: 'How sources shape worldview',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 2,
					prerequisites: ['ml-belief-1']
				},
				{
					id: 'ml-belief-3',
					slug: 'identity-beliefs',
					title: 'Identity and Belief',
					description: 'Why some beliefs feel personal',
					contentType: 'concept',
					estimatedMinutes: 10,
					xpReward: 15,
					order: 3,
					prerequisites: ['ml-belief-2']
				},
				{
					id: 'ml-belief-4',
					slug: 'steelmanning',
					title: 'Steel Manning',
					description: 'Understanding the strongest version of opposing views',
					contentType: 'concept',
					estimatedMinutes: 12,
					xpReward: 15,
					order: 4,
					prerequisites: ['ml-belief-3']
				},
				{
					id: 'ml-belief-5',
					slug: 'quiz-beliefs',
					title: 'Quiz: Epistemic Humility',
					description: 'Test your understanding of belief formation',
					contentType: 'practice',
					estimatedMinutes: 10,
					xpReward: 25,
					order: 5,
					prerequisites: ['ml-belief-4']
				}
			]
		},
		{
			id: 'ml-deepdive',
			slug: 'israel-gaza-deep-dive',
			title: 'Israel-Gaza',
			description: 'Stakeholders, framing, game theory — the hardest case',
			icon: 'scale',
			type: 'deep-dive',
			order: 5,
			// TODO: Re-enable prerequisites once all modules have content
			// prerequisites: ['ml-beliefs'],
			lessons: [
				{
					id: 'ml-deep-1',
					slug: 'conflict-deep-dive',
					title: 'The Complete Framework',
					description: 'Stakeholders, framing, game theory, and beliefs in one analysis',
					contentType: 'interactive',
					estimatedMinutes: 45,
					xpReward: 50,
					order: 1
				},
				{
					id: 'ml-deep-2',
					slug: 'stakeholder-analysis',
					title: 'Play: Who Wants What?',
					description: 'Map the true incentives of every major actor',
					contentType: 'interactive',
					estimatedMinutes: 20,
					xpReward: 30,
					order: 2,
					prerequisites: ['ml-deep-1']
				},
				{
					id: 'ml-deep-3',
					slug: 'your-blind-spots',
					title: 'Your Blind Spots',
					description: 'What you might be missing based on your information diet',
					contentType: 'practice',
					estimatedMinutes: 15,
					xpReward: 25,
					order: 3,
					prerequisites: ['ml-deep-2']
				},
				{
					id: 'ml-deep-4',
					slug: 'synthesis',
					title: 'Building Your Framework',
					description: 'Your personal toolkit for evaluating any conflict coverage',
					contentType: 'practice',
					estimatedMinutes: 15,
					xpReward: 40,
					order: 4,
					prerequisites: ['ml-deep-3']
				}
			]
		},
		// Deep Dive modules - incentives, game theory, what they were optimizing for
		{
			id: 'ml-trump',
			slug: 'trump-deep-dive',
			title: 'Trump',
			description: 'Transactional worldview, loyalty dynamics, media symbiosis',
			icon: 'landmark',
			type: 'deep-dive',
			variant: 'simulator',
			order: 6,
			lessons: []
		},
		{
			id: 'ml-zohran',
			slug: 'zohran-deep-dive',
			title: 'Zohran Mamdani',
			description: 'DSA strategy, machine politics, insurgent math',
			icon: 'vote',
			type: 'deep-dive',
			order: 7,
			lessons: []
		},
		{
			id: 'ml-bernie',
			slug: 'bernie-deep-dive',
			title: 'Bernie Sanders',
			description: 'Movement vs. party, the endorsement calculus, leverage theory',
			icon: 'megaphone',
			type: 'deep-dive',
			order: 8,
			lessons: []
		},
		{
			id: 'ml-putin',
			slug: 'putin-deep-dive',
			title: 'Putin',
			description: 'Siloviki networks, NATO encirclement thesis, sovereign democracy',
			icon: 'shield',
			type: 'deep-dive',
			variant: 'simulator',
			order: 9,
			lessons: []
		},
		{
			id: 'ml-xi',
			slug: 'xi-deep-dive',
			title: 'Xi Jinping',
			description: 'Century of humiliation, common prosperity, the Politburo game',
			icon: 'star',
			type: 'deep-dive',
			order: 10,
			lessons: []
		},
		{
			id: 'ml-binladen',
			slug: 'binladen-deep-dive',
			title: 'Osama bin Laden',
			description: 'Far enemy doctrine, the vanguard theory, franchise model',
			icon: 'scroll-text',
			type: 'deep-dive',
			variant: 'simulator',
			order: 11,
			lessons: []
		},
		{
			id: 'ml-hitler',
			slug: 'hitler-deep-dive',
			title: 'Adolf Hitler',
			description: 'Lebensraum economics, Versailles grievance, the big lie mechanics',
			icon: 'audio-waveform',
			type: 'deep-dive',
			variant: 'simulator',
			order: 12,
			lessons: []
		},
		{
			id: 'ml-polpot',
			slug: 'polpot-deep-dive',
			title: 'Pol Pot',
			description: 'Agrarian utopianism, urban contamination theory, the Paris years',
			icon: 'wheat-off',
			type: 'deep-dive',
			order: 13,
			lessons: []
		},
		{
			id: 'ml-mao',
			slug: 'mao-deep-dive',
			title: 'Mao Zedong',
			description: 'Permanent revolution, mass line theory, the succession problem',
			icon: 'book-marked',
			type: 'deep-dive',
			variant: 'simulator',
			order: 14,
			lessons: []
		},
		{
			id: 'ml-epstein',
			slug: 'epstein-deep-dive',
			title: 'Jeffrey Epstein',
			description: 'Kompromat mechanics, elite network topology, institutional capture',
			icon: 'network',
			type: 'deep-dive',
			order: 15,
			lessons: []
		},
		{
			id: 'ml-stalin',
			slug: 'stalin-deep-dive',
			title: 'Joseph Stalin',
			description: 'Socialism in one country, the cadre problem, purge game theory',
			icon: 'hammer',
			type: 'deep-dive',
			variant: 'simulator',
			order: 16,
			lessons: []
		},
		{
			id: 'ml-silverstein',
			slug: 'silverstein-deep-dive',
			title: 'Larry Silverstein',
			description: 'Lease timing, insurance structure, the "pull it" tape',
			icon: 'building',
			type: 'deep-dive',
			order: 17,
			lessons: []
		},
		{
			id: 'ml-leopold',
			slug: 'leopold-deep-dive',
			title: 'King Leopold II',
			description: 'Humanitarian branding, rubber quotas, the Red Rubber system',
			icon: 'crown',
			type: 'deep-dive',
			order: 18,
			lessons: []
		},
		{
			id: 'ml-tojo',
			slug: 'tojo-deep-dive',
			title: 'Hideki Tojo',
			description: 'Greater East Asia Co-Prosperity, resource calculus, the strike south debate',
			icon: 'sunrise',
			type: 'deep-dive',
			order: 19,
			lessons: []
		},
		{
			id: 'ml-enver',
			slug: 'enver-deep-dive',
			title: 'Ismail Enver Pasha',
			description: 'Pan-Turkism, the Sarıkamış disaster, CUP internal dynamics',
			icon: 'moon-star',
			type: 'deep-dive',
			order: 20,
			lessons: []
		},
		{
			id: 'ml-churchill',
			slug: 'churchill-deep-dive',
			title: 'Winston Churchill',
			description: 'Imperial triage, the Bombay rice shipments, wartime allocation logic',
			icon: 'cigarette',
			type: 'deep-dive',
			order: 21,
			lessons: []
		},
		{
			id: 'ml-thiel',
			slug: 'thiel-deep-dive',
			title: 'Peter Thiel',
			description: 'Monopoly theory, Girardian mimesis, Antichrist eschatology',
			icon: 'eye',
			type: 'deep-dive',
			order: 22,
			lessons: []
		},
		{
			id: 'ml-altman',
			slug: 'altman-deep-dive',
			title: 'Sam Altman',
			description: 'Board coup, Suchir Balaji, AGI narrative control',
			icon: 'bot',
			type: 'deep-dive',
			order: 23,
			lessons: []
		},
		// Power Players
		{
			id: 'ml-zuckerberg',
			slug: 'zuckerberg-deep-dive',
			title: 'Mark Zuckerberg',
			description: 'Privacy pivots, congressional testimony, the MMA rebrand',
			icon: 'user-circle',
			type: 'deep-dive',
			order: 24,
			lessons: []
		},
		{
			id: 'ml-musk',
			slug: 'musk-deep-dive',
			title: 'Elon Musk',
			description: 'Twitter acquisition logic, attention arbitrage, government contracts',
			icon: 'rocket',
			type: 'deep-dive',
			order: 25,
			lessons: []
		},
		{
			id: 'ml-soros',
			slug: 'soros-deep-dive',
			title: 'George Soros',
			description: 'Open Society network, color revolutions, conspiracy vs reality',
			icon: 'globe',
			type: 'deep-dive',
			order: 26,
			lessons: []
		},
		{
			id: 'ml-kissinger',
			slug: 'kissinger-deep-dive',
			title: 'Henry Kissinger',
			description: 'Realpolitik doctrine, Cambodia, the "war criminal" debate',
			icon: 'phone-call',
			type: 'deep-dive',
			order: 27,
			lessons: []
		},
		{
			id: 'ml-cheney',
			slug: 'cheney-deep-dive',
			title: 'Dick Cheney',
			description: 'Iraq WMD intelligence, Halliburton, unitary executive theory',
			icon: 'briefcase',
			type: 'deep-dive',
			order: 28,
			lessons: []
		},
		{
			id: 'ml-mbs',
			slug: 'mbs-deep-dive',
			title: 'MBS',
			description: 'Saudi modernization, Khashoggi, the reformer narrative',
			icon: 'tower-control',
			type: 'deep-dive',
			order: 29,
			lessons: []
		},
		{
			id: 'ml-murdoch',
			slug: 'murdoch-deep-dive',
			title: 'Rupert Murdoch',
			description: 'Media kingmaker mechanics, editorial control structure',
			icon: 'tv',
			type: 'deep-dive',
			order: 30,
			lessons: []
		},
		{
			id: 'ml-assange',
			slug: 'assange-deep-dive',
			title: 'Julian Assange',
			description: 'WikiLeaks theory of change, selective release strategy',
			icon: 'file-key',
			type: 'deep-dive',
			order: 31,
			lessons: []
		},
		// Events/Systems
		{
			id: 'ml-jfk',
			slug: 'jfk-deep-dive',
			title: 'JFK Assassination',
			description: 'CIA, Mafia, Cuba angles, why files stayed sealed',
			icon: 'crosshair',
			type: 'deep-dive',
			order: 32,
			lessons: []
		},
		{
			id: 'ml-911saudi',
			slug: '911-saudi-deep-dive',
			title: '9/11 Saudi Connection',
			description: 'The 28 pages, flight bans, the redactions',
			icon: 'plane',
			type: 'deep-dive',
			order: 33,
			lessons: []
		},
		{
			id: 'ml-iraqwmd',
			slug: 'iraq-wmd-deep-dive',
			title: 'Iraq WMDs',
			description: 'Curveball, Chalabi, how intelligence gets cooked',
			icon: 'flask-conical',
			type: 'deep-dive',
			order: 34,
			lessons: []
		},
		{
			id: 'ml-covidorigins',
			slug: 'covid-origins-deep-dive',
			title: 'COVID Origins',
			description: 'Lab leak suppression, WHO access, funding trails',
			icon: 'microscope',
			type: 'deep-dive',
			order: 35,
			lessons: []
		},
		{
			id: 'ml-2008',
			slug: '2008-crisis-deep-dive',
			title: '2008 Financial Crisis',
			description: 'Who saw it coming, who got bailed out, why',
			icon: 'trending-down',
			type: 'deep-dive',
			order: 36,
			lessons: []
		},
		{
			id: 'ml-boeing',
			slug: 'boeing-deep-dive',
			title: 'Boeing Whistleblowers',
			description: 'Two dead, the pattern, regulatory capture',
			icon: 'plane-takeoff',
			type: 'deep-dive',
			order: 37,
			lessons: []
		},
		{
			id: 'ml-sackler',
			slug: 'sackler-deep-dive',
			title: 'Sackler Family',
			description: 'Opioid crisis engineering, the bankruptcy shield',
			icon: 'pill',
			type: 'deep-dive',
			order: 38,
			lessons: []
		},
		{
			id: 'ml-yoon',
			slug: 'yoon-deep-dive',
			title: 'Yoon Suk-yeol',
			description: 'Martial law gambit, prosecutorial mindset, the six-hour coup',
			icon: 'shield-alert',
			type: 'deep-dive',
			variant: 'simulator',
			order: 39,
			lessons: []
		},
		{
			id: 'ml-kirk',
			slug: 'kirk-debate',
			title: 'Debate Charlie Kirk',
			description: 'Handle rapid-fire framing, Gish gallop, and gotcha questions',
			icon: 'mic',
			type: 'deep-dive',
			variant: 'simulator',
			order: 40,
			lessons: []
		},
		{
			id: 'ml-x-debate',
			slug: 'x-debate',
			title: 'Debate Anyone on X',
			description: 'Practice against any public figure, pundit, or ideology',
			icon: 'at-sign',
			type: 'deep-dive',
			variant: 'simulator',
			order: 41,
			lessons: []
		}
	]
};
