import { writable } from "svelte/store";
import logo from '$lib/res/defuser.webp';
import wallpaper from '$lib/res/wallw.webp';

var jsonoptns=[
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
]

const siteslists = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('sitelists') || '[]') : [];
const fontfamm = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('fontfam') || '"sans-serif"') : 'sans-serif';
const andur = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('animation_duration') || "500") : 500;
let setopts =     typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('settingsoptions')!)  : [];
if(setopts.length==0){
  setopts=jsonoptns;
}
let csvarslocal = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('cssvars')!) : [];
if(csvarslocal==null){
  csvarslocal=[
      { name: '--font-size', value: '16', unit: 'px', tag: 'Font Size', min: 10, max: 30, steps: 1 },
      { name: '--margin', value: '10', unit: 'px', tag: 'Margin', min: 0, max: 20, steps: 1 },
      { name: '--padding', value: '10', unit: 'px', tag: 'Padding', min: 5, max: 20, steps: 1 },
      { name: '--border-radius', value: '20', unit: 'px', tag: 'Border Radius', min: 0, max: 60, steps: 1 },
      { name: '--sitelistwidth', value: '75', unit: 'vw', tag: 'Site List Width', min: 10, max: 90, steps: 1 },
      { name: '--sitewidth', value: '60', unit: 'px', tag: 'Site Width', min: 30, max: 200, steps: 1 },
      { name: '--sitebr', value: '50', unit: '%', tag: 'Site Border Radius', min: 0, max: 50, steps: 1 },
      { name: '--bgcol', value: '#16041f', unit: 'color', tag: 'Background Color', min: 0, max: 0, steps: 0 },
      { name: '--primary', value: '#17dfc4', unit: 'color', tag: 'Primary Color', min: 0, max: 0, steps: 0 },
      { name: '--secondary', value: '#473a02', unit: 'color', tag: 'Secondary Color', min: 0, max: 0, steps: 0 },
      { name: '--textcolor', value: '#ffffff', unit: 'color', tag: 'Text Color', min: 0, max: 0, steps: 0 },
      { name: '--iptcolor', value: '#ffffff', unit: 'color', tag: 'Input Color', min: 0, max: 0, steps: 0 },
      { name: '--ipttextcolor', value: '#000000', unit: 'color', tag: 'Input Text Color', min: 0, max: 0, steps: 0 },
      { name: '--tooltipbgcol', value: '#052529', unit: 'color', tag: 'Tooltip Background Color', min: 0, max: 0, steps: 0 },
    ]
}




export let sitelists = writable(siteslists);
export let wallpaperurl = writable(wallpaper);
export let animation_duration = writable(andur);
export let fontfam = writable(fontfamm); 






export let userdata = writable({
  name: 'User',
  buttonname: 'sign in',
  photo: logo,
});

export let settingsoptions = writable(setopts);
export let cssvars = writable(csvarslocal);

export let fontopt = writable([
  'Arial',
  'Verdana',
  'Helvetica',
  'Tahoma',
  'Times New Roman',
  'Georgia',
  'Garamond',
  'Courier New',
  'Brush Script MT',
  'Lucida Sans',
  'sans-serif',
  'serif',
  'monospace',
  'cursive',
]);

export let tooltipviews = writable({
  actionview: false,
  addsiteview: false,
  editview: false,
  settingsview: false,
  profileview: false,
  aboutview: false,
});