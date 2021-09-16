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
	import { game, getGameState } from '$lib/state/game';
	import { goto } from '$app/navigation';
	import Layout from '$lib/Layout.svelte';
	import { browser } from '$app/env';

	export let roomId: string;
	let name: string;

	$: usersSort = (a: IUser, b: IUser) => (a.id === $user?.id ? -1 : b.id === $user?.id ? 1 : 0);
	$: userList = Object.values($users.byId).sort(usersSort);

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
		goto(`/game?room=${roomId}`);
	}

	async function onStart() {
		const gameState = await getGameState();

		gameState.change((state) => {
			state.started = true;
		});
	}

	let nameInput: HTMLInputElement;

	function createOnSetTeam(user: IUser, team: Team) {
		return function onSetTeam(e: Event) {
			e.preventDefault();

			if (user.team !== team) {
				getUsersState().then((usersState) =>
					usersState.change((users) => {
						users.byId[user.id].team = team;
					})
				);
			}
		};
	}

	function countTeam(users: IUser[], team: Team) {
		return users.filter((user) => user.team === team).length;
	}

	onMount(() => {
		getOrCreateRoom(roomId);
	});
</script>

<Layout>
	<h1 class="text-5xl text-center mb-4">Room {roomId}</h1>
	<div class="max-w-sm mx-auto">
		<input
			bind:this={nameInput}
			class="bg-gray-200 focus:bg-white w-full py-2 px-4"
			type="text"
			placeholder="Enter Name"
			bind:value={name}
			on:change={onChange}
		/>
	</div>
	<div class="mt-2 mb-4 max-w-md mx-auto">
		<h1 class="text-3xl text-center mb-2">
			Team 1: {countTeam(userList, 1)} - Team 2: {countTeam(userList, 2)}
		</h1>
		{#each userList as user}
			<div class="grid grid-cols-2">
				<div class="text-left">
					<p class="text-2xl mb-2 font-bold">{user.name}</p>
				</div>
				<form class="text-right">
					<div
						class="bg-blue-600 hover:bg-blue-500 text-white inline-block cursor-pointer py-2 px-4"
						class:bg-blue-300={user.team === 2}
					>
						<label for={`${user.id}-1`} class="cursor-pointer">Team 1</label>
						<input
							id={`${user.id}-1`}
							name="team"
							value="1"
							type="radio"
							class="ml-2 cursor-pointer"
							on:click={createOnSetTeam(user, 1)}
							checked={user.team === 1}
						/>
					</div>
					<div
						class="bg-blue-600 hover:bg-blue-500 text-white inline-block cursor-pointer py-2 px-4"
						class:bg-blue-300={user.team === 1}
					>
						<label for={`${user.id}-2`} class="cursor-pointer">Team 2</label>
						<input
							id={`${user.id}-2`}
							name="team"
							value="2"
							type="radio"
							class="ml-2 cursor-pointer"
							on:click={createOnSetTeam(user, 2)}
							checked={user.team === 2}
						/>
					</div>
				</form>
			</div>
		{/each}
	</div>
	<div class="text-center">
		<button
			class="bg-blue-600 text-white text-lg py-2 px-4"
			class:bg-blue-100={userList.length < 2}
			class:hover:bg-blue-500={userList.length > 1}
			on:click={onStart}
			disabled={userList.length < 2}>Start</button
		>
	</div>
</Layout>
