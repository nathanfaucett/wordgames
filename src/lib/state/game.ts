import { State } from '@aicacia/peer';
import { derived, get, writable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import { getPeerId, p2pEmitter } from './p2p';
import ee3 from 'eventemitter3';
import { getUsersState, user } from './users';
import { XorShiftRng } from '@aicacia/rand';
import { getWord } from './words';

const state = writable<State<IGame> | null>(null);
const DEFAULT_TIME = 60;

export enum Words {
	Easy = 'easy',
	Medium = 'medium',
	Hard = 'hard',
	All = 'all'
}

export interface IGame {
	seed: number;
	started: boolean;
	words: Words;
	turn: string;
	word: string;
	timer: number;
	team1: number;
	team2: number;
}

export function emptyGame(): IGame {
	return {
		seed: Date.now(),
		started: false,
		words: Words.Medium,
		turn: '',
		word: '',
		timer: DEFAULT_TIME,
		team1: 0,
		team2: 0
	};
}

export const gameEmitter = new ee3.EventEmitter<{ state: (state: State<IGame>) => void }>();

export const game: Readable<IGame> = derived(state, (state) => state?.get() || emptyGame());

export function getGameState(): Promise<State<IGame>> {
	const s = get(state);

	if (s) {
		return Promise.resolve(s);
	} else {
		return new Promise((resolve) => gameEmitter.once('state', resolve));
	}
}

export async function startGame(): Promise<void> {
	const [gameState, usersState] = await Promise.all([getGameState(), getUsersState()]),
		game = gameState.get(),
		users = usersState.get(),
		rng = new XorShiftRng(game.seed),
		word = await getWord(rng, game.words);

	gameState.change((game) => {
		game.started = true;
		game.turn = rng.fromArray(Object.keys(users.byId)).unwrapOr(getPeerId());
		game.word = word;
		game.seed = rng.nextInt();
	});
}

export async function next(): Promise<void> {
	const [gameState, usersState] = await Promise.all([getGameState(), getUsersState()]),
		game = gameState.get(),
		users = usersState.get(),
		rng = new XorShiftRng(game.seed),
		word = await getWord(rng, game.words),
		usersInOrder = Object.keys(users.byId).sort(),
		currentIndex = usersInOrder.indexOf(game.turn),
		turn =
			currentIndex === usersInOrder.length - 1 ? usersInOrder[0] : usersInOrder[currentIndex + 1];

	gameState.change((game) => {
		game.word = word;
		game.seed = rng.nextInt();
		game.turn = turn;
	});
}

export async function start(): Promise<void> {
	const gameState = await getGameState(),
		game = gameState.get(),
		rng = new XorShiftRng(game.seed),
		word = await getWord(rng, game.words);

	gameState.change((game) => {
		game.timer = DEFAULT_TIME;
		game.word = word;
		game.seed = rng.nextInt();
	});
}

export async function skipWord(): Promise<void> {
	const gameState = await getGameState(),
		game = gameState.get(),
		rng = new XorShiftRng(game.seed),
		word = await getWord(rng, game.words);

	gameState.change((game) => {
		game.word = word;
		game.seed = rng.nextInt();
	});
}

let timerId: any;

export async function startTimer(): Promise<void> {
	if (timerId != null) {
		return;
	}
	const gameState = await getGameState();

	gameState.change((game) => {
		game.timer = DEFAULT_TIME;
	});

	timerId = setInterval(() => {
		gameState.change((game) => {
			if (game.timer > 0) {
				game.timer--;
			} else {
				stopTimer();
			}
		});
	}, 1000);
}

export async function stopTimer(): Promise<void> {
	if (timerId == null) {
		return;
	}
	const gameState = await getGameState(),
		current = get(user);

	gameState.change((game) => {
		if (current.id === game.turn) {
			if (current.team === 1) {
				game.team2++;
			} else {
				game.team1++;
			}
		}
		game.timer = 0;
	});

	clearInterval(timerId);
	timerId = null;
}

p2pEmitter.on('room', (room) => {
	const s = new State<IGame>('game', room, emptyGame());
	s.on('update', () => state.set(s));
	gameEmitter.emit('state', s);
	state.set(s);
});
