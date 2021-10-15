<script context="module" lang="ts">
	import type { LoadInput } from '@sveltejs/kit';

	const DEFAULT_TIME = 60;

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
	import Layout from '$lib/Layout.svelte';
	import { browser } from '$app/env';
	import Timer from '$lib/Timer.svelte';
	import Modal from '$lib/Modal.svelte';
	import QrCode from '$lib/QRCode.svelte';
	import { loading, username } from '$lib/state/user';
	import { db, IRoom } from '$lib/state/db';
	import { get } from 'svelte/store';
	import { XorShiftRng } from '@aicacia/rand';
	import { getWord } from '$lib/state/words';
	import { keys } from '$lib/util';

	export let roomId: string;

	$: if (browser) {
		if (!$username && !$loading) {
			goto(`${base}/auth`);
		}
	}

	let team1: number;
	let team2: number;
	let turn: string;
	let playing = false;
	let started = true;
	let isYourTurn = false;
	let timer;
	let word: string;

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

	function onStart() {
		startTimer(DEFAULT_TIME);
		onSkipWord();
		db.get('rooms').get(roomId).get('playing').put(true);
	}
	async function onSkipWord() {
		const dbRoom = db.get('rooms').get(roomId),
			room = (await dbRoom) as unknown as IRoom,
			rng = XorShiftRng.fromSeed(room.seed),
			word = await getWord(rng, room.words);

		dbRoom.get('word').put(word);
		dbRoom.get('seed').put(rng.nextInt());
	}
	async function onNext() {
		const dbRoom = db.get('rooms').get(roomId),
			dbUsers = dbRoom.get('users'),
			users = keys((await dbUsers) as unknown as Record<string, string>).sort();

		dbRoom.get('turn').put(users[(users.indexOf(turn) + 1) % users.length]);
		await onSkipWord();
	}

	let timerInterval: NodeJS.Timeout;
	function startTimer(startTime: number = DEFAULT_TIME) {
		if (timerInterval != null) {
			return;
		}
		const dbTimer = db.get('rooms').get(roomId).get('timer');

		dbTimer.put(startTime);

		timerInterval = setInterval(async () => {
			const currentTimer = (await dbTimer) as unknown as number;

			if (currentTimer === 0) {
				stopTimer();
			} else {
				dbTimer.put(currentTimer - 1);
			}
		}, 1000);
	}

	function stopTimer() {
		if (timerInterval == null) {
			return;
		}
		const dbRoom = db.get('rooms').get(roomId),
			dbUsers = dbRoom.get('users'),
			dbTimer = dbRoom.get('timer');

		Promise.all([
			dbRoom as unknown as Promise<IRoom>,
			dbUsers as unknown as Promise<Record<string, string>>
		]).then(([room, users]) => {
			if (users[turn] === 'team1') {
				dbRoom.get('team1').put(room.team1 + 1);
			} else {
				dbRoom.get('team2').put(room.team2 + 1);
			}
		});

		dbRoom.get('playing').put(false);
		clearInterval(timerInterval);
		timerInterval = undefined;
		dbTimer.put(0);
	}

	onMount(() => {
		const room = db.get('rooms').get(roomId);

		const dbTimer = room.get('timer').on((state) => {
				timer = state;
			}),
			dbStarted = room.get('started').on((state) => {
				started = state;
			}),
			dbTeam1 = room.get('team1').on((state) => {
				team1 = state;
			}),
			dbTeam2 = room.get('team2').on((state) => {
				team2 = state;
			}),
			dbWord = room.get('word').on((state) => {
				word = state;
			}),
			dbTurn = room.get('turn').on((state) => {
				turn = state;
				isYourTurn = turn === get(username);
			}),
			dbPlaying = room.get('playing').on((state) => {
				playing = state;
			});

		return () => {
			dbTimer.off();
			dbStarted.off();
			dbTeam1.off();
			dbTeam2.off();
			dbWord.off();
			dbTurn.off();
			dbPlaying.off();
		};
	});
</script>

<Layout>
	<h1 class="text-6xl text-center cursor-pointer" on:click={() => (showQrCode = true)}>
		{roomId}
	</h1>

	<div class="flex justify-center">
		<div class="btn md primary flex-1 text-center">
			{team1}
		</div>
		<div class="btn md danger flex-1 text-center">
			{team2}
		</div>
	</div>
	<h1 class="text-center">{isYourTurn ? 'Your' : turn + "'s"} Turn</h1>
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
	<QrCode value={location.href} />
</Modal>

<Modal bind:show={showExit}>
	<a href={`${base}/`} class="btn lg danger">Exit</a>
</Modal>
