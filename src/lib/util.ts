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
