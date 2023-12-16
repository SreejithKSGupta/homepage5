<script lang="ts">
	import About from './components/about.svelte';
	import Topbar from './components/topbar.svelte';
	import Search from './components/search.svelte';
	import Sitelist from './components/sitelist.svelte';
	import Siteoptions from './components/siteoptions.svelte';
	import { settingsoptions, siteanim } from '../dbase.js';
	import { onNavigate } from '$app/navigation';
	import Addsitetooltip from './components/addsitetooltip.svelte';
	import Settings from './components/settings.svelte';
	import { scale } from 'svelte/transition';
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
	function geticon(url: string) {
		const [, , domain] = url.split('/');
		let imgurl = `https://s2.googleusercontent.com/s2/favicons?domain=${domain}&sz=128`;
		return imgurl;
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
{#if $siteanim}
	<div class="sitebtnfs" transition:scale />
{/if}

<style>
	#showsitesbox {
		height: 70vh;
	}

	/* .sitebtnfs img{
		width: 10vh;
		height: 10vh;
		border-radius: var(--sitebr);
		background-color: var(--primary);

	} */
	.sitebtnfs {
		position: fixed;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: rgb(46, 46, 46);
		z-index: 20;
		height: 100vh;
		width: 100vw;
		padding: 10vw;
	}
</style>
