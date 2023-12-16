<script lang="ts">
	import { settingsoptions, siteanim, searchengine } from '../../dbase.js';
	let searchQuery = '';

	type SearchEngine = 'Google' | 'Bing' | 'Duckduckgo' | 'YouTube' | 'Reddit';
	let engine: SearchEngine = 'Google';
	let searchInput: any;
	let searchProviders: Record<SearchEngine, string> = {
		Google: 'https://www.google.com/search?q=',
		Bing: 'https://www.bing.com/search?q=',
		Duckduckgo: 'https://duckduckgo.com/?q=',
		YouTube: 'https://www.youtube.com/results?search_query=',
		Reddit: 'https://www.reddit.com/search/?q='
	};

	searchengine.subscribe((value) => {
		engine = value as SearchEngine;
	});

	let providericons: Record<SearchEngine, string> = {
		Google: 'https://s2.googleusercontent.com/s2/favicons?domain=google.com&sz=128',
		Bing: 'https://s2.googleusercontent.com/s2/favicons?domain=bing.com&sz=128',
		Duckduckgo: 'https://s2.googleusercontent.com/s2/favicons?domain=duckduckgo.com&sz=128',
		YouTube: 'https://s2.googleusercontent.com/s2/favicons?domain=youtube.com&sz=128',
		Reddit: 'https://s2.googleusercontent.com/s2/favicons?domain=reddit.com&sz=128'
	};

	$: searchengine.set(engine);

	const search = () => {
		siteanim.set(true);
		let searchUrl = searchProviders[engine] + searchQuery;
		console.log(searchUrl);
		let newwin = false;
		for (let i in $settingsoptions) {
			if ($settingsoptions[i].name === 'new_tab') {
				newwin = $settingsoptions[i].value;
			}
		}
		if (newwin) {
			window.open(searchUrl, '_blank');
		} else {
			window.location.href = searchUrl;
		}
	};

	function setsengine(engine: string) {
		console.log(engine);
		let e = engine as SearchEngine;
		searchengine.set(e);
	}

	function geticon(url: string) {
		const [, , domain] = url.split('/');
		let imgurl = `https://s2.googleusercontent.com/s2/favicons?domain=${domain}&sz=128`;
		return imgurl;
	}
	function getIconUrl(provider: string) {
		let p = provider as SearchEngine;
		return providericons[p];
	}
	$: searchicon = geticon(searchProviders[engine]);
</script>

<div class="search-bar row">
	<input
		type="search"
		placeholder="Search..."
		on:keyup={(event) => {
			if (event.key === 'Enter') {
				search();
			}
		}}
		bind:value={searchQuery}
		bind:this={searchInput}
		id="searchbar"
	/>
	<button type="submit" on:click={search} id="searchbtn" title="Go">
		<img src={searchicon} alt="search" />
	</button>
	<div class="dropdown">
		<button class="dropbtn">v</button>
		<div class="dropdown-content">
			{#each Object.keys(searchProviders) as provider (provider)}
				<button
					class="sbtn"
					on:click={() => {
						setsengine(provider);
					}}
				>
					<img
						class="simg"
						id={provider}
						alt={provider}
						title={provider}
						src={getIconUrl(provider)}
					/>
					{provider}
				</button>
			{/each}
		</div>
	</div>

	
</div>

<style>
	.search-bar {
		width: clamp(400px, 60vw, 1000px);
		background-color: var(--iptcolor);
		border-radius: var(--border-radius);
		margin: var(--margin);
		font-size: 100%;
		justify-content: space-between;
	}

	input[type='search'] {
		padding-left: 10px;
		color: var(--ipttextcolor);
		width: 85%;
	}

	input:focus {
		transform: none;
		box-shadow: none;
		outline: none;
	}
	/* label {
		display: none;
	} */
	button {
		width: 10%;
	}
	img {
		width: 60%;
	}

	/* select {
		width: 30%;
	} */
	@media (max-width: 600px) {
		.search-bar {
			width: 95vw;
			font-size: 100%;
			padding: calc(var(--padding) * 0.1);
		}

		/* select {
			width: 25%;
			font-size: 80%;
		} */
	}
	.dropdown {
		position: relative;
		width: 20px;
		display: inline-block;
		color: black;
	}
	.dropdown-content {
		display: none;
		position: absolute;
		min-width: 160px;
		z-index: 1;
	}
	.sbtn {
		color: black;
		width: 80px;
		padding: 2px 6px;
		margin: 5px;
		border-radius: var(--border-radius);
		text-decoration: none;
		display: block;
		background-color: var(--iptcolor);
	}
	.dropdown:hover .dropdown-content {
		display: block;
	}
	.dropbtn {
		width: 5%;
		height: 100%;
		background-color: var(--iptcolor);
		border: none;
		color: var(--ipttextcolor);
		font-size: 100%;
		cursor: pointer;
		border-radius: var(--border-radius);
	}

	.simg {
		width: 30px;
		aspect-ratio: 1/1;
		margin: 5px;
	}
</style>
