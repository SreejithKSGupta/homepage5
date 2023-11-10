<script lang="ts">
	import {tooltipviews,animation_duration } from '../../dbase.js';
	import { showHide } from '../../corefunctions.js';
	import { scale} from 'svelte/transition';
	import settingsicon from '$lib/res/sett.webp';
	import editicon from '$lib/res/editsite.webp';
	import addicon from '$lib/res/add.webp';
	import options from '$lib/res/moreopt.webp';

</script>

<button type="button" id="optionsbtn"  on:click={() => showHide('actionview')}>
	<img src={options} alt="options" />
</button>
<div id="footer" class="row">
	{#if $tooltipviews.actionview}
		<div class="tooltip row" transition:scale={{duration:$animation_duration}}>
			<button on:click={() => showHide('editview')}>
				<img src={editicon} alt="edit" />
			</button>
			<button on:click={() => showHide('addsiteview')}>
				<img src={addicon} alt="add new" />
			</button>
			<button on:click={() => showHide('settingsview')}>
				<img src={settingsicon} alt="settings" />
			</button>
		</div>
	{/if}
</div>

<style>
	#footer {
		height: 10vh;
        width: 100%;
	}
	.tooltip {
		background-color:var(--tooltipbgcol);
		border-radius: var(--border-radius);
		z-index: 1;
        padding:var(--padding);
	}
	.tooltip button {
		border-radius: var(--border-radius);
		color: #ffffff;
		padding: var(--padding) ;
	}
	.tooltip button:hover , .tooltip button:focus{
		background-color: var(--primary);
	}
	.tooltip button:active{
		background-color: var(--secondary);
	}
	.tooltip button img {
		width:var(--sitewidth);
	}
	#optionsbtn {
		position: absolute;
		bottom: 1vh;
		right: 1vh;
        opacity: 20%;
	}
    #optionsbtn:hover {
        opacity: 100%;
    }
	#optionsbtn img {
		width:calc(var(--sitewidth)*0.7);
	}
</style>