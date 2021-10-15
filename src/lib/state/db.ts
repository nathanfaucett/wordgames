import Gun from 'gun';
import 'gun/sea.js';
import 'gun/axe.js';
import type { IGunChainReference } from 'gun/types/chain';
import type { Words } from './words';

export interface IRoom {
	users: {
		[username: string]: string;
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
	user: {
		alias: string;
	};
	rooms: {
		[roomId: string]: IRoom;
	};
}

export const db = new Gun<IAppState>({ localStorage: false });

export const user = db.user().recall({ sessionStorage: true }) as IGunChainReference<
	IAppState['user'],
	'user',
	false
>;
