<script lang="ts" context="module">
	function toString(x: number): string {
		return (x < 10 ? '0' : '') + x;
	}
</script>

<script lang="ts">
	export let seconds = 60;

	$: m = Math.floor(seconds / 60);
	$: s = Math.floor(seconds - m * 60);
</script>

{toString(m)}:{toString(s)}
