<script lang="ts">
	import Toast from '$lib/Toast.svelte';
</script>

<div class="mx-auto h-screen flex flex-col max-w-md px-4">
	<slot />
</div>

<Toast />
