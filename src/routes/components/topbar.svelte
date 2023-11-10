<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { userdata, tooltipviews, animation_duration } from '../../dbase.js';
	import { showHide } from '../../corefunctions.js';
	import { signinout } from '../../firebase.js';
	let time = new Date().toLocaleTimeString();
	let date = new Date().toLocaleDateString();

	onMount(() => {
		setInterval(() => {
			time = new Date().toLocaleTimeString();
		}, 1000);
	});
	function donothing() {
		console.log('nothing');
	}
</script>

<header class="row">
	<div id="clock" class="col">
		<span>{date}</span>
		<span>{time}</span>
	</div>
	<div id="greetings" class="row">
		<h1>Hi {$userdata.name}</h1>
	</div>
	<div id="profile" class="row">
		<button type="button" on:click={() => showHide('profileview')}
			><img src={$userdata.photo} id="proimg" alt="profile" /></button
		>
		{#if $tooltipviews.profileview}
			<div id="profilemenu" class="col" transition:slide={{ duration: $animation_duration }}>
				<h1>Hi,<br /> {$userdata.name}</h1>
				<button type="button" id="optbtns" on:click={signinout}>{$userdata.buttonname}</button>
				<button type="button" id="optbtns" on:click={() => showHide('settingsview')}>Settings</button
				>
				<button type="button" id="optbtns" on:click={donothing}>About</button>
			</div>
		{/if}
	</div>
</header>

<style>
	header {
		width: 100vw;
		padding: 0 5vw;
		background-color: var(--bgcolor);
		height: 10vh;
		justify-content: space-between;
	}

	h1 {
		font-size: 300%;
		color: var(--primary);
		text-align: center;
	}
	header div {
		width: 30%;
	}

	#clock span {
		width: 100%;
		font-size: 200%;
		text-align: left;
	}
	#profile {
		justify-content: end;
	}
	#proimg {
		height: 8vh;
		border-radius: var(--sitebr);
		align-self: right;
	}
	#profilemenu {
		position: fixed;
		width: clamp(300px, 20vw, 600px);
		top: 15vh;
		right: 1vw;
		background-color: var(--tooltipbgcol);
		z-index: 1;
		border-radius: var(--border-radius);
		padding: var(--padding);
		color: var(--textcolor);
	}
	#optbtns {
		border-radius: var(--border-radius);
		background-color: var(--primary);
		padding: var(--padding);
		margin: var(--margin);
		width: 80%;
		font-size: 150%;
	}
	@media (max-width: 600px) {
		h1 {
			font-size: 100%;
		}
		#clock span {
			font-size: 100%;
		}
	}
</style>
