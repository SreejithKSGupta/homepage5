import { c as create_ssr_component, a as validate_store, b as subscribe, e as escape } from "../../chunks/ssr.js";
import { s as settingsoptions, w as wallpaperurl } from "../../chunks/dbase.js";
const style = "";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "#content.s-7IPF32Wcq3s8{height:100vh;width:100vw ;background-color:var(--bgcol)}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $settingsoptions, $$unsubscribe_settingsoptions;
  let $wallpaperurl, $$unsubscribe_wallpaperurl;
  validate_store(settingsoptions, "settingsoptions");
  $$unsubscribe_settingsoptions = subscribe(settingsoptions, (value) => $settingsoptions = value);
  validate_store(wallpaperurl, "wallpaperurl");
  $$unsubscribe_wallpaperurl = subscribe(wallpaperurl, (value) => $wallpaperurl = value);
  $$result.css.add(css);
  $$unsubscribe_settingsoptions();
  $$unsubscribe_wallpaperurl();
  return `${$settingsoptions.find((settingsoption) => settingsoption.name === "show_wallpaper")?.value ? `<div id="content" class="col s-7IPF32Wcq3s8" style="${"background-image: url(" + escape($wallpaperurl, true) + ");"}">${slots.default ? slots.default({}) : ``}</div>` : `<div id="content" class="col s-7IPF32Wcq3s8">${slots.default ? slots.default({}) : ``}</div>`}`;
});
export {
  Layout as default
};
