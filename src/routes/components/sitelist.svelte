<script lang="ts">
	import { tooltipviews, sitelists, settingsoptions } from '../../dbase.js';
	import { flip } from 'svelte/animate';
	import { slide, scale } from 'svelte/transition';
	import editicon from '$lib/res/delsite.svg';
	let hovering = -1;
	let showSiteName = false;
  
	function setdeficon(e: Event) {
        const target = e.target as HTMLImageElement;
        if (target) {
            target.src = editicon;
        }
		console.log('error loading image, setting default for ', target.src);
    }

	function drop(event: DragEvent, target: number) {
		const start = parseInt(event.dataTransfer!.getData('text/plain'));
		const newTracklist = [...$sitelists];
		newTracklist.splice(target < start ? target : target + 1, 0, newTracklist.splice(start, 1)[0]);
		sitelists.set(newTracklist);
		hovering = -1;
	}

	function dragstart(event: DragEvent, i: number) {
		event.dataTransfer!.setData('text/plain', i.toString());
	}

	function gotowebsite(url: string, target: EventTarget) {
		const parent = (target as HTMLElement).parentElement?.parentElement;
		const sitei = (target as HTMLElement).parentElement;
		const rect = parent!.getBoundingClientRect();
		const posx = (rect.left / window.innerWidth) * 100;
		const posy = (rect.top / window.innerHeight) * 100;
		parent!.style.position = 'absolute';
		parent!.style.left = `${posx}vh`;
		parent!.style.top = `${posy}vw`;
		parent!.classList.toggle('site-item', false);
		parent!.classList.toggle('full-screen', true);
		sitei!.classList.add('fadeout');
		$settingsoptions[0].value ? window.open(url, '_blank') : (window.location.href = url);
	}

	function deletesite(option: number) {
		const newTracklist = [...$sitelists];
		newTracklist.splice(option, 1);
		sitelists.set(newTracklist);
	}

	function geticon(url: string) {
		const [, , domain] = url.split('/');
		let imgurl= `https://s2.googleusercontent.com/s2/favicons?domain=${domain}&sz=128`;
		return imgurl
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

<div class="sitelist" role="list" transition:slide>
	{#each $sitelists as site, index (site.name)}
		<div
			role="listitem"
			tabindex="-1"
			aria-dropeffect="move"
			class="site-item col"
			animate:flip={{ duration: 250 }}
			transition:slide={{ duration: 250 }}
			draggable={true}
			on:dragstart={(event) => dragstart(event, index)}
			on:drop|preventDefault={(event) => drop(event, index)}
			on:dragover={(event) => {
				event.preventDefault();
				return false;
			}}
			on:dragenter={() => (hovering = index)}
			class:is-active={hovering === index}
		>
			<div
				title={site.url}
				class="sitebtn col"
				role="button"
				tabindex="-1"
				on:click={(event) => {
					if (event.target) {
						gotowebsite(site.url, event.target);
					}
				}}
				on:keydown={(event) => {
					if (event.key === 'Enter' && event.target) {
						gotowebsite(site.url, event.target);
					}
				}}
			>
			<img class="siteicon" src={geticon(site.url)} on:error={setdeficon} alt="{site.url}" />
				{#if showSiteName}
					<span>{site.name}</span>
				{/if}
			</div>
			{#if $tooltipviews.editview}
				<button class="delbtn" on:click={() => deletesite(index)} title="remove {site.name}">
					<img transition:scale src={editicon} alt="edit" />
				</button>
			{/if}
		</div>
	{/each}
	<div class="full-screen fadeout" id="none" />
</div>

<style>
	#none {
		display: none;
	}
	@keyframes appopen {
		0% {
			width: 0px;
			height: 0px;
			border-radius: var(--sitebr);
		}
		80% {
			width: 50vw;
			height: 50vw;
			border-radius: 30px;
		}
		100% {
			top: 0;
			left: 0;
			width: 200vw;
			height: 200vh;
			border-radius: 0px;
		}
	}

	.sitelist {
		width: clamp(300px, var(--sitelistwidth), var(--sitelistwidth));
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(calc(var(--sitewidth) * 1.4), 1fr));
		grid-auto-rows: calc(var(--sitewidth) * 1.8);
		max-height: 100%;
		overflow-y: scroll;
		transition: all 2s appopen;
	}
	.site-item {
		height: calc(var(--sitewidth) * 1.8);
		border-radius: var(--border-radius);
		padding: var(--padding);
		justify-content: start;
	}
	.site-item:hover {
		transform: scale(1.1);
	}
	.site-item:focus {
		transform: scale(1.1);
	}
	.site-item:active {
		transform: scale(0.9);
	}
	.site-item.is-active {
		background-color: var(--secondary);
	}
	.sitebtn {
		font-size: 170%;
	}
	.sitebtn:hover,
	.sitebtn:focus {
		color: var(--primary);
	}
	.siteicon {
		border-radius: var(--sitebr);
		width: var(--sitewidth);
	}
	.delbtn,
	.delbtn img {
		width: calc(var(--sitewidth) * 0.3);
	}

	.full-screen {
		position: absolute;
		top: var(--posy);
		left: var(--posx);
		transform: translate(-50%, -50%);
		border-radius: var(--sitebr);
		width: 250vw;
		height: 250vh;
		background-color: rgb(230, 230, 230);
		z-index: 9;
	}

	@media (prefers-color-scheme: dark) {
		.full-screen {
			background-color: rgb(39, 39, 39);
		}
	}
	@media screen and (max-width: 600px) {
		.sitelist {
			width: 95vw;
		}
	}

	.fadeout {
		display: none;
	}
</style>
