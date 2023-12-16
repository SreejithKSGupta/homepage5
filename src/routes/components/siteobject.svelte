<script lang="ts">
	import { scale } from 'svelte/transition';
	import editicon from '$lib/res/delsite.svg';
	import defsiteicon from '$lib/res/defsite.svg';
	import { settingsoptions, siteanim, tooltipviews, sitelists } from '../../dbase';
	let showSiteName = false;
	export let site: { id: number; name: string; url: string };
	export let index: number;

	async function gotowebsite(url: string, e: Event) {
		let parent = (e.currentTarget as HTMLElement).parentElement!;
		if ($settingsoptions[0].value == 0) {
			parent.style.zIndex = '22';
			siteanim.set(true);
			let rect = parent.getBoundingClientRect();
			let { left: x, top: y, width: w, height: h } = rect,
				cx = x + w / 2,
				cy = y + h / 2,
				dx = window.innerWidth / 2 - cx,
				dy = window.innerHeight / 2 - cy;
			parent.style.transform = `translate(${dx}px, ${dy}px)`;
		}
		$settingsoptions[0].value ? window.open(url, '_blank') : (window.location.href = url);
	}

	function geticon(url: string) {
		const [, , domain] = url.split('/');
		let imgurl = `https://s2.googleusercontent.com/s2/favicons?domain=${domain}&sz=128`;
		return imgurl;
	}

	function setdeficon(e: Event) {
		if (e.target instanceof HTMLImageElement) {
			e.target.src = defsiteicon;
		}
	}
	function deletesite(option: number) {
		event!.stopPropagation();
		const newTracklist = [...$sitelists];
		newTracklist.splice(option, 1);
		sitelists.set(newTracklist);
	}

	$: {
		const option = $settingsoptions.find(
			(option: { name: string }) => option.name === 'show_sitename'
		);
		if (option) {
			showSiteName = option.value;
		}
	}
</script>

<div
	title={site.url}
	class="sitebtn col"
	role="button"
	tabindex="0"
	on:click={(event) => {
		if (event.target) {
			gotowebsite(site.url, event);
		}
	}}
	on:keydown={(event) => {
		if (event.key === 'Enter' && event.target) {
			gotowebsite(site.url, event);
		}
	}}
>
	<img class="siteicon" src={geticon(site.url)} on:error={setdeficon} alt={site.url} />
	{#if $tooltipviews.editview}
		<button class="delbtn" on:click={() => deletesite(index)} title="remove {site.name}">
			<img transition:scale src={editicon} alt="edit" />
		</button>
	{/if}
</div>

{#if showSiteName}
	<span transition:scale>{site.name}</span>
{/if}

<style>
	.sitebtn {
		font-size: 170%;
		border-radius: var(--sitebr);
		position: relative;
	}
	.sitebtn:hover,
	.sitebtn:focus {
		color: var(--primary);
	}

	.siteicon {
		border-radius: var(--sitebr);
		width: var(--sitewidth);
		height: var(--sitewidth);
		background-color: white;
	}
	.delbtn,
	.delbtn img {
		width: calc(var(--sitewidth) * 0.5);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: 30px rgba(0, 0, 0, 0.664);
		border-radius: var(--sitebr);
	}
</style>
