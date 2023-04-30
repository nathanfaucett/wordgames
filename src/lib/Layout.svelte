<script lang="ts">
	import Toast from '$lib/Toast.svelte';
</script>

<div class="mx-auto flex flex-col max-w-md w-full bg-white dark:bg-gray-900 shadow p-4 my-4">
	<slot />
</div>

<Toast />
