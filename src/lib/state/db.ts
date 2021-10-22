import Gun from 'gun';
import 'gun/axe.js';
import type { Words } from './words';

export interface IUser {
	name: string;
	team: string;
}

export interface IRoom {
	users: {
		[id: string]: IUser;
	};
	seed: number;
	playing: boolean;
	started: boolean;
	words: Words;
	turn: string;
	word: string;
	timer: number;
	team1: number;
	team2: number;
}

export interface IAppState {
	rooms: {
		[roomId: string]: IRoom;
	};
}

export const db = new Gun<IAppState>({ localStorage: false });
