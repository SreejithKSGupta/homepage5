import { writable } from 'svelte/store';
import logo from '$lib/res/defuser.svg';
import defwall from '$lib/res/wallw.svg';

type SearchEngine = 'Google' | 'Bing' | 'Duckduckgo' | 'YouTube' | 'Reddit';

const siteslists =
	typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('sitelists') || '[]') : [];
const fontfamm =
	typeof window !== 'undefined'
		? JSON.parse(window.localStorage.getItem('fontfam') || '"sans-serif"')
		: 'sans-serif';
const andur =
	typeof window !== 'undefined'
		? JSON.parse(window.localStorage.getItem('animation_duration') || '500')
		: 500;
let setopts =
	typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('settingsoptions')!) : [];
let csvarslocal =
	typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('cssvars')!) : [];
let localwallpaper =
	typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('wallpaper')!) : null;
let searchenginelocal: SearchEngine =
	typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('searchengine')!) :'Google';
	if (searchenginelocal == null) {
		searchenginelocal = 'Google';
	}

if (setopts == null) {
	setopts = [
		{
			name: 'new_tab',
			text: 'Open in new tab',
			value: false,
			tyfe: 'checkbox'
		},
		{
			name: 'show_favsites',
			text: 'Show favorite sites',
			value: true,
			tyfe: 'checkbox'
		},
		{
			name: 'show_wallpaper',
			text: 'Show wallpaper',
			value: true,
			tyfe: 'checkbox'
		},
		{
			name: 'show_sitename',
			text: 'Show site names',
			value: true,
			tyfe: 'checkbox'
		}
	];
}
if (csvarslocal == null) {
	csvarslocal = [
		{ name: '--font-size', value: '16', unit: 'px', tag: 'Font Size', min: 10, max: 30, steps: 1 },
		{ name: '--margin', value: '10', unit: 'px', tag: 'Margin', min: 0, max: 20, steps: 1 },
		{ name: '--padding', value: '10', unit: 'px', tag: 'Padding', min: 5, max: 20, steps: 1 },
		{
			name: '--border-radius',
			value: '20',
			unit: 'px',
			tag: 'Border Radius',
			min: 0,
			max: 60,
			steps: 1
		},
		{
			name: '--sitelistwidth',
			value: '75',
			unit: 'vw',
			tag: 'Site List Width',
			min: 10,
			max: 90,
			steps: 1
		},
		{
			name: '--sitewidth',
			value: '60',
			unit: 'px',
			tag: 'Site Width',
			min: 30,
			max: 200,
			steps: 1
		},
		{
			name: '--sitebr',
			value: '50',
			unit: '%',
			tag: 'Site Border Radius',
			min: 0,
			max: 50,
			steps: 1
		},
		{
			name: '--bgcol',
			value: '#16041f',
			unit: 'color',
			tag: 'Background Color',
			min: 0,
			max: 0,
			steps: 0
		},
		{
			name: '--primary',
			value: '#17dfc4',
			unit: 'color',
			tag: 'Primary Color',
			min: 0,
			max: 0,
			steps: 0
		},
		{
			name: '--secondary',
			value: '#473a02',
			unit: 'color',
			tag: 'Secondary Color',
			min: 0,
			max: 0,
			steps: 0
		},
		{
			name: '--textcolor',
			value: '#ffffff',
			unit: 'color',
			tag: 'Text Color',
			min: 0,
			max: 0,
			steps: 0
		},
		{
			name: '--iptcolor',
			value: '#ffffff',
			unit: 'color',
			tag: 'Input Color',
			min: 0,
			max: 0,
			steps: 0
		},
		{
			name: '--ipttextcolor',
			value: '#000000',
			unit: 'color',
			tag: 'Input Text Color',
			min: 0,
			max: 0,
			steps: 0
		},
		{
			name: '--tooltipbgcol',
			value: '#052529',
			unit: 'color',
			tag: 'Tooltip Background Color',
			min: 0,
			max: 0,
			steps: 0
		}
	];
}
if (localwallpaper == null) {
	localwallpaper = defwall;
}

export const sitelists = writable(siteslists);
export const wallpaperurl = writable(localwallpaper);
export const animation_duration = writable(andur);
export const fontfam = writable(fontfamm);
export const settingsoptions = writable(setopts);
export const cssvars = writable(csvarslocal);
export const siteanim = writable(false);
export const focusbar = writable('searchbar');
export const focusbtn = writable('searchbtn');
export const searchengine = writable(searchenginelocal);

export const userdata = writable({
	name: 'User',
	buttonname: 'Sign in',
	photo: logo
});
export const fontopt = writable([
	'Arial',
	'Verdana',
	'Helvetica',
	'Tahoma',
	'Times New Roman',
	'Georgia',
	'Courier New',
	'Lucida Sans',
	'sans-serif',
	'serif',
	'monospace',
	'cursive',
	'Comic Sans MS',
	'Impact',
	'Trebuchet MS',
	'Arial Black',
	'MS Sans Serif',
	'Palatino Linotype',
	'Arial Narrow',
	'Gill Sans',
	'Franklin Gothic Medium',
	'Andale Mono',
	'Arial Rounded MT Bold',
	'Baskerville',
	'Futura',
	'Geneva',
	'Lucida Grande',
	'Book Antiqua',
	'Palatino',
	'Bookman',
	'Garamond',
	'Avant Garde',
	'Helvetica Narrow',
	'Zapf Chancery',
	'Century Gothic',
	'Symbol',
	'Webdings',
	'Wingdings',
	'MS Serif'
]);
export const tooltipviews = writable({
	actionview: false,
	addsiteview: false,
	editview: false,
	settingsview: false,
	profileview: false,
	aboutview: false
});
