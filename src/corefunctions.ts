import { cssvars,settingsoptions, sitelists, tooltipviews, fontfam, animation_duration, wallpaperurl } from './dbase';
import { auth, db } from './firebase.js';
import { set, ref,get } from '@firebase/database';

interface TooltipViews {
    actionview: boolean;
    addsiteview: boolean;
    editview: boolean;
    settingsview: boolean;
    profileview: boolean;
    aboutview: boolean;
}

cssvars.subscribe(newcssvars => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem('cssvars', JSON.stringify(newcssvars));
        newcssvars.forEach((element: { unit: string; name: string; value: string | null; }) => {
            if (document.documentElement != undefined) {
                if (element.unit == 'color')
                    document.documentElement.style.setProperty(element.name, element.value);
                    
                else
                    document.documentElement.style.setProperty(element.name, element.value + element.unit);
            }
        });
    }
});

fontfam.subscribe(newfontfam => {
    if (typeof window !== 'undefined') {
        document.documentElement.style.setProperty('--font', newfontfam);
        window.localStorage.setItem('fontfam', JSON.stringify(newfontfam));
    }
});

sitelists.subscribe(newsiteslist => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('sitelists', JSON.stringify(newsiteslist));
    }
    if (auth.currentUser) {
        set(ref(db, `users/${auth.currentUser.uid}/sites/`), newsiteslist);
    }
});

animation_duration.subscribe(newanimation_duration => {
    if (typeof window !== 'undefined') {
        document.documentElement.style.setProperty('--animdur_dur', newanimation_duration + 'ms');
        window.localStorage.setItem('animation_duration', JSON.stringify(newanimation_duration));
    }
});

settingsoptions.subscribe(newsettingsoptions => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem('settingsoptions', JSON.stringify(newsettingsoptions));
    }
});

wallpaperurl.subscribe(newwallpaperurl => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem('wallpaper', JSON.stringify(newwallpaperurl));
    }
    if (auth.currentUser) {
        set(ref(db, `users/${auth.currentUser.uid}/wallpaper/`), newwallpaperurl);
    }
});

export function showHide(option: string) {
    tooltipviews.update((values: TooltipViews) => {
        for (let key in values) {
            if (key === option) {
                values[key as keyof TooltipViews] = !values[key as keyof TooltipViews];
            } else {
                values[key as keyof TooltipViews] = false;
            }
        }
        return values;
    });
}

export function closeAllViews() {
    tooltipviews.update(values => {
        for (let key in values) {
            values[key as keyof TooltipViews] = false;
        }
        return values;
    });
}

function addkeyboardshortcuts() {
    if (typeof window !== 'undefined') {
        window.addEventListener('keydown', (event) => {
    
            if (event.key === 'Escape') {
                closeAllViews();
            }
            if (event.key === ('a' || 'A') && event.altKey) {
                showHide('addsiteview');
            }
            if (event.key === ('c' || 'C') && event.altKey) {
                showHide('editview');
            }
            if (event.key === ('s' || 'S') && event.altKey) {
                showHide('settingsview');
            }
            if (event.key === ('p'|| 'P') && event.altKey) {
                showHide('profileview');
            }
            if (event.key === ('h' || 'H') && event.altKey) {
                showHide('aboutview');
            }
            if (event.key === ('m' || 'M')  && event.altKey) {
                showHide('actionview');
            }
            // if press a number and alt key, open the site
            if (event.altKey && !isNaN(Number(event.key))) {
                let index = Number(event.key) - 1;
                sitelists.subscribe(values => {
                    if (index < values.length) {
                        window.open(values[index].url, '_blank');
                    }
                });
            }
          // if just a letter is pressed, focus on the search bar and no view is open
            if (event.key.length === 1 && !event.altKey) {
                tooltipviews.subscribe(values => {
                    for (let key in values) {
                        if (values[key as keyof TooltipViews]) {
                            return;
                        }
                    }
                    document.getElementById('searchbar')?.focus();
                });
               
            }
        });
    }
}

addkeyboardshortcuts();