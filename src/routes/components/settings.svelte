<script lang="ts">
	import { cssvars,fontfam,fontopt,animation_duration ,tooltipviews,settingsoptions} from '../../dbase.js';
	import { scale } from 'svelte/transition';
	let tooltipElement: any;
</script>


{#if $tooltipviews.settingsview}
	<div class="tooltip col" transition:scale={{duration:$animation_duration}} bind:this={tooltipElement}>
		<div class="settingsmenu col">
			<h1>Settings</h1>
			{#each $settingsoptions as settingsoption}
				<div class="row settingsitem">
					<label class="settingslabel" for={settingsoption.name}>{settingsoption.text}</label>
					<input type="checkbox" bind:checked={settingsoption.value} id={settingsoption.name} />
				</div>
			{/each}
			<div class="row settingsitem">
				<label class="settingslabel" for="fontfam">Font</label>
				<select id="fontfam" bind:value={$fontfam}>
					{#each $fontopt as font (font)}
						<option value={font}>{font}</option>
					{/each}
				</select>
			</div>
			<div class="row settingsitem">
				<label class="settingslabel" for="animation_duration">Animation Duration</label>
				<input
					type="range"
					bind:value={$animation_duration}
					id="animation_duration"
					min="0"
					max="1000"
					step="10"
				/>
				<span class="setval">{$animation_duration}ms</span>
			</div>
            
			{#each $cssvars as settinsitem}
				<div class="row settingsitem">
					<label class="settingslabel" for={settinsitem.name}>{settinsitem.tag}</label>
					{#if settinsitem.unit === 'color'}
						<input type="color" bind:value={settinsitem.value} id={settinsitem.name} />
					{:else}
						<input
							type="range"
							bind:value={settinsitem.value}
							id={settinsitem.name}
							min={settinsitem.min}
							max={settinsitem.max}
							step={settinsitem.steps}
						/>
					{/if}
					<span class="setval">{settinsitem.value}</span>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.tooltip {
		position: absolute;
		z-index: 5;
		top: 15vh;
		width: clamp(250px, 60vw, 800px);
		height: 60vh;
		overflow-y: scroll;
		justify-content: flex-start;
		background-color: var(--tooltipbgcol);
		border-radius: var(--border-radius);
		padding: var(--padding);
	}

	.settingsmenu {
		width: 100%;
		height: 100%;
		justify-content: flex-start;
		margin: var(--margin);
	}
	.tooltip h1 {
		font-size: 5rem;
		color: var(--primary);
	}
	.settingslabel {
		width: 40%;
	}
	.settingsitem {
		justify-content: space-between;
		width: 90%;
		margin: var(--margin);
		padding: var(--padding);
		background-color: rgb(29, 24, 29);
		border-radius: var(--border-radius);
		font-size: larger;
	}
	.setval {
		width: 20%;
		text-align: right;
	}
	input[type='color'] {
		width: 50px;
		height: 50px;
		padding: 0;
		margin: 0;
		border-radius: 0;
	}
</style>
