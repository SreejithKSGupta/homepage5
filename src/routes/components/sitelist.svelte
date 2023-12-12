<script lang="ts">
	import Siteobject from './siteobject.svelte';
	import { sitelists } from '../../dbase.js';
	import { flip } from 'svelte/animate';
	import { slide } from 'svelte/transition';
	let hovering = -1;

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
			<Siteobject {site} {index} />
		</div>
	{/each}
</div>

<style>
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
		justify-content: start;
		border-radius: var(--border-radius);
	}
	.site-item:focus,
	.site-item:hover {
		transform: scale(1.1);
	}
	.site-item:active {
		transform: scale(0.9);
	}
	@media screen and (max-width: 600px) {
		.sitelist {
			width: 95vw;
		}
	}
</style>
