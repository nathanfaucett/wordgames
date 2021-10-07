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
	import { getOrCreateRoom, getPeerId } from '$lib/state/p2p';
	import { emptyUser, getUsersState, IUser, Team, user, users } from '$lib/state/users';
	import { game, getGameState, startGame, Words } from '$lib/state/game';
	import { goto } from '$app/navigation';
	import Layout from '$lib/Layout.svelte';
	import { browser } from '$app/env';
	import { base } from '$app/paths';
	import Modal from '$lib/Modal.svelte';
	import QrCode from '$lib/QRCode.svelte';

	export let roomId: string;
	let name: string;

	$: userId = $user?.id;
	$: usersSort = (a: IUser, b: IUser) => a.id.localeCompare(b.id);
	$: userList = Object.values($users?.byId || {}).sort(usersSort);

	async function onChange() {
		const usersState = await getUsersState(),
			id = getPeerId();

		if (id) {
			usersState.change((users) => {
				const user = users.byId[id] || (users.byId[id] = emptyUser(id));
				user.name = name;
			});
		}
	}

	$: if (browser && $game.started) {
		goto(`${base}/game?room=${roomId}`);
	}

	let nameInput: HTMLInputElement;

	function createOnSetTeam(user: IUser, team: Team) {
		return async function onSetTeam(e: Event) {
			if (user.team !== team) {
				const usersState = await getUsersState();

				usersState.change((users) => {
					users.byId[user.id].team = team;
				});
			}
		};
	}

	function countTeam(users: IUser[], team: Team) {
		return users.filter((user) => user.team === team).length;
	}

	$: onSelectWords = async (e: Event & { currentTarget: EventTarget & HTMLSelectElement }) => {
		const words = e.currentTarget.value as Words;

		if (words !== $game.words) {
			const gameState = await getGameState();

			gameState.change((game) => {
				game.words = words;
			});
		}
	};

	let showQrCode = false;
	let showExit = false;

	onMount(() => {
		getOrCreateRoom(roomId);
	});
</script>

<h1 class="text-6xl text-center cursor-pointer" on:click={() => (showQrCode = true)}>
	{roomId}
</h1>

<Modal bind:show={showQrCode}>
	<QrCode value={location.href} />
</Modal>

<Modal bind:show={showExit}>
	<a href={`${base}/`} class="btn lg danger">Exit</a>
</Modal>

<Layout>
	<div class="mt-2">
		<label for="name">Name</label>
		<input
			bind:this={nameInput}
			id="name"
			class="input"
			type="text"
			placeholder="Enter Name"
			bind:value={name}
			on:change={onChange}
		/>
	</div>
	<div class="mt-2">
		<label for="words">Words</label>
		<select id="words" value={$game.words} on:change|preventDefault={onSelectWords} class="input">
			{#each Object.keys(Words) as word}
				<option value={Words[word]}>{word}</option>
			{/each}
		</select>
	</div>
	<div class="mt-2 mb-2">
		<div class="mt-2 mb-2 flex justify-center">
			<div class="btn md primary flex-1 text-center">
				{countTeam(userList, 1)}
			</div>
			<div class="btn md danger flex-1 text-center">
				{countTeam(userList, 2)}
			</div>
		</div>
		{#each userList as user, index}
			<div class="flex justify-between" class:bg-gray-200={userId === user.id}>
				<div class="flex-grow">
					<p class="text-2xl p-1 font-bold">{index + 1} - {user.name}</p>
				</div>
				<form class="flex-grow-0">
					<div class="btn sm primary inline-block" on:click={createOnSetTeam(user, 1)}>
						<input
							id={`${user.id}-1`}
							name="team"
							value="1"
							type="radio"
							on:click|preventDefault
							checked={user.team === 1}
						/>
					</div>
					<div class="btn sm danger inline-block" on:click={createOnSetTeam(user, 2)}>
						<input
							id={`${user.id}-2`}
							name="team"
							value="2"
							type="radio"
							on:click|preventDefault
							checked={user.team === 2}
						/>
					</div>
				</form>
			</div>
			<hr />
		{/each}
	</div>
	<div class="mt-2 flex justify-center">
		<button
			class="btn lg primary flex-1"
			class:bg-blue-100={userList.length < 2}
			class:hover:bg-blue-500={userList.length > 1}
			on:click={startGame}
			disabled={userList.length < 2}>Start</button
		>
		<button class="btn lg danger flex-1" on:click={() => (showExit = true)}>Leave</button>
	</div>
</Layout>
