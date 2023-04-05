<script lang="ts">
	import Toast from '$lib/Toast.svelte';
</script>

<div class="mx-auto flex flex-col max-w-md w-full bg-white shadow p-4 my-4">
	<slot />
</div>

<Toast />
