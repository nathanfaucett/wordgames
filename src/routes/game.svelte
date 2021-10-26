<script context="module" lang="ts">
	import type { LoadInput } from '@sveltejs/kit';

	export const ssr = false;

	export function load(input: LoadInput) {
		const roomId = input.page.query.get('room');

		return {
			props: {
				roomId
			}
		};
	}

	const DEFAULT_TIME = 60;

	const alarm = new Howl({
		src: [`${base}/sounds/alarm-clock.mp3`, `${base}/sounds/alarm-clock.wav`]
	});
	const ticking = new Howl({
		src: [`${base}/sounds/ticking.mp3`, `${base}/sounds/ticking.wav`],
		loop: true
	});
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { Howl } from 'howler';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import Layout from '$lib/Layout.svelte';
	import { browser } from '$app/env';
	import Timer from '$lib/Timer.svelte';
	import Modal from '$lib/Modal.svelte';
	import QrCode from '$lib/QRCode.svelte';
	import { getOrCreateRoom, IUser, IUsers } from '$lib/state/rooms';
	import { rooms } from '$lib/state/rooms';
	import { XorShiftRng } from '@aicacia/rand';
	import { getWord, Words } from '$lib/state/words';
	import { userId } from '$lib/state/userId';
	import type { Map } from 'yjs';
	import { sortById } from '$lib/util';

	export let roomId: string;

	$: room = getOrCreateRoom($rooms, roomId);
	$: users = room.get('users') as Map<IUsers[keyof IUsers]>;
	$: userList = Array.from(users.entries()).sort(sortById) as [
		id: string,
		user: Map<IUser[keyof IUser]>
	][];
	$: team1 = (room.get('team1') as number) || 0;
	$: team2 = (room.get('team2') as number) || 0;
	$: started = (room.get('started') as boolean) || true;
	$: playing = (room.get('playing') as boolean) || false;
	$: turn = room.get('turn') as string;
	$: isYourTurn = turn === $userId;
	$: timer = room.get('timer') as number;
	$: word = room.get('word') as string;

	$: if (browser && !started) {
		goto(`${base}/lobby?room=${roomId}`);
	}

	$: if (isYourTurn && playing) {
		startTimer(timer === 0 ? DEFAULT_TIME : timer);
	} else if (timerInterval != null) {
		clearInterval(timerInterval);
		timerInterval = undefined;
	}

	let showQrCode = false;
	let showExit = false;

	$: onStart = async () => {
		await onSkipWord();
		room.set('playing', true);
	};
	$: onSkipWord = async () => {
		const rng = XorShiftRng.fromSeed(room.get('seed') as number),
			word = await getWord(rng, room.get('words') as Words);

		room.set('word', word);
		room.set('seed', rng.nextInt());
	};
	$: onNext = async () => {
		const [turnId] = userList[(userList.findIndex(([id]) => turn === id) + 1) % users.size];
		room.set('turn', turnId);
		ticking.stop();
		await onSkipWord();
	};

	let timerInterval: NodeJS.Timeout;
	$: startTimer = (startTime: number = DEFAULT_TIME) => {
		if (timerInterval != null) {
			return;
		}
		timerInterval = setInterval(async () => {
			const currentTime = room.get('timer') as number;

			if (currentTime === 0) {
				stopTimer();
			} else {
				const nextTime = currentTime - 1;
				ticking.rate(1 + (1 - nextTime / DEFAULT_TIME));
				room.set('timer', nextTime);
			}
		}, 1000);

		ticking.rate(1 + (1 - startTime / DEFAULT_TIME));
		if (!ticking.playing()) {
			ticking.play();
		}
		room.set('timer', startTime);
	};

	$: stopTimer = () => {
		if (timerInterval == null) {
			return;
		}
		const user = users.get(turn);

		if (user.get('team') === 'team1') {
			room.set('team2', ((room.get('team2') as number) || 0) + 1);
		} else {
			room.set('team1', ((room.get('team1') as number) || 0) + 1);
		}

		room.set('timer', 0);
		room.set('playing', false);
		clearInterval(timerInterval);
		timerInterval = undefined;

		ticking.stop();
		alarm.play();
	};

	onMount(() => {
		return () => {
			ticking.stop();
			alarm.stop();
		};
	});
</script>

<svelte:head>
	<title>Word Games!: Playing Game in {roomId}</title>
</svelte:head>

<Layout>
	<h1 class="text-center cursor-pointer" on:click={() => (showQrCode = true)}>
		Room Id {roomId}
	</h1>

	<div class="flex justify-center mt-2">
		<div class="btn md primary flex-1 text-center">
			{team1}
		</div>
		<div class="btn md danger flex-1 text-center">
			{team2}
		</div>
	</div>
	<h1
		class="text-center text-white rounded py-4 my-4"
		class:bg-blue-500={users.get($userId)?.get('team') === 'team1'}
		class:bg-red-500={users.get($userId)?.get('team') === 'team2'}
	>
		{#if isYourTurn}
			Your Turn
		{:else if users.get($userId)?.get('team') === users.get(turn)?.get('team')}
			{users.get(turn)?.get('name')} and your Team's turn
		{:else}
			{users.get(turn)?.get('name')}'s turn
		{/if}
	</h1>
	<p class="text-2xl text-center">
		<Timer seconds={timer} />
	</p>

	<div class="flex-grow flex flex-col justify-center">
		{#if isYourTurn}
			{#if !playing}
				<div class="flex-1">
					<div class="flex justify-center">
						<button on:click={onStart} class="btn lg primary flex-1">Start</button>
					</div>
				</div>
			{:else}
				<div class="flex-1 flex h-full justify-center items-center">
					<div class="text-center">
						<p class="text-6xl">{word}</p>
					</div>
				</div>

				<div class="flex-1">
					<div class="flex flex-1 justify-center">
						<button on:click={onSkipWord} class="btn lg danger flex-1">Skip</button>
						<button on:click={onNext} class="btn lg primary flex-1">Next</button>
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
	<h2 slot="title">Room Id {roomId}</h2>
	<QrCode value={location.href} />
</Modal>

<Modal bind:show={showExit}>
	<a href={`${base}/`} class="btn lg danger">Exit</a>
</Modal>
