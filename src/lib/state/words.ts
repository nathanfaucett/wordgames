import type { Rng } from '@aicacia/rand';

export enum Words {
	Easy = 'easy',
	Medium = 'medium',
	Hard = 'hard',
	All = 'all'
}

const imports = {
	[Words.Easy]: import('$lib/state/words/easy.json'),
	[Words.Medium]: import('$lib/state/words/medium.json'),
	[Words.Hard]: import('$lib/state/words/hard.json')
};
const loading: Record<string, boolean> = {};

export const words: Record<string, string[]> = {};

export async function loadWords(word: Words = Words.Medium): Promise<string[]> {
	if (!words[word] && !loading[word]) {
		loading[word] = true;
		try {
			if (word === Words.All) {
				words[word] = (await Promise.all(Object.keys(imports).map(loadWords))).flat();
			} else {
				words[word] = await imports[word].then((module) => module.default);
			}
		} finally {
			loading[word] = false;
		}
	}
	return words[word];
}

export async function getWord(rng: Rng, word: Words): Promise<string> {
	return rng.fromArray(await loadWords(word)).unwrapOr('unknown');
}
