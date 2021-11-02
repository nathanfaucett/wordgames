import { Graph } from '@aicacia/graph';
import { Peer, Mesh } from '@aicacia/mesh';
import type { Words } from './words';
import type { IGraphJSON } from '@aicacia/graph/types/Graph';
import { browser } from '$app/env';

export const graph = new Graph();

let mesh: Mesh;

graph
	.on('set', (json) => {
		mesh.broadcast({
			type: 'set',
			payload: json
		});
	})
	.on('get', (path) => {
		mesh.broadcast({
			type: 'get',
			payload: path
		});
	});

if (browser) {
	const peer = new Peer(window.SimplePeer, {
		namespace: 'io-github-wordgames'
	});

	mesh = new Mesh(peer);
	mesh.on('data', ({ type, payload }: { type: string; payload: unknown }) => {
		if (type === 'set') {
			graph.merge(payload as IGraphJSON);
		} else if (type === 'get') {
			const node = graph.getPathNode(payload as string);

			if (node) {
				mesh.broadcast({
					type: 'set',
					payload: node.toGraphJSON()
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
