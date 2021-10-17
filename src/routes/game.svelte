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
	import type { IUser } from '$lib/state/db';
	import { db, IRoom } from '$lib/state/db';
	import { XorShiftRng } from '@aicacia/rand';
	import { getWord } from '$lib/state/words';
	import { keys } from '$lib/util';
	import { userId } from '$lib/state/userId';

	export let roomId: string;

	let users: { [userId: string]: IUser } = {};
	let team1: number;
	let team2: number;
	let turn: string;
	let playing = false;
	let started = true;
	$: isYourTurn = turn === $userId;
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

	async function onStart() {
		await onSkipWord();
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
			users = keys((await dbUsers) as unknown as Record<string, IUser>).sort();

		dbRoom.get('turn').put(users[(users.indexOf(turn) + 1) % users.length]);
		ticking.stop();
		await onSkipWord();
	}

	let timerInterval: NodeJS.Timeout;
	function startTimer(startTime: number = DEFAULT_TIME) {
		if (timerInterval != null) {
			return;
		}
		const dbTimer = db.get('rooms').get(roomId).get('timer');

		timerInterval = setInterval(async () => {
			const currentTime = (await dbTimer) as unknown as number;

			if (currentTime === 0) {
				stopTimer();
			} else {
				const nextTime = currentTime - 1;
				ticking.rate(1 + (1 - nextTime / DEFAULT_TIME));
				dbTimer.put(nextTime);
			}
		}, 1000);

		ticking.rate(1 + (1 - startTime / DEFAULT_TIME));
		if (!ticking.playing()) {
			ticking.play();
		}
		dbTimer.put(startTime);
	}

	function stopTimer() {
		if (timerInterval == null) {
			return;
		}
		const dbRoom = db.get('rooms').get(roomId),
			dbUser = dbRoom.get('users').get(turn),
			dbTimer = dbRoom.get('timer');

		Promise.all([dbRoom as unknown as Promise<IRoom>, dbUser as unknown as Promise<IUser>]).then(
			([room, user]) => {
				if (user.team === 'team1') {
					dbRoom.get('team2').put(room.team1 + 1);
				} else {
					dbRoom.get('team1').put(room.team2 + 1);
				}
			}
		);

		dbTimer.put(0);
		(dbRoom.get('playing').put(false) as unknown as Promise<void>).then(() => {
			timerInterval = undefined;
		});
		clearInterval(timerInterval);

		ticking.stop();
		alarm.play();
	}

	onMount(() => {
		const dbRoom = db.get('rooms').get(roomId);

		const dbUsers = dbRoom.get('users').on(async (state) => {
				users = (
					await Promise.all(
						keys(state).map(
							(userId) =>
								new Promise<[userId: string, user: IUser]>((resolve) =>
									dbRoom
										.get('users')
										.get(userId)
										.once((user) =>
											resolve([userId, user] as unknown as [userId: string, user: IUser])
										)
								)
						)
					)
				).reduce(
					(acc, [userId, user]) => ({
						...acc,
						[userId]: user
					}),
					{}
				);
			}),
			dbTimer = dbRoom.get('timer').on((state) => {
				timer = state;
			}),
			dbStarted = dbRoom.get('started').on((state) => {
				started = state;
			}),
			dbTeam1 = dbRoom.get('team1').on((state) => {
				team1 = state;
			}),
			dbTeam2 = dbRoom.get('team2').on((state) => {
				team2 = state;
			}),
			dbWord = dbRoom.get('word').on((state) => {
				word = state;
			}),
			dbTurn = dbRoom.get('turn').on((state) => {
				turn = state;
			}),
			dbPlaying = dbRoom.get('playing').on((state) => {
				playing = state;
			});

		return () => {
			dbUsers.off();
			dbTimer.off();
			dbStarted.off();
			dbTeam1.off();
			dbTeam2.off();
			dbWord.off();
			dbTurn.off();
			dbPlaying.off();

			ticking.stop();
			alarm.stop();
		};
	});
</script>

<Layout>
	<h1 class="text-6xl text-center cursor-pointer" on:click={() => (showQrCode = true)}>
		{roomId}
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
		class:bg-blue-500={users[$userId]?.team === 'team1'}
		class:bg-red-500={users[$userId]?.team === 'team2'}
	>
		{#if isYourTurn}
			Your Turn
		{:else if users[$userId]?.team === users[turn]?.team}
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
	<h2 slot="title">{roomId}</h2>
	<QrCode value={location.href} />
</Modal>

<Modal bind:show={showExit}>
	<a href={`${base}/`} class="btn lg danger">Exit</a>
</Modal>
