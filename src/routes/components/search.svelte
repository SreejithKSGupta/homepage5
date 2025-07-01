<script lang="ts">
	import { settingsoptions, siteanim, searchengine } from '../../dbase.js';
	import dropdown from '$lib/res/dropdown.webp';

	type SearchEngine = 'Google' | 'Bing' | 'Duckduckgo' | 'YouTube' | 'Reddit';

	let searchQuery = '';
	let searchInput: HTMLInputElement;
	let dropdownOpen = false;

	const searchProviders: Record<SearchEngine, string> = {
		Google: 'https://www.google.com/search?q=',
		Bing: 'https://www.bing.com/search?q=',
		Duckduckgo: 'https://duckduckgo.com/?q=',
		YouTube: 'https://www.youtube.com/results?search_query=',
		Reddit: 'https://www.reddit.com/search/?q='
	};

	const providerIcons: Record<SearchEngine, string> = {
		Google: 'https://s2.googleusercontent.com/s2/favicons?domain=google.com&sz=128',
		Bing: 'https://s2.googleusercontent.com/s2/favicons?domain=bing.com&sz=128',
		Duckduckgo: 'https://s2.googleusercontent.com/s2/favicons?domain=duckduckgo.com&sz=128',
		YouTube: 'https://s2.googleusercontent.com/s2/favicons?domain=youtube.com&sz=128',
		Reddit: 'https://s2.googleusercontent.com/s2/favicons?domain=reddit.com&sz=128'
	};

	let engine: SearchEngine;
	$: engine = $searchengine;
	$: searchIcon = providerIcons[engine];

	function search() {
		const trimmedQuery = searchQuery.trim();
		if (!trimmedQuery) return;
		siteanim.set(true);

		const searchUrl = searchProviders[engine] + encodeURIComponent(trimmedQuery);
		const openInNewTab = $settingsoptions.find((opt: { name: string }) => opt.name === 'new_tab')?.value ?? false;

		if (openInNewTab) {
			window.open(searchUrl, '_blank', 'noopener,noreferrer');
		} else {
			window.location.href = searchUrl;
		}
		dropdownOpen = false;
	}

	function setSearchEngine(newEngine: SearchEngine) {
		searchengine.set(newEngine);
		dropdownOpen = false;
		setTimeout(() => searchInput?.focus(), 0);
	}

	function toggleDropdown() {
		dropdownOpen = !dropdownOpen;
		if (dropdownOpen) {
			setTimeout(() => {
				const firstBtn = document.querySelector<HTMLButtonElement>('.dropdown-content button');
				firstBtn?.focus();
			}, 0);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === '/' && document.activeElement !== searchInput) {
			event.preventDefault();
			searchInput?.focus();
		} else if (event.key === 'Escape') {
			if (dropdownOpen) {
				dropdownOpen = false;
			} else if (document.activeElement === searchInput) {
				searchInput.blur();
			}
		}
	}

	function handleClickOutside(event: MouseEvent) {
		const path = event.composedPath();
		if (!path.some(el => (el as HTMLElement).classList?.contains('search-container'))) {
			dropdownOpen = false;
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} on:click={handleClickOutside} />

<div class="search-container" role="search">
	<div class="search-input-wrapper" aria-haspopup="listbox" aria-expanded={dropdownOpen}>
		<button
			type="button"
			class="engine-selector"
			aria-label="Select search engine"
			on:click={toggleDropdown}
			aria-haspopup="true"
			aria-expanded={dropdownOpen}
			aria-controls="engine-list"
		>
			<img src={searchIcon} alt={engine + ' icon'} class="engine-icon" />
			<img src={dropdown} alt="Toggle search engine dropdown" class="dropdown-arrow" />
		</button>
		<input
			id="searchbar"
			type="text"
			placeholder={`Search with ${engine}...`}
			bind:value={searchQuery}
			bind:this={searchInput}
			on:keydown={(e) => e.key === 'Enter' && search()}
			aria-label="Search query"
		/>
	</div>
	<button
		type="submit"
		id="searchbtn"
		title="Search"
		aria-label="Search"
		disabled={!searchQuery.trim()}
		on:click={search}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			class="search-icon"
			aria-hidden="true"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
				d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
		</svg>
	</button>

	{#if dropdownOpen}
		<div class="dropdown-content" role="listbox" id="engine-list" tabindex="-1" aria-label="Search engine options">
			{#each Object.keys(searchProviders) as provider (provider)}
				<button
					type="button"
					role="option"
					aria-selected={engine === provider}
					class="sbtn {engine === provider ? 'active' : ''}"
					on:click={() => setSearchEngine(provider as SearchEngine)}
				>
					<img class="simg" alt={provider} title={provider} src={providerIcons[provider as SearchEngine]} />
					<span>{provider}</span>
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>

.search-container {
  width: clamp(400px, 60vw, 1000px);
  display: flex;
  align-items: center;
  background-color: var(--iptcolor);
  border-radius: var(--border-radius);
  padding: 0.15rem 0.25rem;
  margin: var(--margin);
  font-size: 1rem;
  position: relative;
}

.search-input-wrapper {
  flex-grow: 1;
  display: flex;
  align-items: center;
  background: transparent;
  border-radius: var(--border-radius);
  border: none;
  transition: none;
}

.engine-selector {
  display: flex;
  align-items: center;
  background: transparent;
  padding: 0 0.5rem;
  cursor: pointer;
  user-select: none;
  border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  flex-shrink: 0;
  transition: background-color 0.2s ease;
}

.engine-selector:hover,
.engine-selector:focus-visible {
  background-color: rgba(0, 0, 0, 0.05);
  outline: none;
  transform: none;
}

.engine-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.dropdown-arrow {
  width: 14px;
  height: 14px;
  margin-left: 6px;
  filter: brightness(0.5);
  transition: transform 0.3s ease;
}

[aria-expanded="true"] .dropdown-arrow {
  transform: rotate(180deg);
  filter: brightness(1);
}

input#searchbar {
  flex-grow: 1;
  height: 2.8rem;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: var(--ipttextcolor);
  padding: 0 0.75rem;
  border-top-right-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
  outline: none;
  box-sizing: border-box;
}

input#searchbar::placeholder {
  color: var(--ipttextcolor);
  opacity: 0.7;
}

input#searchbar:focus {
  outline: none;
  box-shadow: none;
}

button#searchbtn {
  margin-left: 0.5rem;
  border: none;
  border-radius: var(--border-radius);
  color: var(--ipttextcolor);
  background-color: black;
  height: 2.8rem;
  width: 2.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  box-sizing: border-box;
}

button#searchbtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button#searchbtn:hover:not(:disabled),
button#searchbtn:focus-visible:not(:disabled) {
  background-color: #222;
  outline: none;
  transform: none;
}

.search-icon {
  width: 20px;
  height: 20px;
  stroke: currentColor;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 20;
  background-color: var(--secondary);
  border-radius: var(--border-radius);
  margin-top: 4px;
  width: max-content;
  min-width: 180px;
  user-select: none;
  padding: 4px 0;
}

.sbtn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--ipttextcolor);
  font-size: 0.95rem;
  transition: background-color 0.2s ease;
  text-align: left;
}

.sbtn:hover,
.sbtn:focus-visible {
  background-color: rgba(255, 255, 255, 0.1);
  outline: none;
}

.sbtn.active {
  background-color: rgba(255, 255, 255, 0.15);
  font-weight: 600;
}

.simg {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

@media (max-width: 600px) {
  .search-container {
    width: 95vw;
  }

  input#searchbar {
    font-size: 0.95rem;
  }

  button#searchbtn {
    height: 2.4rem;
    width: 2.4rem;
  }

  .sbtn {
    font-size: 0.9rem;
    padding: 8px 12px;
  }
}

</style>
