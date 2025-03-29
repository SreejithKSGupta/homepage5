<script lang="ts">
	import { scale } from 'svelte/transition';
	import editicon from '$lib/res/delsite.svg';
	import defsiteicon from '$lib/res/defsite.svg';
	import { settingsoptions, siteanim, tooltipviews, sitelists } from '../../dbase';
	
	export let site: { id: number; name: string; url: string };
	export let index: number;
	
	let showSiteName = false;

	// Preserved your original animation function exactly as it was
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
		var favicon = "https://www.google.com/s2/favicons?sz=256&domain=" + url + "&size=320";
        return favicon;
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
	<a href={site.url} tabindex="-1" aria-label={site.name}>
		<img class="siteicon" src={geticon(site.url)} on:error={setdeficon} alt={site.name} />
	</a>
	{#if $tooltipviews.editview}
		<button class="delbtn" on:click={() => deletesite(index)} title="remove {site.name}" aria-label="Remove {site.name}">
			<img transition:scale src={editicon} alt="Delete" />
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
		transition: transform 0.2s ease-out;
	}
	
	.sitebtn:hover,
	.sitebtn:focus {
		color: var(--primary);
	}
	
	.sitebtn a {
		display: block;
		width: 100%;
		height: 100%;
	}

	.siteicon {
		border-radius: var(--sitebr);
		width: var(--sitewidth);
		height: var(--sitewidth);
		background-color: white;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}
	
	.delbtn,
	.delbtn img {
		width: calc(var(--sitewidth) * 0.5);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: none;
		border-radius: var(--sitebr);
		background-color: rgba(0, 0, 0, 0.664);
		padding: 0;
		cursor: pointer;
		z-index: 5;
	}
	
	.delbtn:hover {
		background-color: rgba(220, 38, 38, 0.9);
	}
	
	.delbtn:focus {
		outline: 2px solid var(--primary, #4f46e5);
		outline-offset: 2px;
	}
	
	/* Make sure span inherits necessary styles to work with your layout */
	span {
		display: block;
		text-align: center;
		font-size: 0.875rem;
		margin-top: 0.25rem;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: var(--sitewidth);
		white-space: nowrap;
	}
</style>