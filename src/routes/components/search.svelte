<script lang="ts">
	import { settingsoptions, siteanim, searchengine } from '../../dbase.js';
	import dropdown from '$lib/res/dropdown.webp';
	let searchQuery = '';

	type SearchEngine = 'Google' | 'Bing' | 'Duckduckgo' | 'YouTube' | 'Reddit';
	let engine: SearchEngine = 'Google';
	let searchicon: string ;
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
		searchicon= geticon(searchProviders[engine]);
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
		let e = engine as SearchEngine;
		searchengine.set(e);
	}

	function geticon(url: string) {
		var favicon = "https://www.google.com/s2/favicons?sz=256&domain=" + url + "&size=320";
        return favicon;
}




	function getIconUrl(provider: string) {
		let p = provider as SearchEngine;
		return providericons[p];
	}
</script>

<div class="search-bar row">
	<input
		type="text"
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
	<div class="searchmenu">
	<button type="submit" on:click={search} id="searchbtn" title="Go">
		<img src={searchicon} alt="search" />
	</button>
	<div class="dropdown">
		<button class="dropbtn"> <img src={dropdown} id="dropdownimg" alt="change searchengine" title="change"> </button>
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
					/><br>
					{provider}
				</button>
			{/each}
		</div>
	</div>
</div>
</div>

<style>
	.search-bar {
		width: clamp(400px, 60vw, 1000px);
		background-color: var(--iptcolor);
		border-radius: var(--border-radius);
		padding: 0px 10px;
		margin: var(--margin);
		font-size: 100%;
		justify-content: space-evenly;
		height: 6vh;
	}

	#searchbar {
		color: var(--ipttextcolor);
		width: 85%;
	}

	.searchmenu{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-evenly;
		width: 15%;
		height: 100%;
	}



	#searchbar:focus {
		transform: none;
		box-shadow: none;
		outline: none;
	}

	 #searchbtn {
		height: 90%;
		width: 60%;
	 }
	#searchbtn img {
		height:100%;
		aspect-ratio: 1/1;
	}


	.dropdown {
		position: relative;
		display: inline-block;
		color: black;
		width: 40%;
	}
	.dropdown-content {
		display: none;
		position: absolute;
		z-index: 1;
		border-radius: var(--border-radius);
		background-color: var(--secondary);
		padding: 10px;
	}

	#dropdownimg {
		width: 50%;
		aspect-ratio: 1/1;
	}
	.sbtn {
		display: flex;
		flex-direction:column;
		align-items:center;
		justify-content: center;
		color: black;
		padding: 2px 6px;
		margin: 5px;
		border-radius: var(--border-radius);
		text-decoration: none;
		min-width:150px;
		display: block;
		background-color: var(--iptcolor);
	}
	.dropdown:hover .dropdown-content {
		display: block;
	}

	.dropdown button img {
		width: 20px;
		aspect-ratio: 1/1;
	}



	@media (max-width: 600px) {
		.search-bar {
			width: 95vw;
			font-size: 100%;
			padding: calc(var(--padding) * 0.1);
		}

		.dropdown-content {
			right: 1px;
		}
		#searchbar {
		color: var(--ipttextcolor);
		width: 70%;
	     }
		.searchmenu{
			width: 30%;
		}
	}
</style>
