<script context="module" lang="ts">
	export const prerender = true;

	export function load(input: LoadInput) {
		const roomId = input.url.searchParams.get('room');

		return {
			props: {
				roomId
			}
		};
	}

	const DEFAULT_TIME = 30;

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
	import type { IUser, IUsers } from '$lib/state/rooms';
	import { graph } from '$lib/state/rooms';
	import { XorShiftRng } from '@aicacia/rand';
	import { getWord, Words } from '$lib/state/words';
	import { userId } from '$lib/state/userId';
	import { sortById } from '$lib/util';
	import type { LoadInput } from '@sveltejs/kit/types/internal';

	export let roomId: string;

	$: if (browser && !started) {
		goto(`${base}/lobby?room=${roomId}`);
	}

	$: currentUserId = $userId;
	$: room = graph.get('rooms').get(roomId);

	let users: IUsers = {};
	$: userList = Array.from(Object.entries(users)).sort(sortById) as [id: string, user: IUser][];
	let words = Words.Medium;
	let seed = Date.now();
	let team1 = 0;
	let team2 = 0;
	let started = true;
	let playing = false;
	let turn = '';
	$: isYourTurn = turn === currentUserId;
	let timer = 0;
	let word = '';

	$: if (isYourTurn && playing) {
		startTimer(timer === 0 ? DEFAULT_TIME : timer);
	} else if (timerInterval != null) {
		clearInterval(timerInterval as number);
		timerInterval = undefined;
	}

	let showQrCode = false;
	let showExit = false;

	$: onStart = async () => {
		await onSkipWord();
		room.get('playing').set(true);
	};
	$: onSkipWord = async () => {
		const rng = XorShiftRng.fromSeed(seed),
			word = await getWord(rng, words);

		room.get('word').set(word);
		room.get('seed').set(rng.nextInt());
	};
	$: onNext = async () => {
		const [turnId] = userList[(userList.findIndex(([id]) => turn === id) + 1) % userList.length];
		room.get('turn').set(turnId);
		ticking.stop();
		await onSkipWord();
	};

	let timerInterval: unknown | undefined;
	$: startTimer = (startTime: number = DEFAULT_TIME) => {
		if (timerInterval != null) {
			return;
		}
		timerInterval = setInterval(() => {
			const currentTime = timer;

			if (currentTime === 0) {
				stopTimer();
			} else {
				const nextTime = currentTime - 1;
				ticking.rate(1 + (1 - nextTime / DEFAULT_TIME));
				room.get('timer').set(nextTime);
			}
		}, 1000);

		ticking.rate(1 + (1 - startTime / DEFAULT_TIME));
		if (!ticking.playing()) {
			ticking.play();
		}
		room.get('timer').set(startTime);
	};

	$: stopTimer = () => {
		if (timerInterval == null) {
			return;
		}
		const user = users[turn];

		if (user.team === 'team1') {
			room.get('team2').set(team2 + 1);
		} else {
			room.get('team1').set(team1 + 1);
		}

		room.get('timer').set(0);
		room.get('playing').set(false);
		clearInterval(timerInterval as number);
		timerInterval = undefined;
		playing = false;

		ticking.stop();
		alarm.play();
	};

	onMount(() => {
		const removeCallbacks = [
			room.get('seed').on((state) => {
				seed = state as number;
			}),
			room.get('started').on((state) => {
				started = state as boolean;
			}),
			room.get('playing').on((state) => {
				playing = state as boolean;
			}),
			room.get('team1').on((state) => {
				team1 = state as number;
			}),
			room.get('team2').on((state) => {
				team2 = state as number;
			}),
			room.get('words').on((state) => {
				words = state as Words;
			}),
			room.get('word').on((state) => {
				word = state as string;
			}),
			room.get('turn').on((state) => {
				turn = state as string;
			}),
			room.get('timer').on((state) => {
				timer = state as number;
			}),
			room.get('users').on(async (state) => {
				users = (await Promise.all(Object.values(state))).reduce((acc, user) => {
					acc[user.id] = user;
					return acc;
				}, {} as IUsers);
			})
		];

		setTimeout(() => {
			if (userList.length < 2) {
				started = false;
			}
		}, 3000);

		return () => {
			ticking.stop();
			alarm.stop();
			removeCallbacks.forEach((removeCallback) => removeCallback());
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
		class:bg-blue-500={users[currentUserId]?.team === 'team1'}
		class:bg-red-500={users[currentUserId]?.team === 'team2'}
	>
		{#if isYourTurn}
			Your Turn
		{:else if users[currentUserId]?.team === users[turn]?.team}
			{users[turn]?.name} and your Team's turn
		{:else}
			{users[turn]?.name}'s turn
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
