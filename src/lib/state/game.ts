import { State } from '@aicacia/peer';
import { derived, get, writable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import { p2pEmitter } from './p2p';
import ee3 from 'eventemitter3';

const state = writable<State<Game> | null>(null);

export interface Game {
	started: boolean;
}

export const gameEmitter = new ee3.EventEmitter<{ state: (state: State<Game>) => void }>();

export const game: Readable<Game> = derived(state, (state) => state?.get() || { started: false });

export function getGameState(): Promise<State<Game>> {
	const s = get(state);

	if (s) {
		return Promise.resolve(s);
	} else {
		return new Promise((resolve) => gameEmitter.once('state', resolve));
	}
}

p2pEmitter.on('room', (room) => {
	const s = new State<Game>('game', room, { started: false });
	s.on('update', () => state.set(s));
	gameEmitter.emit('state', s);
	state.set(s);
});
