import type { PageLoad } from './$types';

export const load: PageLoad = (event) => {
	return {
		room: event.url.searchParams.get('room') as string
	};
};
