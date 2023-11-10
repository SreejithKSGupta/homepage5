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
		position: fixed;
		height: 100%;
		width: 100%;
		background-color: var(--bgcol);
	}

</style>