<script lang="ts">
	import { settingsoptions, siteanim, searchengine } from '../../dbase.js';
	import dropdown from '$lib/res/dropdown.webp';
	
	type SearchEngine = 'Google' | 'Bing' | 'Duckduckgo' | 'YouTube' | 'Reddit';
	
	// Initialize variables
	let searchQuery = '';
	let searchInput: HTMLInputElement;
	let engine: SearchEngine;
	let searchicon: string;
	
	// Define search providers with their URLs
	const searchProviders: Record<SearchEngine, string> = {
		Google: 'https://www.google.com/search?q=',
		Bing: 'https://www.bing.com/search?q=',
		Duckduckgo: 'https://duckduckgo.com/?q=',
		YouTube: 'https://www.youtube.com/results?search_query=',
		Reddit: 'https://www.reddit.com/search/?q='
	};
	
	// Define provider icons (moved to constant)
	const providerIcons: Record<SearchEngine, string> = {
		Google: 'https://s2.googleusercontent.com/s2/favicons?domain=google.com&sz=128',
		Bing: 'https://s2.googleusercontent.com/s2/favicons?domain=bing.com&sz=128',
		Duckduckgo: 'https://s2.googleusercontent.com/s2/favicons?domain=duckduckgo.com&sz=128',
		YouTube: 'https://s2.googleusercontent.com/s2/favicons?domain=youtube.com&sz=128',
		Reddit: 'https://s2.googleusercontent.com/s2/favicons?domain=reddit.com&sz=128'
	};
	
	// Subscribe to searchengine store to get current value
	searchengine.subscribe((value) => {
		engine = value as SearchEngine;
		searchicon = getSearchIcon(engine);
	});
	
	// Update searchengine store when engine changes
	$: if (engine) {
		searchengine.set(engine);
	}
	
	/**
	 * Performs search using the selected search engine
	 */
	function search() {
		if (!searchQuery.trim()) return; // Prevent empty searches
		
		siteanim.set(true);
		const searchUrl = searchProviders[engine] + encodeURIComponent(searchQuery);
		
		// Check if search should open in new tab
		let openInNewTab = false;
		for (let i in $settingsoptions) {
			if ($settingsoptions[i].name === 'new_tab') {
				openInNewTab = $settingsoptions[i].value;
				break;
			}
		}
		
		if (openInNewTab) {
			window.open(searchUrl, '_blank', 'noopener,noreferrer');
		} else {
			window.location.href = searchUrl;
		}
	}
	
	/**
	 * Sets the current search engine
	 */
	function setSearchEngine(newEngine: string) {
		searchengine.set(newEngine as SearchEngine);
		// Focus the search input after changing engine for better UX
		setTimeout(() => searchInput?.focus(), 0);
	}
	
	/**
	 * Gets search icon for the current engine
	 */
	function getSearchIcon(engineName: SearchEngine): string {
		const baseUrl = searchProviders[engineName] || '';
		return `https://www.google.com/s2/favicons?sz=256&domain=${baseUrl}&size=320`;
	}
	
	/**
	 * Gets icon URL for a specific provider
	 */
	function getIconUrl(provider: string): string {
		return providerIcons[provider as SearchEngine];
	}
	
	// Handle keyboard shortcuts
	function handleKeydown(event: KeyboardEvent) {
		// Focus search bar with / key when not already focused
		if (event.key === '/' && document.activeElement !== searchInput) {
			event.preventDefault();
			searchInput?.focus();
		}
		
		// Allow Escape key to blur the search input
		if (event.key === 'Escape' && document.activeElement === searchInput) {
			searchInput.blur();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="search-bar row" role="search">
	<input
		type="text"
		placeholder={`Search with ${engine}...`}
		on:keydown={(event) => {
			if (event.key === 'Enter') {
				search();
			}
		}}
		bind:value={searchQuery}
		bind:this={searchInput}
		id="searchbar"
		aria-label="Search query"
	/>
	<div class="search-controls">
		<button 
			type="submit" 
			on:click={search} 
			id="searchbtn" 
			title="Search" 
			aria-label="Search"
			disabled={!searchQuery.trim()}
		>
			<img src={searchicon} alt={`Search with ${engine}`} />
		</button>
		<div class="dropdown">
			<button class="dropbtn" aria-label="Change search engine" title="Change search engine"> 
				<img src={dropdown} id="dropdownimg" alt="change search engine" /> 
			</button>
			<div class="dropdown-content" role="menu">
				{#each Object.keys(searchProviders) as provider (provider)}
					<button
						class="sbtn {engine === provider ? 'active' : ''}"
						on:click={() => setSearchEngine(provider)}
						aria-label={`Use ${provider}`}
						role="menuitem"
					>
						<img
							class="simg"
							alt={provider}
							title={provider}
							src={getIconUrl(provider)}
						/>
						<span>{provider}</span>
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
		padding: 0 10px;
		margin: var(--margin);
		font-size: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 6vh;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		transition: box-shadow 0.3s ease;
	}
	
	.search-bar:focus-within {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	#searchbar {
		color: var(--ipttextcolor);
		width: 85%;
		height: 100%;
		border: none;
		background: transparent;
		font-size: 1rem;
		padding: 0 0.5rem;
	}

	.search-controls {
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
		height: 80%;
		width: 60%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		cursor: pointer;
		transition: transform 0.2s ease;
	}
	
	#searchbtn:hover {
		transform: scale(1.1);
	}
	
	#searchbtn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	
	#searchbtn img {
		height: 100%;
		max-height: 24px;
		aspect-ratio: 1/1;
		object-fit: contain;
	}

	.dropdown {
		position: relative;
		display: inline-block;
		height: 80%;
		width: 40%;
	}
	
	.dropbtn {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		cursor: pointer;
		transition: transform 0.2s ease;
	}
	
	.dropbtn:hover {
		transform: scale(1.1);
	}
	
	.dropdown-content {
		display: none;
		position: absolute;
		right: 0;
		top: 100%;
		z-index: 10;
		border-radius: var(--border-radius);
		background-color: var(--secondary);
		padding: 10px;
		box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
		min-width: 180px;
	}

	#dropdownimg {
		width: 50%;
		max-width: 20px;
		aspect-ratio: 1/1;
		object-fit: contain;
	}
	
	.sbtn {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 8px;
		color: var(--ipttextcolor);
		padding: 8px 10px;
		margin: 5px 0;
		border-radius: var(--border-radius);
		text-decoration: none;
		width: 100%;
		text-align: left;
		background-color: var(--iptcolor);
		border: none;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}
	
	.sbtn:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
	
	.sbtn.active {
		background-color: rgba(255, 255, 255, 0.15);
		font-weight: bold;
	}
	
	.dropdown:hover .dropdown-content,
	.dropdown:focus-within .dropdown-content {
		display: block;
	}

	.sbtn img {
		width: 20px;
		aspect-ratio: 1/1;
		object-fit: contain;
	}

	@media (max-width: 600px) {
		.search-bar {
			width: 95vw;
			font-size: 100%;
			padding: calc(var(--padding) * 0.1);
		}

		.dropdown-content {
			right: 0;
		}
		
		#searchbar {
			width: 70%;
		}
		
		.search-controls {
			width: 30%;
		}
		
		.sbtn {
			padding: 10px;
		}
	}
</style>