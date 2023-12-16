<script lang="ts">
	import { tooltipviews } from '../../dbase.js';
	let shortcuts = [
		{ scut: 'alt + s', fn: 'Open Settings' },
		{ scut: 'alt + a', fn: 'Add New site'  },
		{ scut: 'alt + p', fn: 'Open Profile'  },
		{ scut: 'alt + h', fn: 'Open About'    },
		{ scut: 'alt + c', fn: 'Edit Sites'    },
		{ scut: 'alt + m', fn: 'More options'  },
		{ scut: "alt+'n'", fn: 'Open nth Site' },
		{ scut: 'esc',     fn: 'Close Tooltip' }
	];
	let features = [
		'Add favourite sites',
		'Sync favourite sites',
		'No ads',
		'No trackers',
		'Nice animations',
		'Keyboard shortcuts',
		'Change search engine',
		'Customizable background',
		'Customizable icons',
		'Customizable fonts',
		'Customizable colors',
		'Install as PWA',
		'Install as web extension',
		'Open source'
	];
	let aboutItems = [
		{
			title: 'What is Homepage?',
			description:
				'Homepage aims to provide an android launcher type interface for web browsers, with ample features and customizations to make your browsing experience more efficient and enjoyable.'
		},
		{
			title: 'Why ?',
			description:
				"I first started working on this project because I wanted to have a more efficient way to browse the web. the lack of customization and features in most browsers made me want to create my own. I also wanted to learn more about web development and javascript. If you are unhappy with your current browsing experience, or just want to try something new, give Homepage a try!, it's not only easy, but highly efficient and customizable too, especially if you have multiple devices and multiple frequently visited websites"
		},
		{
			title: 'How to use',
			description:
				'Just sign in with your google account, and start adding your favorite websites to your homepage. you can also choose the default search engine easily. alternatively, you can set it to replace the new tab page, or set it as your homepage in your browser settings. you can also use a web extension for doing this easily, which you can find below.'
		},
		 {
			title : "Privacy",
			description : "Homepage does not collect any data from you, and does not use any trackers or analytics. The only data that is stored is your favourite sites, which is stored in your google account, and is only used to sync your favourite sites across devices. Technically, it is as secure as your google account."
		 }
	];

	let links = [
        {
            name: 'Edge',
            url: 'https://microsoftedge.microsoft.com/addons/detail/new-tab-changer/dlbnebcbaeajdpekcdhmcgdhoodcjpeg'
        },
        {
            name: 'Chrome',
            url: 'https://chrome.google.com/webstore/detail/new-tab-changer/occbjkhimchkolibngmcefpjlbknggfh'
        },
        {
            name: 'Firefox',
            url: 'https://addons.mozilla.org/en-US/firefox/addon/new-tab-override/'
        },
    ];
</script>

{#if $tooltipviews.aboutview}
	<div  class="tooltip">
		<h1 class="aboutitem" id="aboutheading">About</h1>
		{#each aboutItems as { title, description }}
			<div class="aboutitem">
				<h2>{title}</h2>
				<p>{description}</p>
			</div>
		{/each}

	<div class="button_links">
		{#each links as { name, url }}
			<li>
				<a href={url}>{name}</a>
			</li>
		{/each}
	</div>
	<div class="aboutitem">
		<h2>Features</h2>
		{#each features as feature}
			<li>{feature}</li>
		{/each}
	</div>
	<div class="aboutitem">
		<h2>Keyboard shortcuts</h2>
		<ul>
		{#each shortcuts as { scut, fn }}
			<span>
				<div class="scuts">{scut}</div>
				<div class="fns">{fn}</div>
			</span>
		{/each}
	</ul>
	</div>
	<div class="aboutitem">
		<h2>Source code</h2>
		<p>Homepage is open source, and made with Sveltekit. You can find the source code on github.</p>
		<a class="btn" href="https://github.com/SreejithKSGupta/homepage5" target="_blank">Github</a>
	</div>
	<div class="aboutitem">
		<h2>Contact</h2>
		<p>If you have any questions, suggestions, or just want to say hi, you can contact me at</p>
		<a class="btn" href="mailto:sreejithksgupta2255@gmail.com" target="_blank">Send Email</a>
	</div>
</div>
{/if}

<style>
	.tooltip {
		position: absolute;
		z-index: 5;
		top: 15vh;
		width: clamp(250px, 70vw, 800px);
		height: 60vh;
		overflow-y: scroll;
		justify-content: flex-start;
		background-color: var(--tooltipbgcol);
		border-radius: var(--border-radius);
		padding: var(--padding);
	}

	.tooltip p {
		margin: 10px;
		padding: var(--padding);
	}

	.tooltip h1 {
		font-size: 250%;
		margin: 10px;
		text-align: center;
		padding: var(--padding);
		color: var(--primary);
	}
	.aboutitem {
		margin: 10px;
		padding: calc(var(--padding) * 2);
		border-radius: var(--border-radius);
		background-color: rgb(29, 24, 29);
		color: var(--tooltipcol);
		font-size: 120%;
	}

	.aboutitem:focus-within {
		box-shadow: 0px 0px 1px 1px var(--primary);
	}
	.aboutitem h2 {
		font-size: 150%;
		margin: 10px;
		padding: var(--padding);
		color: var(--primary);
	}
	ul {
		margin: 10px;
		padding: var(--padding);
		color: var(--tooltipcol);
		font-size: 120%;
	}
	li {
		display: flex;
		flex-direction: row;
		padding: var(--padding);
	}
	li:nth-child(odd) {
		background-color: var(--tooltipbgcol);
	}
	.scuts {
		width: 20%;
	}
	.fns {
		width: 70%;
	}

	a {
		margin: var(--margin);
		padding: 10px;
		border-radius: var(--border-radius);
		background-color: blue;
		text-decoration: none;
		text-align: center;
	}
	 a:hover {
		background-color: var(--primary);
		transform: scale(1.1);
	}
	a:active {
		background-color: var(--primary-active);
		transform: scale(0.9);
	}
	@media screen and (max-width: 600px) {
		.tooltip {
			width: 95vw;
			height: 70vh;
			top: 15vh;
		}
	}
	.button_links {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>