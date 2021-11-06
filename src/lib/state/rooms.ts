import { Graph } from '@aicacia/graph';
import { Peer, Mesh } from '@aicacia/mesh';
import type { Words } from './words';
import { browser } from '$app/env';

export type IUser = {
	id: string;
	name: string;
	team: string;
};

export type IUsers = {
	[userId: string]: IUser;
};

export type IRoom = {
	users: IUsers;
	seed: number;
	playing: boolean;
	started: boolean;
	words: Words;
	turn: string;
	word: string;
	timer: number;
	team1: number;
	team2: number;
};

export type IRooms = {
	[roomId: string]: IRoom;
};

export type IState = {
	rooms: IRooms;
};

export const graph = new Graph<IState>();

if (typeof window !== 'undefined') {
	(window as any).graph = graph;
}

let mesh: Mesh;

graph
	.on('set', (path, json) => {
		mesh.broadcast({
			path,
			json
		});
	})
	.on('get', (path) => {
		mesh.broadcast({
			path
		});
	});

if (browser) {
	const peer = new Peer(window.SimplePeer, {
		namespace: 'io-github-wordgames'
	});

	mesh = new Mesh(peer);
	mesh.on('data', (data) => {
		if ('json' in data) {
			graph.merge(data.path, data.json);
		} else {
			const node = graph.getNodeAtPath(data.path);

			if (node) {
				mesh.broadcast({
					path: node.getPath(),
					json: node.toJSON()
				});
			}
		}
	});
}
