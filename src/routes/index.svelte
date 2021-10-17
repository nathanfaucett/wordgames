<script lang="ts">
	import { base } from '$app/paths';
	import Layout from '$lib/Layout.svelte';
	import { generateRoomId } from '$lib/util';

	let roomId = '';
</script>

<Layout>
	<a class="text-6xl bold mt-2 mb-8 text-center" href={`${base}/`}>WordGames!</a>

	<div class="text-center">
		<a class="btn lg primary block" href={`${base}/lobby?room=${generateRoomId()}`}>Host</a>
	</div>
	<div class="flex mt-8">
		<input class="input flex-grow" type="text" bind:value={roomId} placeholder="Room Id" />
		{#if roomId}
			<a class="btn lg primary flex-grow-0" href={`${base}/lobby?room=${roomId.toLowerCase()}`}
				>Join</a
			>
		{/if}
	</div>
</Layout>
