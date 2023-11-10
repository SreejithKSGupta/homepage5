<script lang="ts">
	import './style.css';
	import { slide } from 'svelte/transition';
	import { settingsoptions, wallpaperurl } from '../dbase.js';
    let showwall: boolean ;
   

   $: {
          for (let i in $settingsoptions) {
              if ($settingsoptions[i].name === 'show_wallpaper') {
                   showwall = $settingsoptions[i].value;      
              }
          }
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
		height: 100vh;
		width: 100vw;
		background-color: var(--bgcol);
	}
</style>
