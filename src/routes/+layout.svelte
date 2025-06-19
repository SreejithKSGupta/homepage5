<script lang="ts">
	import './style.css';
	import { slide } from 'svelte/transition';
	import { settingsoptions, wallpaperurl } from '../dbase.js';
	let showwall: boolean;

	$: {
		const option = $settingsoptions.find((opt: { name: string; }) => opt.name === 'show_wallpaper');
		showwall = option ? option.value : false;
	}
</script>

{#if showwall}
	<div id="content" class="col" style="background-image: url({$wallpaperurl});" transition:slide>
		<slot />
	</div>
{:else}
	<div id="content" class="col" transition:slide>
		<slot />
	</div>
{/if}

<style>
	#content {
		position: fixed;
		height: 100%;
		width: 100%;
		background-color: var(--bgcol);
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}
</style>
