import { random } from '@aicacia/rand';
import { range } from '@aicacia/core';

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

export function keys<T extends Record<string, unknown>>(o: T): Array<keyof T> {
	return Object.keys(o).filter(isValidKey);
}
export function values<T extends Record<string, unknown>>(o: T): Array<T[keyof T]> {
	return entries(o).map(([_, value]) => value);
}
export function entries<T extends Record<string, unknown>>(
	o: T
): Array<[key: string, value: T[keyof T]]> {
	return Object.entries(o as any).filter(isValidEntry) as any;
}

function isValidKey<K extends string>(key: K): boolean {
	return key !== '#' && key !== '_';
}

function isValidEntry<K extends string, V>([key]: [K, V]): boolean {
	return isValidKey(key);
}
