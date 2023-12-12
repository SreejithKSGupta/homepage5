<script lang="ts">
	import { scale } from 'svelte/transition'

    import editicon from '$lib/res/delsite.svg';
    import { settingsoptions, tooltipviews, sitelists} from '../../dbase'
    let showSiteName = false;
    export let site : {id:number, name: string, url: string};
	export let index: number;

    function gotowebsite(url: string, target: EventTarget) {
        if ($settingsoptions[0].value == 0) {
            // full screen animation
        }
        $settingsoptions[0].value ? window.open(url, '_blank') : (window.location.href = url);
    }

    function geticon(url: string) {
        const [, , domain] = url.split('/');
        let imgurl = `https://s2.googleusercontent.com/s2/favicons?domain=${domain}&sz=128`;
        return imgurl;
    }

    function setdeficon(e: Event) {
        if (e.target instanceof HTMLImageElement) {
            e.target.src = editicon;
        }
    }
	function deletesite(option: number) {
		const newTracklist = [...$sitelists];
		newTracklist.splice(option, 1);
		sitelists.set(newTracklist);
	}
	
	
		$: {
    const option = $settingsoptions.find(
        (option: { name: string }) => option.name === 'show_sitename'
    );
    if (option) {
        showSiteName = option.value;
    }
}
</script>

<div 
    title={site.url}
    class="sitebtn col"
    role="button"
    tabindex="-1"
    on:click={(event) => {
        if (event.target) {
            gotowebsite(site.url, event.target);
        }
    }}
    on:keydown={(event) => {
        if (event.key === 'Enter' && event.target) {
            gotowebsite(site.url, event.target);
        }
    }}
>
    <img class="siteicon" src={geticon(site.url)} on:error={setdeficon} alt={site.url} />
</div>
{#if $tooltipviews.editview} 
   <button class="delbtn" on:click={() => deletesite(index)} title="remove {site.name}">
		<img transition:scale src={editicon} alt="edit" />
	</button>
{/if}
{#if showSiteName}
	<span>{site.name}</span>
{/if}

<style >
    	.sitebtn {
		font-size: 170%;
		border-radius: var(--sitebr);
		margin: calc(var(--margin) * 3);
		background-color: white;
	}
	.sitebtn:hover,
	.sitebtn:focus {
		color: var(--primary);
	}
	.siteicon {
		border-radius: var(--sitebr);
		width: var(--sitewidth);
	}
	.delbtn,
	.delbtn img {
		width: calc(var(--sitewidth) * 0.3);
	}
</style>