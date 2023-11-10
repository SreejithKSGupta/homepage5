<script lang="ts">
	import { tooltipviews } from '../../dbase.js';
</script>

{#if $tooltipviews.aboutview}
	<div class="tooltip">
		<h1>About</h1>
		<div class="aboutitem">
			<h2>What is Homepage?</h2>
			<p>
				Homepage aims to provide an android launcher type interface for web browsers, with ample
				features and customizations to make your browsing experience more efficient and enjoyable.
			</p>
		</div>
		<div class="aboutitem">
			<h2>Why ?</h2>
			<p>
				I first started working on this project because I wanted to have a more efficient way to
				browse the web. the lack of customization and features in most browsers made me want to
				create my own. I also wanted to learn more about web development and javascript.
				<br />
				If you are unhappy with your current browsing experience, or just want to try something new,
				give Homepage a try!, it's not only easy, but highly efficient and customizable too, especially
				if you have multiple devices and muliple frequently wisited websites
			</p>
		</div>
		<div class="aboutitem">
			<h2>How to use</h2>
			<p>
				Just sign in with your google account, and start adding your favorite websites to your
				homepage. you can also choose the defaut search engine easily.
				<br />
				alternatively, youcan set it to replace the newtab page, or set it as your homepage in your browser
				settings. you can also use a web extention for doing this easily, which you can find below.
			</p>
			<ul>
				<li>
					<a
						href="https://microsoftedge.microsoft.com/addons/detail/new-tab-changer/dlbnebcbaeajdpekcdhmcgdhoodcjpeg"
					>
						Edge: New Tab Changer
					</a>
				</li>
				<li>
					<a
						href="https://chrome.google.com/webstore/detail/new-tab-changer/occbjkhimchkolibngmcefpjlbknggfh"
					>
						Chrome: New Tab Changer
					</a>
				</li>

				<li>
					<a href="https://addons.mozilla.org/en-US/firefox/addon/new-tab-override/">
						Firefox: New Tab Changer
					</a>
				</li>
			</ul>
		</div>
		<div class="aboutitem">
			<h2>Features</h2>
			<ul>
				<li>Add favourite sites</li>
				<li>Sync favourite sites</li>
				<li>No ads</li>
				<li>No trackers</li>
				<li>Nice animations</li>
				<li>Keyboard shortcuts</li>
				<li>Change search engine</li>
				<li>Customizable background</li>
				<li>Customizable icons</li>
				<li>Customizable fonts</li>
				<li>Customizable colors</li>
				<li>Install as PWA</li>
				<li>Install as web extention</li>
				<li>Open source</li>
			</ul>
		</div>
		<div class="aboutitem">
			<h2>Keyboard shortcuts</h2>
			<ul>
				<li>
					<div class="scuts">alt + s</div>
					<div class="fns">Open Settingsicon</div>
				</li>
				<li>
					<div class="scuts">alt + a</div>
					<div class="fns">Open New site tooltip</div>
				</li>
				<li>
					<div class="scuts">alt + p</div>
					<div class="fns">Open Profile</div>
				</li>
				<li>
					<div class="scuts">alt + h</div>
					<div class="fns">Open About</div>
				</li>
				<li>
					<div class="scuts">alt + c</div>
					<div class="fns">Edit Sites</div>
				</li>
				<li>
					<div class="scuts">alt + m</div>
					<div class="fns">More options</div>
				</li>
				<li>
					<div class="scuts">alt+'n'</div>
					<div class="fns">Open nth Site</div>
				</li>
				<li>
					<div class="scuts">esc</div>
					<div class="fns">close tooltip</div>
				</li>
			</ul>
		</div>
		<div class="aboutitem">
			<h2>Privacy</h2>
			<p>
				Homepage does not collect any data from you, and does not use any trackers or analytics.
				<br />
				The only data that is stored is your favourite sites, which is stored in your google account,
				and is only used to sync your favourite sites across devices. Technically, it is as secure as
				your google account.
			</p>
		</div>
		<div class="aboutitem">
			<h2>Source code</h2>
			<p>
				Homepage is open source, and made with Sveltekit. You can find the source code on github.
      </p>
				<a class="btn" href="https://github.com/SreejithKSGupta/homepage5">Github</a>
			
		</div>
		<div class="aboutitem">
			<h2>Contact</h2>
			<p>
				If you have any questions, suggestions, or just want to say hi, you can contact me at
      </p>
				<a class="btn" href="mailto:sreejithksgupta2255@gmail.com">GMail</a>
		
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
	.aboutitem h2 {
		font-size: 150%;
		margin: 10px;
		padding: var(--padding);
		color: var(--primary);
	}
	.aboutitem ul {
		margin: 10px;
		padding: var(--padding);
		color: var(--tooltipcol);
		font-size: 120%;
	}
	.aboutitem li {
		display: flex;
		flex-direction: row;
	}
	.scuts {
		width: 20%;
	}
	.fns {
		width: 70%;
	}

	.btn {
    margin: var(--margin);
		padding: 10px;
		border-radius: var(--border-radius);
		background-color: blue;
		text-decoration: none;
	}
	.btn:hover {
		background-color: var(--primary);
		transform: scale(1.1);
	}
	.btn:active {
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
</style>
