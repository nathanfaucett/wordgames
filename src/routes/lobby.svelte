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
	import { db } from '$lib/state/db';
	import type { IRoom, IUser } from '$lib/state/db';
	import { Words } from '$lib/state/words';
	import { XorShiftRng } from '@aicacia/rand';
	import { generateRoomId, keys } from '$lib/util';
	import { getUserId, userId } from '$lib/state/userId';

	export let roomId: string;

	$: if (browser && started) {
		goto(`${base}/game?room=${roomId}`);
	}

	let users: [userId: string, user: IUser][] = [];
	$: team1 = users.filter(([, user]) => user.team === 'team1').length;
	$: team2 = users.length - team1;
	let started = false;
	let words: string;

	let showQrCode = false;
	let showExit = false;

	let username = `guest-${generateRoomId()}`;
	async function onChangeName() {
		const userId = await getUserId();
		db.get('rooms').get(roomId).get('users').get(userId).get('name').put(username);
	}

	function onSelectWords(e: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
		db.get('rooms')
			.get(roomId)
			.get('words')
			.put(e.currentTarget.value as Words);
	}

	function createOnSetTeam(userId: string, team: string, newTeam: string) {
		return function onSetTeam() {
			if (team !== newTeam) {
				db.get('rooms').get(roomId).get('users').get(userId).get('team').put(newTeam);
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
		dbRoom.get('started').put(true);
	}

	let prevUserId: string;
	$: if ($userId && prevUserId !== $userId) {
		const id = $userId;
		db.get('rooms').get(roomId).get('users').get(id).get('team').put('team1');
		if (prevUserId) {
			db.get('rooms').get(roomId).get('users').get(prevUserId).put(null);
		}
		prevUserId = id;
	}

	onMount(() => {
		const dbRoom = db.get('rooms').get(roomId),
			dbUsers = dbRoom.get('users').on(async (state) => {
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
				).sort();
			}),
			dbWords = dbRoom.get('words').on((state) => {
				words = state;
			}),
			dbStated = dbRoom.get('started').on((state) => {
				started = state;
			});

		getUserId().then((userId) =>
			dbRoom
				.get('users')
				.get(userId)
				.get('name')
				.once((state) => {
					const name = state as unknown as string;
					if (name) {
						username = name;
					}
				})
		);
		dbRoom.once((state) => {
			if (!state?.seed) {
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

		onChangeName();

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
		<label for="name">Name</label>
		<input class="input" bind:value={username} on:input={onChangeName} />
	</div>
	<div>
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
		{#each users as [id, user], index (id)}
			<div class="flex justify-between" class:bg-gray-200={id === $userId}>
				<div class="flex-grow">
					<p class="text-2xl p-1 font-bold">{index + 1} - {user.name}</p>
				</div>
				<form class="flex-grow-0 flex flex-row">
					<div class="btn sm primary flex-1" on:click={createOnSetTeam(id, user.team, 'team1')}>
						<input
							id={`${id}-team-1`}
							name="team"
							value="1"
							type="radio"
							class="align-bottom"
							on:click|preventDefault
							checked={user.team === 'team1'}
						/>
					</div>
					<div class="btn sm danger flex-1" on:click={createOnSetTeam(id, user.team, 'team2')}>
						<input
							id={`${id}-team-2`}
							name="team"
							value="2"
							type="radio"
							class="align-bottom"
							on:click|preventDefault
							checked={user.team === 'team2'}
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
	<h2 slot="title">{roomId}</h2>
	<QrCode value={location.href} />
</Modal>

<Modal bind:show={showExit}>
	<a href={`${base}/`} class="btn lg danger">Exit</a>
</Modal>
