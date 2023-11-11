<script lang="ts">
	import { tooltipviews, sitelists, animation_duration } from '../../dbase.js';
	import { scale } from 'svelte/transition';
	import { showHide } from '../../corefunctions.js';

	let siteName = '';
	let siteUrl = '';

	type Site = {
		id: number;
		name: string;
		url: string;
	};

	function addSite() {
		if (!isValidInput()) return;
		const nextId =
			$sitelists.reduce((maxId: number, site: Site) => Math.max(maxId, site.id), 0) + 1;
		$sitelists = [...$sitelists, { id: nextId, name: siteName, url: siteUrl }];
		cancel();
	}

	function isValidInput() {
		if (siteName === '' || siteUrl === '') {
			alert('Site name and URL cannot be empty!');
			return false;
		}

		if ($sitelists.some((item: Site) => item.name == siteName)) {
			alert('Site name already exists!');
			return false;
		}

		if (siteUrl.startsWith('www.')) {
			siteUrl = 'https://' + siteUrl;
		}

		try {
			new URL(siteUrl);
			return true;
		} catch {
			alert('Invalid URL!');
			return false;
		}
	}

	function cancel() {
		siteName = '';
		siteUrl = '';
		showHide('addsiteview');
	}
</script>

{#if $tooltipviews.addsiteview}
	<div class="tooltip col" transition:scale={{ duration: $animation_duration }}>
		<input type="text" placeholder="Site Name" bind:value={siteName} />
		<input type="text" placeholder="Site URL" bind:value={siteUrl} />
		<div class="btns row">
			<button on:click={cancel}>Cancel</button>
			<button on:click={addSite}>Add</button>
		</div>
	</div>
{/if}

<style>
	.tooltip {
		position: absolute;
		z-index: 6;
		top: 40vh;
		width: clamp(350px, 60vw, 800px);
		background-color: var(--tooltipbgcol);
		border-radius: var(--border-radius);
		padding: var(--padding);
	}

	.tooltip input {
		width: 80%;
	}

	.tooltip button {
		background-color: var(--primary);
		border-radius: var(--border-radius);
		padding: var(--padding);
		color: #ffffff;
		font-size: 130%;
		width: clamp(100px, 20vw, 200px);
		margin: var(--margin);
	}
	@media (max-width: 600px) {
		.tooltip {
			width: 95vw;
		}
	}
</style>
