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
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Layout from '$lib/Layout.svelte';
	import { browser } from '$app/env';
	import { base } from '$app/paths';
	import Modal from '$lib/Modal.svelte';
	import QrCode from '$lib/QRCode.svelte';
	import { username, loading } from '$lib/state/user';
	import { db } from '$lib/state/db';
	import type { IRoom } from '$lib/state/db';
	import { getWord, Words } from '$lib/state/words';
	import { XorShiftRng } from '@aicacia/rand';
	import { entries, keys } from '$lib/util';

	export let roomId: string;

	$: if (browser) {
		if (!$username && !$loading) {
			goto(`${base}/auth`);
		}
	}
	$: if (browser && started) {
		goto(`${base}/game?room=${roomId}`);
	}

	let users: [username: string, team: string][] = [];
	let started = false;
	let team1: number = 0;
	let team2: number = 0;
	let words: string;

	let showQrCode = false;
	let showExit = false;

	function onSelectWords(e: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
		db.get('rooms')
			.get(roomId)
			.get('words')
			.put(e.currentTarget.value as Words);
	}

	function createOnSetTeam(user: string, team: string, newTeam: string) {
		return function onSetTeam() {
			if (team !== newTeam) {
				db.get('rooms').get(roomId).get('users').get(user).put(newTeam);
			}
		};
	}

	async function onStartGame() {
		const dbRoom = db.get('rooms').get(roomId),
			dbUsers = dbRoom.get('users'),
			users = (await dbUsers) as unknown as Record<string, string>,
			room = (await dbRoom) as unknown as IRoom,
			rng = XorShiftRng.fromSeed(room.seed);

		dbRoom.get('turn').put(rng.fromArray(keys(users)).unwrap());
		dbRoom.get('word').put(await getWord(rng, room.words));
		dbRoom.get('started').put(true);
	}

	let prevUsername: string;
	$: if ($username && prevUsername !== $username) {
		const user = $username;
		db.get('rooms').get(roomId).get('users').get(user).put('team1');
		if (prevUsername) {
			db.get('rooms').get(roomId).get('users').get(prevUsername).put(null);
		}
		prevUsername = user;
	}

	onMount(() => {
		const dbRoom = db.get('rooms').get(roomId),
			dbUsers = dbRoom.get('users').on((state) => {
				users = entries(state).sort();
				team1 = users.filter(([, team]) => team === 'team1').length;
				team2 = users.length - team1;
			}),
			dbWords = dbRoom.get('words').on((state) => {
				words = state;
			}),
			dbStated = dbRoom.get('started').on((state) => {
				started = state;
			});

		dbRoom.once((state) => {
			if (!state.seed) {
				const seed = Date.now();
				dbRoom.put({
					seed,
					team1: 0,
					team2: 0,
					started: false,
					words: Words.Medium
				});
			}
		});

		return () => {
			dbUsers.off();
			dbWords.off();
			dbStated.off();
		};
	});
</script>

<Layout>
	<h1 class="text-6xl text-center cursor-pointer" on:click={() => (showQrCode = true)}>
		{roomId}
	</h1>
	<div class="mt-2">
		<label for="words">Words</label>
		<select id="words" value={words} on:change|preventDefault={onSelectWords} class="input">
			{#each Object.keys(Words) as word}
				<option value={Words[word]}>{word}</option>
			{/each}
		</select>
	</div>
	<div class="mt-2 mb-2">
		<div class="mt-2 mb-2 flex justify-center">
			<div class="btn md primary flex-1 text-center">
				{team1}
			</div>
			<div class="btn md danger flex-1 text-center">
				{team2}
			</div>
		</div>
		{#each users as [user, team], index (user)}
			<div class="flex justify-between" class:bg-gray-200={user === $username}>
				<div class="flex-grow">
					<p class="text-2xl p-1 font-bold">{index + 1} - {user}</p>
				</div>
				<form class="flex-grow-0 flex flex-row">
					<div class="btn sm primary flex-1" on:click={createOnSetTeam(user, team, 'team1')}>
						<input
							id={`${user}-1`}
							name="team"
							value="1"
							type="radio"
							class="align-bottom"
							on:click|preventDefault
							checked={team === 'team1'}
						/>
					</div>
					<div class="btn sm danger flex-1" on:click={createOnSetTeam(user, team, 'team2')}>
						<input
							id={`${user}-2`}
							name="team"
							value="2"
							type="radio"
							class="align-bottom"
							on:click|preventDefault
							checked={team === 'team2'}
						/>
					</div>
				</form>
			</div>
			<hr />
		{/each}
	</div>
	<div class="flex-grow" />
	<div class="flex justify-center">
		<button
			class="btn lg primary flex-1"
			class:bg-blue-100={users.length < 2}
			class:hover:bg-blue-500={users.length > 1}
			on:click={onStartGame}
			disabled={users.length < 2}>Start</button
		>
		<button class="btn lg danger flex-1" on:click={() => (showExit = true)}>Leave</button>
	</div>
</Layout>

<Modal bind:show={showQrCode}>
	<h3 slot="title">{roomId}</h3>
	<QrCode value={location.href} />
</Modal>

<Modal bind:show={showExit}>
	<a href={`${base}/`} class="btn lg danger">Exit</a>
</Modal>
