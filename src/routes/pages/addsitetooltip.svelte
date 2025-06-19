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

		const nextId = $sitelists.reduce((maxId: number, site: Site) => Math.max(maxId, site.id), 0) + 1;
		$sitelists = [...$sitelists, { id: nextId, name: siteName.trim(), url: siteUrl.trim() }];
		cancel();
	}

	function isValidInput(): boolean {
		if (!siteName.trim() || !siteUrl.trim()) {
			alert('Site name and URL cannot be empty!');
			return false;
		}

		if ($sitelists.some((site: Site) => site.name.toLowerCase() === siteName.trim().toLowerCase())) {
			alert('Site name already exists!');
			return false;
		}

		let formattedUrl = siteUrl.trim();
		if (formattedUrl.startsWith('www.')) {
			formattedUrl = 'https://' + formattedUrl.substring(4);
		}

		try {
			const url = new URL(formattedUrl);
			siteUrl = url.href;
			return true;
		} catch {
			alert('Invalid URL format!');
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
		<h3>Add a New Site</h3>
		<input
			type="text"
			placeholder="Site Name"
			bind:value={siteName}
			on:keyup={(event) => event.key === 'Enter' && addSite()}
		/>
		<input
			type="text"
			placeholder="Site URL (e.g., https://example.com)"
			bind:value={siteUrl}
			on:keyup={(event) => event.key === 'Enter' && addSite()}
		/>

		<div class="btns row">
			<button class="cancel" on:click={cancel}>Cancel</button>
			<button class="add" on:click={addSite}>Add Site</button>
		</div>
	</div>
{/if}

<style>
	.tooltip {
		position: fixed;
		z-index: 1000;
		top: 40vh;
		left: 50%;
		transform: translateX(-50%);
		width: clamp(350px, 60vw, 800px);
		background-color: var(--tooltipbgcol);
		border-radius: var(--border-radius);
		padding: var(--padding);
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
		text-align: center;
	}

	.tooltip h3 {
		margin-bottom: 10px;
		color: var(--primary);
		font-size: 1.4rem;
	}

	.tooltip input {
		width: 90%;
		padding: 10px;
		margin: 5px 0;
		border: 1px solid #ccc;
		border-radius: var(--border-radius);
		font-size: 1rem;
	}

	.btns {
		margin-top: 15px;
		display: flex;
		justify-content: center;
		gap: 10px;
	}

	.tooltip button {
		padding: 10px 15px;
		border: none;
		border-radius: var(--border-radius);
		font-size: 1.1rem;
		cursor: pointer;
		transition: 0.2s ease-in-out;
		width: clamp(100px, 20vw, 200px);
	}

	.tooltip button.add {
		background-color: var(--primary);
		color: white;
	}

	.tooltip button.add:hover {
		background-color: darken(var(--primary), 10%);
	}

	.tooltip button.cancel {
		background-color: #ccc;
		color: black;
	}

	.tooltip button.cancel:hover {
		background-color: #999;
	}

	@media (max-width: 600px) {
		.tooltip {
			width: 95vw;
		}
	}
</style>
