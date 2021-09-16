<script context="module" lang="ts">
	import type { LoadInput } from '@sveltejs/kit';

	export function load(input: LoadInput) {
		const roomId = input.page.query.get('room');

		return {
			props: {
				roomId
			}
		};
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getOrCreateRoom, room } from '$lib/state/p2p';
	import { game } from '$lib/state/game';
	import { user } from '$lib/state/users';
	import Layout from '$lib/Layout.svelte';
	import { browser } from '$app/env';

	export let roomId: string;

	$: if (browser && !$game.started) {
		goto(`/lobby?room=${roomId}`);
	}

	onMount(() => {
		getOrCreateRoom(roomId);
	});
</script>

<Layout>
	<h1 class="text-2xl text-center mb-2">Room {$room?.getRoomId()}</h1>
	<h1 class="text-2xl text-center mb-2">Name: {$user?.name}</h1>
	<h1 class="text-2xl text-center mb-2">Team: {$user?.team}</h1>
	<h1 class="text-2xl text-center mb-2">Players: {$room?.getPeers().length || 0}</h1>
</Layout>
