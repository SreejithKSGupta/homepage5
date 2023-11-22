<script lang="ts">
	import { tooltipviews, animation_duration } from '../../dbase.js';
	import { showHide } from '../../corefunctions.js';
	import { scale } from 'svelte/transition';
	import settingsicon from '$lib/res/sett.svg';
	import editicon from '$lib/res/editsite.svg';
	import addicon from '$lib/res/addsite.svg';
	import options from '$lib/res/moreopt.svg';
</script>

<button
	type="button"
	id="optionsbtn"
	on:click={() => showHide('actionview')}
	on:keydown={(e) => {
		if (e.key === 'Enter') showHide('actionview');
	}}
	title="Options"
>
	<img src={options} alt="options" />
</button>
{#if $tooltipviews.actionview}
	<div
		id="tooltipbg"
		role="button"
		tabindex="0"
		on:click={() => showHide('actionview')}
		on:keydown={(e) => {
			if (e.key === 'Enter') showHide('actionview');
		}}
	>
		<div id="footer" class="row">
			<div class="tooltip row" transition:scale={{ duration: $animation_duration }}>
				<button
					on:click={() => showHide('editview')}
					on:keydown={(e) => {
						if (e.key === 'Enter') showHide('editview');
					}}
					id="removesites_btn"
					title="Remove Sites"
				>
					<img src={editicon} alt="edit" />
				</button>
				<button
					on:click={() => showHide('addsiteview')}
					on:keydown={(e) => {
						if (e.key === 'Enter') showHide('addsiteview');
					}}
					title="Add new Sites"
				>
					<img src={addicon} alt="add new" />
				</button>
				<button
					on:click={() => showHide('settingsview')}
					on:keydown={(e) => {
						if (e.key === 'Enter') showHide('settingsview');
					}}
					title="Remove sites"
				>
					<img src={settingsicon} alt="settings" />
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	#tooltipbg {
		position: absolute;
		bottom: 0;
		width: 100vw;
		height: 100vh;
		z-index: 1;
	}
	#footer {
		position: absolute;
		bottom: 5vh;
		height: 10vh;
		width: 100%;
	}
	.tooltip {
		background-color: var(--tooltipbgcol);
		border-radius: var(--border-radius);
		z-index: 1;
		padding: var(--padding);
	}
	.tooltip button {
		border-radius: var(--border-radius);
		color: #ffffff;
		padding: var(--padding);
	}
	.tooltip button:hover,
	.tooltip button:focus {
		background-color: var(--primary);
	}
	.tooltip button:active {
		background-color: var(--secondary);
	}
	.tooltip button img {
		width: var(--sitewidth);
	}
	#optionsbtn {
		position: absolute;
		bottom: var(--padding);
		right: var(--padding);
		opacity: 40%;
	}
	#optionsbtn:hover {
		opacity: 100%;
	}
	#optionsbtn img {
		width: calc(var(--sitewidth) * 0.7);
	}
</style>
