import { browser } from '$app/env';
import { AutoReconnectingPeerEvent, Peer, Room } from '@aicacia/peer';
import { random } from '@aicacia/rand';
import { range } from '@aicacia/core';
import { getItem, setItem } from 'localforage';
import { get, writable } from 'svelte/store';
import { EventEmitter } from 'eventemitter3';
import { v4 } from 'uuid';

const APP_ID = 'p2pgame-example-com-',
	PEED_ID_KEY = 'peer_id';

export const peer = writable<Peer | null>(null),
	room = writable<Room | null>(null);

export const p2pEmitter = new EventEmitter<{
	peer: (peer: Peer) => void;
	room: (room: Room) => void;
}>();

export function getPeer(): Promise<Peer> {
	const p = get(peer);

	if (p) {
		return Promise.resolve(p);
	} else {
		return new Promise((resolve) => p2pEmitter.once('peer', resolve));
	}
}

export function getRoom(): Promise<Room> {
	const r = get(room);

	if (r) {
		return Promise.resolve(r);
	} else {
		return new Promise((resolve) => p2pEmitter.once('room', resolve));
	}
}

export function getPeerId(): string | undefined {
	return get(peer)?.getId();
}

export function getAppPeerId(id: string): string {
	return `${APP_ID}${id}`;
}

export function getPeerIdFromAppPeerId(appPeerId: string): string {
	return appPeerId.slice(APP_ID.length);
}

export function generateRoomId(length = 6): string {
	return range(0, length)
		.iter()
		.map(() =>
			random() < 0.25
				? Math.floor(random() * 10)
				: String.fromCharCode(97 + Math.floor(random() * 26))
		)
		.join('');
}

function forceRefresh(this: Room) {
	room.set(this);
}

export async function getOrCreateRoom(roomId: string): Promise<Room> {
	const oldRoom = get(room);
	if (oldRoom) {
		if (oldRoom.getRoomId() !== roomId) {
			oldRoom.off(AutoReconnectingPeerEvent.Connection, forceRefresh);
			oldRoom.off(AutoReconnectingPeerEvent.Disconnection, forceRefresh);
			oldRoom.close();
			room.set(null);
		} else {
			return oldRoom;
		}
	}
	const peer = await getPeer(),
		r = peer.getRoom(roomId);

	r.on(AutoReconnectingPeerEvent.Connection, forceRefresh);
	r.on(AutoReconnectingPeerEvent.Disconnection, forceRefresh);
	room.set(r);
	p2pEmitter.emit('room', r);

	return r.connect();
}

if (browser) {
	getItem(PEED_ID_KEY).then(async (peerId: string) => {
		if (!peerId) {
			peerId = v4();
			await setItem(PEED_ID_KEY, peerId);
		}
		const p = await Peer.create(
			new window.Peer(getAppPeerId(peerId), {
				host: import.meta.env.VITE_PEER_HOST,
				port: parseInt(import.meta.env.VITE_PEER_PORT)
			})
		);
		peer.set(p);
		p2pEmitter.emit('peer', p);
	});
}
