import type { Rng } from '@aicacia/rand';
import { Words } from './game';

export const easy = import('$lib/state/words/easy.json'),
	medium = import('$lib/state/words/medium.json'),
	hard = import('$lib/state/words/hard.json');

export async function getWords(words: Words): Promise<string[]> {
	switch (words) {
		case Words.Easy:
			return easy.then(({ default: words }) => words);
		case Words.Medium:
			return medium.then(({ default: words }) => words);
		case Words.Hard:
			return hard.then(({ default: words }) => words);
		default:
			return Promise.all([easy, medium, hard]).then(
				([{ default: easy }, { default: medium }, { default: hard }]) => easy.concat(medium, hard)
			);
	}
}

export async function getWord(rng: Rng, words: Words): Promise<string> {
	return rng.fromArray(await getWords(words)).unwrapOr('unknown');
}
