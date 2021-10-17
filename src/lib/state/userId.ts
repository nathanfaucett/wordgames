import localforage from 'localforage';
import type { Readable } from 'svelte/store';
import { get, writable } from 'svelte/store';
import { v4 } from 'uuid';
import ee3 from 'eventemitter3';
import { browser } from '$app/env';

const USER_ID_KEY = 'user_id';
const { set, subscribe } = writable<string | undefined>();
const emitter = new ee3.EventEmitter<{ userId: (userId: string) => void }>();

export const userId: Readable<string | undefined> = { subscribe };

export function getUserId(): Promise<string> {
	const maybeUserId = get(userId);

	if (maybeUserId) {
		return Promise.resolve(maybeUserId);
	} else {
		return new Promise<string>((resolve) => emitter.once('userId', resolve));
	}
}

if (browser) {
	localforage.getItem<string>(USER_ID_KEY).then((userId) => {
		if (!userId) {
			userId = v4();
			localforage.setItem(USER_ID_KEY, userId);
		}
		set(userId);
		emitter.emit('userId', userId);
	});
}
