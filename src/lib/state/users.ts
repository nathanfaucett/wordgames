import { State } from '@aicacia/peer';
import { derived, get, writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import { p2pEmitter, getPeerId } from './p2p';
import ee3 from 'eventemitter3';

const state: Writable<State<IUsers> | null> = writable(null);

export function emptyUsers(): IUsers {
	return { byId: {} };
}

export function emptyUser(id: string): IUser {
	return {
		id,
		name: 'Unknown',
		team: 1
	};
}

export type Team = 1 | 2;

export interface IUser {
	id: string;
	name: string;
	team: Team;
}

export interface IUsers {
	byId: { [id: string]: IUser };
}

export const usersEmitter = new ee3.EventEmitter<{ state: (state: State<IUsers>) => void }>();

export const users: Readable<IUsers> = derived(state, (state) => {
	if (state) {
		return state.get();
	}
	return emptyUsers();
});
export const user: Readable<IUser | undefined> = derived(
	users,
	(users) => users?.byId[getPeerId()]
);

export function getUsersState(): Promise<State<IUsers>> {
	const s = get(state);

	if (s) {
		return Promise.resolve(s);
	} else {
		return new Promise((resolve) => usersEmitter.once('state', resolve));
	}
}

p2pEmitter.on('room', (room) => {
	const s = new State('users', room, emptyUsers());
	s.on('update', () => state.set(s));
	usersEmitter.emit('state', s);
	state.set(s);

	const id = room.getPeer().getId();
	s.change((users) => {
		if (!users.byId[id]) {
			users.byId[id] = emptyUser(id);
		}
	});
});
