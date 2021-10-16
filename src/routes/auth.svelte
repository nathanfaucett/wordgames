<script lang="ts">
	import Layout from '$lib/Layout.svelte';
	import { signIn, signOut, signUp, username } from '$lib/state/user';
	import { createToast } from '$lib/state/toasts';
	import { base } from '$app/paths';

	let formUsername: string;
	let formPassword: string;

	function onSignIn() {
		signIn(formUsername, formPassword).catch((error) => {
			createToast(error);
		});
	}

	function onSignUp() {
		signUp(formUsername, formPassword).catch((error) => {
			createToast(error);
		});
	}
</script>

<Layout>
	<a class="text-6xl bold mt-2 mb-8 text-center" href={`${base}/`}>WordGames!</a>
	<h1 class="text-center">Sign in/up</h1>

	{#if $username}
		<p class="text-center mt-8">
			You are already signed in as <strong>{$username}</strong>
		</p>
		<a class="btn md primary" href={`${base}/`} role="button">Start a Game!</a>
		<button class="btn md danger" on:click={signOut}>Sign out</button>
	{:else}
		<div class="flex flex-col">
			<div class="flex-1">
				<label for="username">Username</label>
				<input
					class="input"
					name="username"
					bind:value={formUsername}
					minlength="3"
					maxlength="16"
				/>
			</div>

			<div class="flex-1">
				<label for="password">Password</label>
				<input class="input" name="password" bind:value={formPassword} type="password" />
			</div>

			<div class="flex flex-row">
				<button class="flex-1 btn md primary" on:click={onSignIn}>Sign in</button>
				<button class="flex-1 btn md secondary" on:click={onSignUp}>Sign up</button>
			</div>
		</div>
	{/if}
</Layout>
