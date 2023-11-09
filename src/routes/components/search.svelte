<script lang="ts">
	import { settingsoptions } from '../../dbase.js';
	import searchicon from '$lib/res/sch.webp';
	import { onMount } from 'svelte';
	let searchQuery = '';

	type SearchEngine = 'google' | 'bing' | 'duckduckgo' | 'youtube' | 'reddit';
	let engine: SearchEngine = 'google';
    let searchInput:any;
	let searchProviders: Record<SearchEngine, string> = {
		google: 'https://www.google.com/search?q=',
		bing: 'https://www.bing.com/search?q=',
		duckduckgo: 'https://duckduckgo.com/?q=',
		youtube: 'https://www.youtube.com/results?search_query=',
		reddit: 'https://www.reddit.com/search/?q='
	};


	interface Suggestion {
		word: string;
		score: number;
	}
    function handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      search();
    }
  }
	const search = () => {
		let searchUrl = searchProviders[engine] + searchQuery;
		if ($settingsoptions.find((settingsoption) => settingsoption.name === 'new_tab')?.value) {
			window.open(searchUrl, '_blank');
		} else {
			//open in same tab
			window.location.href = searchUrl;
		}
	};
    
  onMount(() => {
    if (!document.activeElement || document.activeElement === document.body) {
      searchInput.focus();
    }
  });
</script>

<div class="search-bar row">
	<input type="text" placeholder="Search..." on:keyup={handleKeyUp} bind:value={searchQuery} bind:this={searchInput}/>

	<label for="providerSelect">Choose a provider:</label>
	<select id="providerSelect">
		{#each Object.keys(searchProviders) as provider (provider)}
			<option id={provider} value={provider}>{provider}</option>
		{/each}
	</select>

	<button on:click={search}>
		<img src={searchicon} alt="search" />
	</button>
</div>

<style>
	.search-bar {
		width: clamp(300px, 60vw, 1000px);
		background-color: var(--iptcolor);
		border-radius: var(--border-radius);
		padding: var(--padding);
		height: 10vh;
		margin: var(--margin);
		font-size: 2vh;
	}

	input[type='text'] {
		padding: var(--padding);
		color: var(--ipttextcolor);
		width: 60%;
	}

	button {
		width: 10%;
	}
	img {
		height: 5vh;
	}

	select {
		width: 30%;
	}
</style>
