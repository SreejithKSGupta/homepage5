<script lang="ts">
	import About from './components/about.svelte';
	import Topbar from './components/topbar.svelte';
	import Search from './components/search.svelte';
	import Sitelist from './components/sitelist.svelte';
	import Siteoptions from './components/siteoptions.svelte';
	import { settingsoptions} from '../dbase.js';
	import { onNavigate } from '$app/navigation';
	import Addsitetooltip from './components/addsitetooltip.svelte';
	import Settings from './components/settings.svelte';
  
	onNavigate((navigation) => {
		if (!(document as any).startViewTransition) return;

		return new Promise((resolve) => {
			(document as any).startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
	let showsite: boolean;

	$: {
		for (let i in $settingsoptions) {
			if ($settingsoptions[i].name === 'show_favsites') {
				showsite = $settingsoptions[i].value;
			}
		}
	}
</script>

<Topbar />
<Search />
<div id="showsitesbox">
	{#if showsite}
		<Sitelist />
	{/if}
</div>
<Siteoptions />
<Addsitetooltip />
<Settings />
<About />
<style>
	#showsitesbox {
		height: 70%;
	}

</style>
