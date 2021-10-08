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
	import Modal from '$lib/Modal.svelte';
	import QrCode from '$lib/QRCode.svelte';

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

	let showQrCode = false;
	let showExit = false;

	onMount(() => {
		getOrCreateRoom(roomId);
	});
</script>

<Layout>
	<h1 class="text-6xl text-center cursor-pointer" on:click={() => (showQrCode = true)}>
		{roomId}
	</h1>

	<div class="flex justify-center">
		<div class="btn md primary flex-1 text-center">
			{$game.team1}
		</div>
		<div class="btn md danger flex-1 text-center">
			{$game.team2}
		</div>
	</div>
	<h1 class="text-center">{isYourTurn ? 'Your' : turnName + "'s"} Turn</h1>
	<p class="text-2xl text-center">
		<Timer seconds={$game.timer} />
	</p>

	<div class="flex-grow flex flex-col justify-center">
		{#if isYourTurn}
			{#if $game.timer === 0}
				<div class="flex-1">
					<div class="flex justify-center">
						<button on:click={start} class="btn lg primary flex-1">Start</button>
					</div>
				</div>
			{:else}
				<div class="flex-1 flex h-full justify-center items-center">
					<div class="text-center">
						<p class="text-6xl">{$game.word}</p>
					</div>
				</div>

				<div class="flex-1">
					<div class="flex flex-1 justify-center">
						<button on:click={skipWord} class="btn lg danger flex-1">Skip</button>
						<button on:click={next} class="btn lg primary flex-1">Next</button>
					</div>
				</div>
			{/if}
		{/if}
	</div>

	<div class="flex justify-center">
		<button class="btn lg danger flex-1" on:click={() => (showExit = true)}>Leave</button>
	</div>
</Layout>

<Modal bind:show={showQrCode}>
	<QrCode value={location.href} />
</Modal>

<Modal bind:show={showExit}>
	<a href={`${base}/`} class="btn lg danger">Exit</a>
</Modal>
