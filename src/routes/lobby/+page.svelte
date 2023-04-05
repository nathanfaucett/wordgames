<script context="module" lang="ts">
	function onShare() {
		if (navigator && navigator.share) {
			navigator
				.share({
					title: document.title,
					text: 'Join my Game!',
					url: location.href
				})
				.then(() => createToast('Successful shared!', 'success'))
				.catch((err) => createToast(err.message, 'error'));
		} else if (navigator && navigator.clipboard) {
			navigator.clipboard
				.writeText(location.href)
				.then(() => createToast('Successful Copied!', 'success'));
		} else if ('execCommand' in document) {
			const element = document.createElement('input');
			element.style.display = 'none';
			element.textContent = location.href;
			document.body.appendChild(element);
			element.select();
			document.execCommand('copy');
			document.body.removeChild(element);
		}
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import Layout from '$lib/Layout.svelte';
	import { base } from '$app/paths';
	import Modal from '$lib/Modal.svelte';
	import QrCode from '$lib/QRCode.svelte';
	import type { IUser, IUsers } from '$lib/state/rooms';
	import { graph } from '$lib/state/rooms';
	import { Words } from '$lib/state/words';
	import { XorShiftRng } from '@aicacia/rand';
	import { generateRoomId, sortById } from '$lib/util';
	import { userId } from '$lib/state/userId';
	import { createToast } from '$lib/state/toasts';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { PageData } from './$types';

	export let data: PageData;

	$: currentUserId = $userId;
	$: room = graph.get('rooms').get(data.room);
	$: user = room.get('users').get(currentUserId);

	$: if (browser && started && data.room) {
		goto(`${base}/game?room=${data.room}`);
	}

	let users: IUsers = {};
	$: userList = Array.from(Object.entries(users)).sort(sortById) as [id: string, user: IUser][];
	$: team1 = userList.filter(([_, user]) => !user.team || user.team === 'team1').length;
	$: team2 = userList.length - team1;
	let started = false;
	let words = Words.Medium;
	let seed = Date.now();
	let showQrCode = false;
	let showExit = false;
	let starting = false;

	let username = `guest-${generateRoomId()}`;
	$: onChangeName = () => {
		user.get('name').set(username);
	};

	$: onSelectWords = (e: Event & { currentTarget: EventTarget & HTMLSelectElement }) => {
		room.get('words').set(e.currentTarget.value as Words);
	};

	$: createOnSetTeam = (userId: string, team: string, newTeam: string) => () => {
		if (team !== newTeam) {
			room.get('users').get(userId).get('team').set(newTeam);
		}
	};

	$: onStartGame = async () => {
		const rng = XorShiftRng.fromSeed(seed);
		room.get('turn').set(rng.fromArray(Object.keys(users)).unwrapOr(currentUserId));
		room.get('started').set(true);
	};

	let prevUserId: string;
	$: if (currentUserId && prevUserId !== currentUserId) {
		const id = currentUserId;
		if (prevUserId) {
			room
				.get('users')
				.get(prevUserId)
				.set(null as any);
		}
		room.get('users').get(id).set({
			id,
			name: username,
			team: 'team1'
		});
		prevUserId = id;
	}

	onMount(() => {
		const removeCallbacks = [
			room.get('seed').on((state) => {
				seed = state as number;
			}),
			room.get('started').on((state) => {
				started = state as boolean;
			}),
			room.get('words').on((state) => {
				words = state as Words;
			}),
			room.get('users').on(async (state) => {
				if (!state) {
					return;
				}
				users = (await Promise.all(Object.values(state))).reduce((acc, user) => {
					if (user) {
						acc[user.id] = user;
					}
					return acc;
				}, {} as IUsers);
			})
		];

		room.get('users').get(currentUserId).set({
			id: currentUserId,
			name: username,
			team: 'team1'
		});

		return () => {
			removeCallbacks.forEach((removeCallback) => removeCallback());
		};
	});
</script>

<svelte:head>
	<title>Word Games!: Lobby {data.room}</title>
</svelte:head>

<Layout>
	<h1 class="text-center cursor-pointer" on:click={() => (showQrCode = true)}>
		Room Id {data.room}
	</h1>
	<div class="mt-2 flex flex-row">
		<label for="name" class="flex flex-shrink">Name</label>
		<input class="flex-grow" bind:value={username} on:input={onChangeName} />
	</div>
	<div class="mt-2 flex flex-row">
		<label for="words" class="flex flex-shrink">Words</label>
		<select
			id="words"
			class="input flex-grow"
			value={words}
			on:change|preventDefault={onSelectWords}
		>
			{#each Object.keys(Words) as word}
				<option value={Words[word]}>{word}</option>
			{/each}
		</select>
	</div>
	<div class="flex">
		<button class="btn md primary w-full mb-2" on:click={onShare}>Share Game {data.room}</button>
	</div>
	<div class="mt-2 mb-2">
		<h2 class="text-center">
			Teams (You are on {users[currentUserId]?.team === 'team1' ? 'Blue' : 'Red'})
		</h2>
		<div class="mt-2 mb-2 flex justify-center">
			<div class="btn md primary flex-1 text-center">
				{team1}
			</div>
			<div class="btn md danger flex-1 text-center">
				{team2}
			</div>
		</div>
		{#each userList as [id, user], index (id + user.team)}
			<div class="flex justify-between" class:bg-gray-200={id === currentUserId}>
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
							checked={!user.team || user.team === 'team1'}
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
			class:bg-blue-100={userList.length < 2}
			class:hover:bg-blue-500={userList.length > 1}
			on:click={onStartGame}
			disabled={userList.length < 2 || starting}>Start</button
		>
		<button class="btn lg danger flex-1" on:click={() => (showExit = true)}>Leave</button>
	</div>
</Layout>

<Modal bind:show={showQrCode}>
	<h2 slot="title">Room Id {data.room}</h2>
	{#if browser}
		<QrCode value={window.location.href} />
	{/if}
</Modal>

<Modal bind:show={showExit}>
	<a href={`${base}/`} class="btn lg danger">Exit</a>
</Modal>
