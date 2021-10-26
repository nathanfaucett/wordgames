<script lang="ts">
	import Toast from '$lib/Toast.svelte';
</script>

<div class="h-screen w-screen bg-gray-100">
	<div class="mx-auto h-screen flex flex-col max-w-md px-4">
		<slot />
	</div>
</div>

<Toast />
