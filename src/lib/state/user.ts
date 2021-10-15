import { user, db } from './db';
import { writable } from 'svelte/store';
import type { Readable } from 'svelte/store';

const { set, subscribe } = writable('');
const { set: setLoading, subscribe: subscribeLoading } = writable(true);

export const username: Readable<string> = { subscribe };
export const loading: Readable<boolean> = { subscribe: subscribeLoading };

user.get('alias').on(set);

db.on('auth', async () => {
	const alias = (await user.get('alias')) as unknown as string;
	set(alias);
});

export function signOut(): void {
	user.leave();
	set('');
}

export function signIn(username: string, password: string): Promise<void> {
	return new Promise<void>((resolve, reject) =>
		user.auth(username, password, (result) => {
			if (result['err']) {
				reject(result['err']);
			} else {
				resolve();
			}
		})
	);
}

export function signUp(username: string, password: string): Promise<void> {
	return new Promise((resolve, reject) =>
		user.create(username, password, (result) => {
			if (result['err']) {
				reject(result['err']);
			} else {
				resolve(signIn(username, password));
			}
		})
	);
}

setTimeout(() => setLoading(false), 3000);
