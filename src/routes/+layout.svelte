<script lang="ts">
    import './style.css';
    import {slide,crossfade } from 'svelte/transition';
    import { settingsoptions, wallpaperurl,} from "../dbase.js";
</script>


{#if $settingsoptions.find((settingsoption) => settingsoption.name === 'show_wallpaper')?.value}
<div id="content" class="col" style="background-image: url({$wallpaperurl});" transition:slide>
<slot/>
    </div>
{:else}
    <div id="content" class="col" transition:slide >
       <slot/>
    </div>
{/if}

<style>
    #content {
        height: 100vh;
        width:100vw ;
        background-color:var(--bgcol);
    }
</style>