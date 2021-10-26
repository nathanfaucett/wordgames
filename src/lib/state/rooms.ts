import { browser } from '$app/env';
import { derived, writable } from 'svelte/store';
import { WebrtcProvider } from 'y-webrtc';
import { Doc, Map } from 'yjs';
import { Words } from './words';

export interface IUser {
	id: string;
	name: string;
	team: string;
}

export interface IUsers {
	[id: string]: Map<IUser[keyof IUser]>;
}

export interface IRoom {
	users: Map<IUsers[keyof IUsers]>;
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

export const PROVIDER = browser
	? new WebrtcProvider(`io-github-nathanfaucett-wordgames`, new Doc())
	: undefined;

const roomsWritable = writable<Doc>(PROVIDER ? PROVIDER.doc : new Doc());
export const rooms = derived(roomsWritable, (rooms) => rooms);

const ROOMS: Set<string> = new Set();

export function getOrCreateRoom(rooms: Doc, roomId: string) {
	const room = rooms.getMap<IRoom[keyof IRoom]>(roomId);
	if (PROVIDER.connected) {
		if (!room.has('users')) {
			room.set('users', new Map());
		}
		if (!room.has('words')) {
			room.set('words', Words.Medium);
		}
		if (!room.has('seed')) {
			room.set('seed', Math.random() * Date.now());
		}
	}
	if (!ROOMS.has(roomId)) {
		ROOMS.add(roomId);
		room.observeDeep(() => roomsWritable.set(rooms));
	}
	return room;
}
