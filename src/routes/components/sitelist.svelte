<script lang="ts">
	import Siteobject from './siteobject.svelte';
	import { sitelists } from '../../dbase.js';
	import { flip } from 'svelte/animate';
	import { slide } from 'svelte/transition';
	let hovering = -1;

	// Preserved your original drag and drop functions
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

<div class="sitelist" id="sitelist" role="list" aria-label="Draggable site list" transition:slide>
	{#each $sitelists as site, index (site.id || site.name)}
		<div
			role="listitem"
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
	
	{#if $sitelists.length === 0}
		<div class="empty-message">
			<p>No sites available.</p>
		</div>
	{/if}
</div>

<style>
	.sitelist {
		width: clamp(300px, var(--sitelistwidth), var(--sitelistwidth));
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(calc(var(--sitewidth) * 1.4), 1fr));
		grid-auto-rows: calc(var(--sitewidth) * 1.8);
		height: 100%;
		overflow-y: scroll;
		padding: 0.5rem;
		gap: 0.5rem;
	}

	.site-item:focus,
	.site-item:hover {
		transform: scale(1.1);
	}
	
	.site-item:active {
		transform: scale(0.9);
	}
	
	.site-item.is-active {
		background-color: rgba(0, 0, 0, 0.05);
		border-radius: var(--sitebr, 8px);
	}
	
	.empty-message {
		grid-column: 1 / -1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 150px;
		color: #666;
		font-style: italic;
	}
	
	@media screen and (max-width: 600px) {
		.sitelist {
			width: 95vw;
		}
	}
</style>