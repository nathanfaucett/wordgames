<script lang="ts">
	import Layout from '$lib/Layout.svelte';
	import { generateRoomId } from '$lib/state/p2p';

	let roomId: string;
</script>

<Layout>
	<h1 class="text-5xl text-center mb-4">WordGames!</h1>

	<div class="text-center">
		<a
			class="bg-blue-600 inline-block text-white text-2xl py-2 px-8"
			href={`/lobby?room=${generateRoomId()}`}>Host</a
		>
	</div>
	<div class="flex flex-1 mx-auto justify-self-center mt-4 max-w-sm">
		<input
			class="bg-gray-200 focus:bg-white flex-grow py-2 px-4"
			type="text"
			bind:value={roomId}
			placeholder="Room Id"
		/>
		<a
			class="bg-blue-600 hover:bg-blue-500 text-white flex-grow-0 text-lg py-2 px-4"
			href={`/lobby?room=${roomId}`}>Join</a
		>
	</div>
</Layout>
