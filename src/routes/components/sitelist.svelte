<script lang="ts">
	import { tooltipviews,sitelists,settingsoptions} from '../../dbase.js';
	import { flip } from 'svelte/animate';
	import { slide, scale } from 'svelte/transition';
	import editicon from '$lib/res/delsite.svg';
	let hovering = -1;
	function drop(event: DragEvent, target: number) {
		event.dataTransfer!.dropEffect = 'move';
		const start = parseInt(event.dataTransfer!.getData('text/plain'));
		const newTracklist = [...$sitelists];
		newTracklist.splice(target < start ? target : target + 1, 0, newTracklist.splice(start, 1)[0]);
		sitelists.set(newTracklist);
		hovering = -1;
	}
	function dragstart(event: DragEvent, i: number) {
		event.dataTransfer!.effectAllowed = 'move';
		event.dataTransfer!.dropEffect = 'move';
		const start = i;
		event.dataTransfer!.setData('text/plain', start.toString());
	}
	function gotowebsite(url: string) {
		window.location.href = url;
	}
	function deletesite(option: number) {
		const newTracklist = [...$sitelists];
		newTracklist.splice(option, 1);
		sitelists.set(newTracklist);
	}
	function geticon(url: string) {
		const urlsplit = url.split('/');
		const domain = urlsplit[2];
		const iconurl = 'https://s2.googleusercontent.com/s2/favicons?domain=' + domain + '&sz=128';
		return iconurl;
	}
	
	let showSiteName = false;

$: {
	for (let i in $settingsoptions) {
		if ($settingsoptions[i].name === 'show_sitename') {
			showSiteName = $settingsoptions[i].value;      
		}
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
			on:dragover={(event) => {event.preventDefault();return false;}}
			on:dragenter={() => (hovering = index)}
			class:is-active={hovering === index}>
			<div
			    title="{site.url}"
				class="sitebtn col"
				role="button"
				tabindex="-1"
				on:click={(event) => {
					gotowebsite(site.url);
				}}
				on:keydown={(event) => {
					if (event.key === 'Enter') {
						gotowebsite(site.url);
					}
				}}>
				<img class="siteicon" src={geticon(site.url)} alt="icon" />
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
</div>
<style>
	.sitelist {
		width:clamp(300px,var( --sitelistwidth), var( --sitelistwidth));
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(calc(var(--sitewidth)*1.4), 1fr));
		height: 60vh;
		overflow-y: scroll;
	}
	.site-item {
		height:calc(var(--sitewidth) * 1.8);
		border-radius:var(--border-radius);
		margin:var(--margin);
		justify-content: start;
	}
	.site-item:hover, .site-item:focus {
		transform: scale(1.1);
	}
	.site-item:active {
		transform: scale(0.9);
	}
	.site-item.is-active {
		background-color:var(--secondary);
	}
	.sitebtn{
		font-size: 170%;
	}
	.sitebtn:hover, .sitebtn:focus {
		color: var(--primary);
	}
	.siteicon {	
		border-radius: var(--sitebr);
		width:var(--sitewidth);
	}
	.delbtn, .delbtn img {
		width:calc(var(--sitewidth)*0.3);
	}

	@media screen and (max-width: 600px) {
		.sitelist {
			width:95vw;
		}
	}
</style>