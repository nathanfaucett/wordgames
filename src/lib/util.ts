import { random } from '@aicacia/rand';
import { range } from '@aicacia/range';
import type { IUser } from './state/rooms';

export function generateRoomId(length = 6): string {
	return range(0, length)
		.iter()
		.map(() =>
			random() < 0.25
				? Math.floor(1 + random() * 9)
				: String.fromCharCode(97 + Math.floor(random() * 26))
		)
		.join('');
}

export function sortById([aId]: [id: string, user: IUser], [bId]: [id: string, user: IUser]) {
	return aId.localeCompare(bId);
}
