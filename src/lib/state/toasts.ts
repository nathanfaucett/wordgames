import type { Readable } from 'svelte/store';
import { writable } from 'svelte/store';

export interface IToast {
	id: number;
	message: string;
	type: string;
}

const { update, subscribe } = writable<IToast[]>([]);

export const toasts: Readable<IToast[]> = { subscribe };

let ID = 0;

export function createToast(message: string, type = 'error'): number {
	const id = ID++;
	update((state) => [
		...state,
		{
			id,
			message,
			type
		}
	]);
	setTimeout(() => removeToast(id), 5000);
	return id;
}

export function removeToast(id: number): void {
	update((state) => {
		const index = state.findIndex((toast) => toast.id === id);

		if (index === -1) {
			return state;
		} else {
			const newState = [...state];
			newState.splice(index, 1);
			return newState;
		}
	});
}
