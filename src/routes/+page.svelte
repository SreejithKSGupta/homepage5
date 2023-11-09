<script lang="ts">
	import About from './components/about.svelte';
    import Topbar from "./components/topbar.svelte";
    import Search from "./components/search.svelte";
    import Sitelist from "./components/sitelist.svelte";
    import Siteoptions from "./components/siteoptions.svelte";
    import { settingsoptions} from "../dbase.js";
    import { onNavigate } from '$app/navigation';
	import Addsitetooltip from "./components/addsitetooltip.svelte";
	import Settings from "./components/settings.svelte";
    

    onNavigate((navigation) => {
        if (!(document as any).startViewTransition) return;

        return new Promise((resolve) => {
            (document as any).startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });
    
</script>

        <Topbar />
        <Search />
        {#if $settingsoptions.find((settingsoption) => settingsoption.name === 'show_favsites')?.value}
        <Sitelist />
        {/if}
        <Siteoptions/>
        <Addsitetooltip/>
        <Settings/>
        <About/>
 

