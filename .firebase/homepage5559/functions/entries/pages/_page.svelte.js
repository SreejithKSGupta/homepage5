import { c as create_ssr_component, a as validate_store, b as subscribe, e as escape, d as add_attribute, f as each, v as validate_component } from "../../chunks/ssr.js";
import { t as tooltipviews, u as userdata, a as animation_duration, s as settingsoptions, b as sitelists, f as fontfam, c as fontopt, d as cssvars } from "../../chunks/dbase.js";
function client_method(key) {
  {
    if (key === "before_navigate" || key === "after_navigate" || key === "on_navigate") {
      return () => {
      };
    } else {
      const name_lookup = {
        disable_scroll_handling: "disableScrollHandling",
        preload_data: "preloadData",
        preload_code: "preloadCode",
        invalidate_all: "invalidateAll"
      };
      return () => {
        throw new Error(`Cannot call ${name_lookup[key] ?? key}(...) on the server`);
      };
    }
  }
}
const about_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: ".tooltip.s-2ZfdIX_flAC3{position:absolute;z-index:5;top:15vh;width:clamp(250px, 60vw, 800px);height:60vh;overflow-y:scroll;justify-content:flex-start;background-color:var(--tooltipbgcol);border-radius:var(--border-radius);padding:var(--padding)}",
  map: null
};
const About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $tooltipviews, $$unsubscribe_tooltipviews;
  validate_store(tooltipviews, "tooltipviews");
  $$unsubscribe_tooltipviews = subscribe(tooltipviews, (value) => $tooltipviews = value);
  $$result.css.add(css$6);
  $$unsubscribe_tooltipviews();
  return `${$tooltipviews.aboutview ? `<div class="tooltip s-2ZfdIX_flAC3"><h1 data-svelte-h="svelte-etk01z">About Us</h1> <p data-svelte-h="svelte-12qjnf2">Welcome to our About page. Here, we share our story, mission, and values.</p></div>` : ``}`;
});
const topbar_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: "header.s-GqlKYAch1ajr.s-GqlKYAch1ajr{width:100vw;padding:0 5vw;background-color:var(--bgcolor);height:10vh;justify-content:space-between}header.s-GqlKYAch1ajr div.s-GqlKYAch1ajr{width:30%}#clock.s-GqlKYAch1ajr.s-GqlKYAch1ajr{font-size:150%}#profile.s-GqlKYAch1ajr.s-GqlKYAch1ajr{justify-content:end}#proimg.s-GqlKYAch1ajr.s-GqlKYAch1ajr{height:8vh;border-radius:var(--sitebr);align-self:right}#profilemenu.s-GqlKYAch1ajr.s-GqlKYAch1ajr{position:fixed;width:15vw;top:15vh;right:1vw;background-color:var(--tooltipbgcol);z-index:1;border-radius:var(--border-radius);padding:var(--padding);color:var(--textcolor)}#optbtns.s-GqlKYAch1ajr.s-GqlKYAch1ajr{border-radius:var(--border-radius);background-color:var(--primary);padding:var(--padding);margin:var(--margin);width:80%;font-size:larger}",
  map: null
};
const Topbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $userdata, $$unsubscribe_userdata;
  let $tooltipviews, $$unsubscribe_tooltipviews;
  let $$unsubscribe_animation_duration;
  validate_store(userdata, "userdata");
  $$unsubscribe_userdata = subscribe(userdata, (value) => $userdata = value);
  validate_store(tooltipviews, "tooltipviews");
  $$unsubscribe_tooltipviews = subscribe(tooltipviews, (value) => $tooltipviews = value);
  validate_store(animation_duration, "animation_duration");
  $$unsubscribe_animation_duration = subscribe(animation_duration, (value) => value);
  let time = /* @__PURE__ */ (/* @__PURE__ */ new Date()).toLocaleTimeString();
  let date = /* @__PURE__ */ (/* @__PURE__ */ new Date()).toLocaleDateString();
  $$result.css.add(css$5);
  $$unsubscribe_userdata();
  $$unsubscribe_tooltipviews();
  $$unsubscribe_animation_duration();
  return `<header class="row s-GqlKYAch1ajr"><div id="clock" class="col s-GqlKYAch1ajr"><span>${escape(date)}</span> <span>${escape(time)}</span></div> <div id="greetings" class="row s-GqlKYAch1ajr"><h1>${escape($userdata.name)}</h1></div> <div id="profile" class="row s-GqlKYAch1ajr"><button><img${add_attribute("src", $userdata.photo, 0)} id="proimg" alt="profile" class="s-GqlKYAch1ajr"></button> ${$tooltipviews.profileview ? `<div id="profilemenu" class="col s-GqlKYAch1ajr"><h1>${escape($userdata.name)}</h1> <button id="optbtns" class="s-GqlKYAch1ajr">${escape($userdata.buttonname)}</button> <button id="optbtns" class="s-GqlKYAch1ajr" data-svelte-h="svelte-9bmlah">Settings</button> <button id="optbtns" class="s-GqlKYAch1ajr" data-svelte-h="svelte-1u0j8nj">About</button></div>` : ``}</div> </header>`;
});
const searchicon = "data:image/webp;base64,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";
const search_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".search-bar.s-isiCAoKLg2Wu{width:clamp(300px, 60vw, 1000px);background-color:var(--iptcolor);border-radius:var(--border-radius);padding:var(--padding);height:10vh;margin:var(--margin);font-size:2vh}input[type='text'].s-isiCAoKLg2Wu{padding:var(--padding);color:var(--ipttextcolor);width:60%}button.s-isiCAoKLg2Wu{width:10%}img.s-isiCAoKLg2Wu{height:5vh}select.s-isiCAoKLg2Wu{width:30%}",
  map: null
};
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_settingsoptions;
  validate_store(settingsoptions, "settingsoptions");
  $$unsubscribe_settingsoptions = subscribe(settingsoptions, (value) => value);
  let searchQuery = "";
  let searchInput;
  let searchProviders = {
    google: "https://www.google.com/search?q=",
    bing: "https://www.bing.com/search?q=",
    duckduckgo: "https://duckduckgo.com/?q=",
    youtube: "https://www.youtube.com/results?search_query=",
    reddit: "https://www.reddit.com/search/?q="
  };
  $$result.css.add(css$4);
  $$unsubscribe_settingsoptions();
  return `<div class="search-bar row s-isiCAoKLg2Wu"><input type="text" placeholder="Search..." class="s-isiCAoKLg2Wu"${add_attribute("value", searchQuery, 0)}${add_attribute("this", searchInput, 0)}> <label for="providerSelect" data-svelte-h="svelte-1ydsc88">Choose a provider:</label> <select id="providerSelect" class="s-isiCAoKLg2Wu">${each(Object.keys(searchProviders), (provider) => {
    return `<option${add_attribute("id", provider, 0)}${add_attribute("value", provider, 0)}>${escape(provider)}</option>`;
  })}</select> <button class="s-isiCAoKLg2Wu"><img${add_attribute("src", searchicon, 0)} alt="search" class="s-isiCAoKLg2Wu"></button> </div>`;
});
const editicon$1 = "data:image/webp;base64,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";
const sitelist_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".sitelist.s-HyRZn6J6DqkO.s-HyRZn6J6DqkO{width:var( --sitelistwidth);display:grid;grid-template-columns:repeat(auto-fill, minmax(calc(var(--sitewidth)*1.2), 1fr));height:60vh;overflow-y:scroll}.site-item.s-HyRZn6J6DqkO.s-HyRZn6J6DqkO{height:calc(var(--sitewidth)*1.5);border-radius:var(--border-radius);margin:var(--margin)}.site-item.is-active.s-HyRZn6J6DqkO.s-HyRZn6J6DqkO{background-color:#3273dc}.siteicon.s-HyRZn6J6DqkO.s-HyRZn6J6DqkO{border-radius:var(--sitebr);width:var(--sitewidth)}.delbtn.s-HyRZn6J6DqkO.s-HyRZn6J6DqkO,.delbtn.s-HyRZn6J6DqkO img.s-HyRZn6J6DqkO{width:2vw}",
  map: null
};
function geticon(url) {
  const urlsplit = url.split("/");
  const domain = urlsplit[2];
  const iconurl = "https://s2.googleusercontent.com/s2/favicons?domain=" + domain + "&sz=128";
  return iconurl;
}
const Sitelist = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $sitelists, $$unsubscribe_sitelists;
  let $tooltipviews, $$unsubscribe_tooltipviews;
  validate_store(sitelists, "sitelists");
  $$unsubscribe_sitelists = subscribe(sitelists, (value) => $sitelists = value);
  validate_store(tooltipviews, "tooltipviews");
  $$unsubscribe_tooltipviews = subscribe(tooltipviews, (value) => $tooltipviews = value);
  let hovering = -1;
  $$result.css.add(css$3);
  $$unsubscribe_sitelists();
  $$unsubscribe_tooltipviews();
  return `<div class="sitelist s-HyRZn6J6DqkO" role="list">${each($sitelists, (site, index) => {
    return `<div role="listitem" tabindex="-1" aria-dropeffect="move" class="${["site-item col s-HyRZn6J6DqkO", hovering === index ? "is-active" : ""].join(" ").trim()}"${add_attribute("draggable", true, 0)}><div class="sitebtn col" role="button" tabindex="-1"><img class="siteicon s-HyRZn6J6DqkO"${add_attribute("src", geticon(site.url), 0)} alt="icon"> ${escape(site.name)}</div> ${$tooltipviews.editview ? `<button class="delbtn s-HyRZn6J6DqkO"><img${add_attribute("src", editicon$1, 0)} alt="edit" class="s-HyRZn6J6DqkO"> </button>` : ``} </div>`;
  })} </div>`;
});
const settingsicon = "/_app/immutable/assets/sett.6cc06075.webp";
const editicon = "/_app/immutable/assets/editsite.ba63200c.webp";
const addicon = "/_app/immutable/assets/add.616c8436.webp";
const options = "data:image/webp;base64,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";
const siteoptions_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "#footer.s-wwmSi-8P9Zld.s-wwmSi-8P9Zld.s-wwmSi-8P9Zld{height:10vh;width:100%}.tooltip.s-wwmSi-8P9Zld.s-wwmSi-8P9Zld.s-wwmSi-8P9Zld{background-color:var(--tooltipbgcol);border-radius:var(--border-radius);z-index:1;padding:var(--padding)}.tooltip.s-wwmSi-8P9Zld button.s-wwmSi-8P9Zld.s-wwmSi-8P9Zld{border-radius:var(--border-radius);color:#ffffff;padding:var(--padding) }.tooltip.s-wwmSi-8P9Zld button.s-wwmSi-8P9Zld.s-wwmSi-8P9Zld:hover{background-color:rgb(29, 148, 163, 0.5)}.tooltip.s-wwmSi-8P9Zld button.s-wwmSi-8P9Zld img.s-wwmSi-8P9Zld{width:var(--sitewidth)}#optionsbtn.s-wwmSi-8P9Zld.s-wwmSi-8P9Zld.s-wwmSi-8P9Zld{position:absolute;bottom:1vh;right:1vh;opacity:30%}#optionsbtn.s-wwmSi-8P9Zld.s-wwmSi-8P9Zld.s-wwmSi-8P9Zld:hover{opacity:100%}#optionsbtn.s-wwmSi-8P9Zld img.s-wwmSi-8P9Zld.s-wwmSi-8P9Zld{width:var(--sitewidth)}",
  map: null
};
const Siteoptions = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $tooltipviews, $$unsubscribe_tooltipviews;
  let $$unsubscribe_animation_duration;
  validate_store(tooltipviews, "tooltipviews");
  $$unsubscribe_tooltipviews = subscribe(tooltipviews, (value) => $tooltipviews = value);
  validate_store(animation_duration, "animation_duration");
  $$unsubscribe_animation_duration = subscribe(animation_duration, (value) => value);
  $$result.css.add(css$2);
  $$unsubscribe_tooltipviews();
  $$unsubscribe_animation_duration();
  return `<button id="optionsbtn" class="s-wwmSi-8P9Zld"><img${add_attribute("src", options, 0)} alt="options" class="s-wwmSi-8P9Zld"></button> <div id="footer" class="row s-wwmSi-8P9Zld">${$tooltipviews.actionview ? `<div class="tooltip row s-wwmSi-8P9Zld"><button class="s-wwmSi-8P9Zld"><img${add_attribute("src", editicon, 0)} alt="edit" class="s-wwmSi-8P9Zld"></button> <button class="s-wwmSi-8P9Zld"><img${add_attribute("src", addicon, 0)} alt="add new" class="s-wwmSi-8P9Zld"></button> <button class="s-wwmSi-8P9Zld"><img${add_attribute("src", settingsicon, 0)} alt="settings" class="s-wwmSi-8P9Zld"></button></div>` : ``} </div>`;
});
const onNavigate = /* @__PURE__ */ client_method("on_navigate");
const addsitetooltip_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".tooltip.s-yEIptl1yzFRz.s-yEIptl1yzFRz{position:absolute;z-index:6;top:40vh;width:clamp(250px, 60vw, 800px);background-color:var(--tooltipbgcol);border-radius:var(--border-radius);padding:var(--padding)}.tooltip.s-yEIptl1yzFRz input.s-yEIptl1yzFRz{width:80%}.tooltip.s-yEIptl1yzFRz button.s-yEIptl1yzFRz{background-color:var(--primary);border-radius:var(--border-radius);padding:18px;color:#ffffff;font-size:1.5rem;width:clamp(100px, 20vw, 200px);margin:var(--margin)}",
  map: null
};
const Addsitetooltip = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_sitelists;
  let $tooltipviews, $$unsubscribe_tooltipviews;
  let $$unsubscribe_animation_duration;
  validate_store(sitelists, "sitelists");
  $$unsubscribe_sitelists = subscribe(sitelists, (value) => value);
  validate_store(tooltipviews, "tooltipviews");
  $$unsubscribe_tooltipviews = subscribe(tooltipviews, (value) => $tooltipviews = value);
  validate_store(animation_duration, "animation_duration");
  $$unsubscribe_animation_duration = subscribe(animation_duration, (value) => value);
  let siteName = "";
  let siteUrl = "";
  $$result.css.add(css$1);
  $$unsubscribe_sitelists();
  $$unsubscribe_tooltipviews();
  $$unsubscribe_animation_duration();
  return `${$tooltipviews.addsiteview ? `<div class="tooltip col s-yEIptl1yzFRz"><input type="text" placeholder="Site Name" class="s-yEIptl1yzFRz"${add_attribute("value", siteName, 0)}> <input type="text" placeholder="Site URL" class="s-yEIptl1yzFRz"${add_attribute("value", siteUrl, 0)}> <div class="btns row"><button class="s-yEIptl1yzFRz" data-svelte-h="svelte-qt21o4">Cancel</button> <button class="s-yEIptl1yzFRz" data-svelte-h="svelte-ej83t9">Add</button></div></div>` : ``}`;
});
const settings_svelte_svelte_type_style_lang = "";
const css = {
  code: ".tooltip.s-BMfTvpc1qHPU.s-BMfTvpc1qHPU{position:absolute;z-index:5;top:15vh;width:clamp(250px, 60vw, 800px);height:60vh;overflow-y:scroll;justify-content:flex-start;background-color:var(--tooltipbgcol);border-radius:var(--border-radius);padding:var(--padding)}.settingsmenu.s-BMfTvpc1qHPU.s-BMfTvpc1qHPU{width:100%;height:100%;justify-content:flex-start;margin:var(--margin)}.tooltip.s-BMfTvpc1qHPU h1.s-BMfTvpc1qHPU{font-size:5rem;color:var(--primary)}.settingslabel.s-BMfTvpc1qHPU.s-BMfTvpc1qHPU{width:40%}.settingsitem.s-BMfTvpc1qHPU.s-BMfTvpc1qHPU{justify-content:space-between;width:90%;margin:var(--margin);padding:var(--padding);background-color:rgb(29, 24, 29);border-radius:var(--border-radius);font-size:larger}.setval.s-BMfTvpc1qHPU.s-BMfTvpc1qHPU{width:20%;text-align:right}input[type='color'].s-BMfTvpc1qHPU.s-BMfTvpc1qHPU{width:50px;height:50px;padding:0;margin:0;border-radius:0}",
  map: null
};
const Settings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $tooltipviews, $$unsubscribe_tooltipviews;
  let $animation_duration, $$unsubscribe_animation_duration;
  let $settingsoptions, $$unsubscribe_settingsoptions;
  let $$unsubscribe_fontfam;
  let $fontopt, $$unsubscribe_fontopt;
  let $cssvars, $$unsubscribe_cssvars;
  validate_store(tooltipviews, "tooltipviews");
  $$unsubscribe_tooltipviews = subscribe(tooltipviews, (value) => $tooltipviews = value);
  validate_store(animation_duration, "animation_duration");
  $$unsubscribe_animation_duration = subscribe(animation_duration, (value) => $animation_duration = value);
  validate_store(settingsoptions, "settingsoptions");
  $$unsubscribe_settingsoptions = subscribe(settingsoptions, (value) => $settingsoptions = value);
  validate_store(fontfam, "fontfam");
  $$unsubscribe_fontfam = subscribe(fontfam, (value) => value);
  validate_store(fontopt, "fontopt");
  $$unsubscribe_fontopt = subscribe(fontopt, (value) => $fontopt = value);
  validate_store(cssvars, "cssvars");
  $$unsubscribe_cssvars = subscribe(cssvars, (value) => $cssvars = value);
  let tooltipElement;
  $$result.css.add(css);
  $$unsubscribe_tooltipviews();
  $$unsubscribe_animation_duration();
  $$unsubscribe_settingsoptions();
  $$unsubscribe_fontfam();
  $$unsubscribe_fontopt();
  $$unsubscribe_cssvars();
  return `${$tooltipviews.settingsview ? `<div class="tooltip col s-BMfTvpc1qHPU"${add_attribute("this", tooltipElement, 0)}><div class="settingsmenu col s-BMfTvpc1qHPU"><h1 class="s-BMfTvpc1qHPU" data-svelte-h="svelte-171lafx">Settings</h1> ${each($settingsoptions, (settingsoption) => {
    return `<div class="row settingsitem s-BMfTvpc1qHPU"><label class="settingslabel s-BMfTvpc1qHPU"${add_attribute("for", settingsoption.name, 0)}>${escape(settingsoption.text)}</label> <input type="checkbox"${add_attribute("id", settingsoption.name, 0)}${add_attribute("checked", settingsoption.value, 1)}> </div>`;
  })} <div class="row settingsitem s-BMfTvpc1qHPU"><label class="settingslabel s-BMfTvpc1qHPU" for="fontfam" data-svelte-h="svelte-1twcv3a">Font</label> <select id="fontfam">${each($fontopt, (font) => {
    return `<option${add_attribute("value", font, 0)}>${escape(font)}</option>`;
  })}</select></div> <div class="row settingsitem s-BMfTvpc1qHPU"><label class="settingslabel s-BMfTvpc1qHPU" for="animation_duration" data-svelte-h="svelte-8oizft">Animation Duration</label> <input type="range" id="animation_duration" min="0" max="1000" step="10"${add_attribute("value", $animation_duration, 0)}> <span class="setval s-BMfTvpc1qHPU">${escape($animation_duration)}ms</span></div> ${each($cssvars, (settinsitem) => {
    return `<div class="row settingsitem s-BMfTvpc1qHPU"><label class="settingslabel s-BMfTvpc1qHPU"${add_attribute("for", settinsitem.name, 0)}>${escape(settinsitem.tag)}</label> ${settinsitem.unit === "color" ? `<input type="color"${add_attribute("id", settinsitem.name, 0)} class="s-BMfTvpc1qHPU"${add_attribute("value", settinsitem.value, 0)}>` : `<input type="range"${add_attribute("id", settinsitem.name, 0)}${add_attribute("min", settinsitem.min, 0)}${add_attribute("max", settinsitem.max, 0)}${add_attribute("step", settinsitem.steps, 0)}${add_attribute("value", settinsitem.value, 0)}>`} <span class="setval s-BMfTvpc1qHPU">${escape(settinsitem.value)}</span> </div>`;
  })}</div></div>` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $settingsoptions, $$unsubscribe_settingsoptions;
  validate_store(settingsoptions, "settingsoptions");
  $$unsubscribe_settingsoptions = subscribe(settingsoptions, (value) => $settingsoptions = value);
  onNavigate((navigation) => {
    if (!document.startViewTransition)
      return;
    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
  $$unsubscribe_settingsoptions();
  return `${validate_component(Topbar, "Topbar").$$render($$result, {}, {}, {})} ${validate_component(Search, "Search").$$render($$result, {}, {}, {})} ${$settingsoptions.find((settingsoption) => settingsoption.name === "show_favsites")?.value ? `${validate_component(Sitelist, "Sitelist").$$render($$result, {}, {}, {})}` : ``} ${validate_component(Siteoptions, "Siteoptions").$$render($$result, {}, {}, {})} ${validate_component(Addsitetooltip, "Addsitetooltip").$$render($$result, {}, {}, {})} ${validate_component(Settings, "Settings").$$render($$result, {}, {}, {})} ${validate_component(About, "About").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
