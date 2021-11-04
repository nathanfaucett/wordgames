import { Graph } from '@aicacia/graph';
import { Peer, Mesh } from '@aicacia/mesh';
import type { Words } from './words';
import { browser } from '$app/env';

export const graph = new Graph();

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

export interface IUser {
	id: string;
	name: string;
	team: string;
}

export interface IUsers {
	[id: string]: IUser;
}

export interface IRoom {
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
}

export interface IRooms {
	[id: string]: IRoom;
}
