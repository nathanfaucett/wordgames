<script lang="ts">
	import { toasts, removeToast } from '$lib/state/toasts';
</script>

<div class="p-2 absolute bottom-0 w-full">
	{#each $toasts as toast (toast.id.toString())}
		<div
			class="flex items-center rounded bg-red-500 py-2 px-3 shadow-md mb-2 cursor-pointer"
			on:click={() => removeToast(toast.id)}
		>
			<div class="text-red-500 rounded-full bg-white mr-3">
				<svg
					width="1.8em"
					height="1.8em"
					viewBox="0 0 16 16"
					class="bi bi-x"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
					/>
					<path
						fill-rule="evenodd"
						d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
					/>
				</svg>
			</div>
			<div class="text-white max-w-xs ">{toast.message}</div>
		</div>
	{/each}
</div>
