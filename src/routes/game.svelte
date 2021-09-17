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
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { getOrCreateRoom, room } from '$lib/state/p2p';
	import { game, next, skipWord, startTimer, start } from '$lib/state/game';
	import { user, users } from '$lib/state/users';
	import Layout from '$lib/Layout.svelte';
	import { browser } from '$app/env';
	import Timer from '$lib/Timer.svelte';

	export let roomId: string;

	$: turnName = $users?.byId[$game?.turn]?.name;
	$: isYourTurn = $game?.turn === $user?.id;
	let prevIsYourTurn: boolean;

	$: if (browser && !$game.started) {
		goto(`${base}/lobby?room=${roomId}`);
	}

	$: if (prevIsYourTurn !== isYourTurn) {
		prevIsYourTurn = isYourTurn;

		if (isYourTurn && $game.timer === 0) {
			startTimer();
		}
	}

	onMount(() => {
		getOrCreateRoom(roomId);
	});
</script>

<Layout>
	<h1 class="text-2xl text-center mb-2">
		Room {$room?.getRoomId()}
	</h1>
	<h1 class="text-2xl text-center mb-2">
		Team 1: {$game.team1}, Team 2: {$game?.team2}
	</h1>
	<h1 class="text-2xl text-center mb-2">{isYourTurn ? 'Your' : turnName + "'s"} Turn</h1>

	<p class="text-2xl text-center">
		<Timer seconds={$game.timer} />
	</p>

	{#if isYourTurn}
		{#if $game.timer === 0}
			<div class="flex mt-4 justify-center">
				<button
					on:click={start}
					class="bg-blue-600 hover:bg-blue-500 text-white text-lg mt-4 py-2 px-8">Start</button
				>
			</div>
		{:else}
			<p class="text-5xl text-center mb-2">{$game.word}</p>

			<div class="flex mt-4 justify-center">
				<button
					on:click={skipWord}
					class="bg-red-600 hover:bg-red-500 text-white text-lg mt-4 py-2 px-8">Skip</button
				>
			</div>
			<div class="flex mt-4 justify-center">
				<button
					on:click={next}
					class="bg-blue-600 hover:bg-blue-500 text-white text-lg mt-4 py-2 px-8">Next</button
				>
			</div>
		{/if}
	{/if}
	<div class="flex mt-4 justify-center">
		<a href={`${base}/`} class="bg-blue-600 hover:bg-blue-500 text-white text-lg mt-4 py-2 px-8"
			>Exit</a
		>
	</div>
</Layout>
