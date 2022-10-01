<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import Layout from '$lib/Layout.svelte';
	import { generateRoomId } from '$lib/util';

	export const prerender = true;

	let roomId: string;

	function onHost() {
		goto(`${base}/lobby?room=${generateRoomId()}`);
	}
</script>

<svelte:head>
	<title>Word Games!</title>
</svelte:head>

<Layout>
	<a class="text-6xl bold mt-2 mb-8 text-center" href={`${base}/`}>WordGames!</a>

	<button class="btn lg primary block" on:click={onHost}>Start a new Game</button>
	<div class="flex mt-8">
		<input
			class="input flex-grow"
			type="text"
			bind:value={roomId}
			placeholder="Join a Game with a Room Id"
		/>
		{#if roomId}
			<a class="btn lg primary flex-grow-0" href={`${base}/lobby?room=${roomId.toLowerCase()}`}
				>Join</a
			>
		{/if}
	</div>
</Layout>
