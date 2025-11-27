<script lang="ts">
	import { untrack } from 'svelte';

	type PieceType = 'K' | 'R' | 'P' | 'p' | null; // K=King, R=Rook, P=White Pawn, p=Black Pawn
	type Square = { piece: PieceType; highlight?: 'move' | 'capture' | 'from' };

	interface DemoState {
		board: Square[][];
		phase: number;
		label: string;
	}

	// Which demo to show
	let currentDemo = $state<'castling' | 'enpassant'>('castling');
	let phase = $state(0);
	let isAnimating = $state(false);

	// Castling demo states
	const castlingStates: DemoState[] = [
		{
			phase: 0,
			label: 'Starting position — King and Rook haven\'t moved',
			board: makeBoard([
				{ pos: [7, 4], piece: 'K' },
				{ pos: [7, 7], piece: 'R' }
			])
		},
		{
			phase: 1,
			label: 'King moves TWO squares toward rook...',
			board: makeBoard([
				{ pos: [7, 4], piece: null, highlight: 'from' },
				{ pos: [7, 6], piece: 'K', highlight: 'move' },
				{ pos: [7, 7], piece: 'R' }
			])
		},
		{
			phase: 2,
			label: 'Rook JUMPS over to the other side!',
			board: makeBoard([
				{ pos: [7, 5], piece: 'R', highlight: 'move' },
				{ pos: [7, 6], piece: 'K' }
			])
		},
		{
			phase: 3,
			label: 'But... how do you know they haven\'t moved before?',
			board: makeBoard([
				{ pos: [7, 5], piece: 'R' },
				{ pos: [7, 6], piece: 'K' }
			])
		}
	];

	// En passant demo states
	const enPassantStates: DemoState[] = [
		{
			phase: 0,
			label: 'White pawn on 5th rank, Black pawn on starting square',
			board: makeBoard([
				{ pos: [3, 4], piece: 'P' },
				{ pos: [1, 3], piece: 'p' }
			])
		},
		{
			phase: 1,
			label: 'Black pawn moves TWO squares forward...',
			board: makeBoard([
				{ pos: [3, 4], piece: 'P' },
				{ pos: [1, 3], piece: null, highlight: 'from' },
				{ pos: [3, 3], piece: 'p', highlight: 'move' }
			])
		},
		{
			phase: 2,
			label: 'White can capture "en passant" (in passing)!',
			board: makeBoard([
				{ pos: [3, 4], piece: null, highlight: 'from' },
				{ pos: [2, 3], piece: 'P', highlight: 'move' },
				{ pos: [3, 3], piece: null, highlight: 'capture' }
			])
		},
		{
			phase: 3,
			label: 'Only legal IMMEDIATELY after — how would you know?',
			board: makeBoard([
				{ pos: [2, 3], piece: 'P' }
			])
		}
	];

	const states = $derived(currentDemo === 'castling' ? castlingStates : enPassantStates);
	const currentState = $derived(states[phase] || states[0]);

	function makeBoard(pieces: { pos: [number, number]; piece: PieceType; highlight?: 'move' | 'capture' | 'from' }[]): Square[][] {
		const board: Square[][] = Array(8).fill(null).map(() =>
			Array(8).fill(null).map(() => ({ piece: null }))
		);
		for (const { pos, piece, highlight } of pieces) {
			board[pos[0]][pos[1]] = { piece, highlight };
		}
		return board;
	}

	// Use filled (black) Unicode symbols for all pieces - differentiate by color
	function getPieceDisplay(piece: PieceType): string {
		switch (piece) {
			case 'K': return '♚'; // King (filled)
			case 'R': return '♜'; // Rook (filled)
			case 'P': return '♟'; // Pawn (filled) - white pawn
			case 'p': return '♟'; // Pawn (filled) - black pawn
			default: return '';
		}
	}

	function isWhitePiece(piece: PieceType): boolean {
		return piece === 'K' || piece === 'R' || piece === 'P';
	}

	function nextPhase() {
		if (isAnimating) return;
		if (phase < states.length - 1) {
			isAnimating = true;
			phase++;
			setTimeout(() => isAnimating = false, 300);
		}
	}

	function prevPhase() {
		if (isAnimating) return;
		if (phase > 0) {
			isAnimating = true;
			phase--;
			setTimeout(() => isAnimating = false, 300);
		}
	}

	function switchDemo(demo: 'castling' | 'enpassant') {
		if (currentDemo !== demo) {
			currentDemo = demo;
			phase = 0;
		}
	}

	function replay() {
		phase = 0;
	}
</script>

<div class="space-y-4">
	<!-- Demo selector tabs -->
	<div class="flex gap-2 justify-center">
		<button
			class="px-3 py-1.5 text-sm rounded-md transition-colors {currentDemo === 'castling'
				? 'bg-text-primary dark:bg-text-primary-dark text-surface-elevated dark:text-surface-dark'
				: 'bg-surface dark:bg-surface-dark text-text-secondary dark:text-text-secondary-dark hover:bg-border-subtle dark:hover:bg-border-subtle-dark'}"
			onclick={() => switchDemo('castling')}
		>
			Castling
		</button>
		<button
			class="px-3 py-1.5 text-sm rounded-md transition-colors {currentDemo === 'enpassant'
				? 'bg-text-primary dark:bg-text-primary-dark text-surface-elevated dark:text-surface-dark'
				: 'bg-surface dark:bg-surface-dark text-text-secondary dark:text-text-secondary-dark hover:bg-border-subtle dark:hover:bg-border-subtle-dark'}"
			onclick={() => switchDemo('enpassant')}
		>
			En Passant
		</button>
	</div>

	<!-- Chess board (cropped to relevant area) -->
	<div class="flex justify-center">
		<div class="inline-block border border-border-subtle dark:border-border-subtle-dark rounded overflow-hidden shadow-sm">
			{#each currentDemo === 'castling' ? [7] : [1, 2, 3] as row}
				<div class="flex">
					{#each currentDemo === 'castling' ? [3, 4, 5, 6, 7] : [2, 3, 4, 5] as col}
						{@const square = currentState.board[row][col]}
						{@const isLight = (row + col) % 2 === 0}
						<div
							class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-2xl sm:text-3xl transition-all duration-300
								{isLight ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-amber-700/60 dark:bg-amber-800/50'}
								{square.highlight === 'move' ? 'ring-2 ring-inset ring-emerald-500' : ''}
								{square.highlight === 'capture' ? 'ring-2 ring-inset ring-rose-500 bg-rose-200/50 dark:bg-rose-900/30' : ''}
								{square.highlight === 'from' ? 'ring-2 ring-inset ring-amber-400 opacity-50' : ''}"
						>
							{#if square.piece}
								<span class="drop-shadow-sm {isWhitePiece(square.piece) ? 'text-white' : 'text-gray-900 dark:text-gray-800'}" style="text-shadow: 0 1px 2px rgba(0,0,0,0.3)">
									{getPieceDisplay(square.piece)}
								</span>
							{/if}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<!-- Label -->
	<p class="text-center text-sm text-text-secondary dark:text-text-secondary-dark min-h-[2.5rem]">
		{currentState.label}
	</p>

	<!-- Controls -->
	<div class="flex justify-center items-center gap-3">
		<button
			class="px-3 py-1.5 text-sm rounded bg-surface dark:bg-surface-dark text-text-secondary dark:text-text-secondary-dark hover:bg-border-subtle dark:hover:bg-border-subtle-dark disabled:opacity-30 transition-colors"
			disabled={phase === 0}
			onclick={prevPhase}
		>
			← Back
		</button>
		<span class="text-xs text-text-muted dark:text-text-muted-dark tabular-nums">
			{phase + 1}/{states.length}
		</span>
		{#if phase === states.length - 1}
			<button
				class="px-3 py-1.5 text-sm rounded bg-surface dark:bg-surface-dark text-text-secondary dark:text-text-secondary-dark hover:bg-border-subtle dark:hover:bg-border-subtle-dark transition-colors"
				onclick={replay}
			>
				Replay
			</button>
		{:else}
			<button
				class="px-3 py-1.5 text-sm rounded bg-text-primary dark:bg-text-primary-dark text-surface-elevated dark:text-surface-dark hover:bg-text-secondary dark:hover:bg-text-secondary-dark transition-colors"
				onclick={nextPhase}
			>
				Next →
			</button>
		{/if}
	</div>
</div>
