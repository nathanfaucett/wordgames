<script context="module">
	import { base } from '$app/paths';
	import '../app.postcss';
</script>

<svelte:head>
	<link rel="icon" href={`${base}/favicon.png`} />
</svelte:head>

<slot />
