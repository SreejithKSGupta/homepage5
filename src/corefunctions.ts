
import { cssvars, settingsoptions, sitelists, tooltipviews, fontfam, animation_duration, wallpaperurl, focusbar,  searchengine } from './dbase';
import { auth, db } from './firebase.js';
import { set, ref } from '@firebase/database';

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

tooltipviews.subscribe((values) => {
    setTimeout(() => {
        if (values.addsiteview == true) {
            focusbar.set('sitenameipt');
        }
        else if (values.editview == true) {
            console.log('editview is visisble'); // not set
            if (typeof window !== 'undefined') {
                let firstchild = document.getElementById('sitelist')!.firstElementChild as HTMLElement;
                firstchild.focus();
            }
        }
        else if (values.settingsview == true) {
            focusbar.set('wallpaper_upload');
        }
        else if (values.profileview == true) {
            focusbar.set('showsettiggg');
        }
        else if (values.aboutview == true) {
            console.log('aboutview is visisble'); // not completely set
            focusbar.set('aboutheading');
        }
        else if (values.actionview == true) {
            focusbar.set('removesites_btn');
        }
        else {
            focusbar.set('searchbar');
        }

    }, 100);

});

searchengine.subscribe(newsearchengine => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem('searchengine', JSON.stringify(newsearchengine));
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

if (typeof window !== 'undefined') {
    focusbar.subscribe((values) => {
        setTimeout(() => {
            let element = document.getElementById(values);
            if (element) {
                element.focus();
            }
        }
            , 50);
    }
    );


    window.addEventListener('keydown', (event) => {

        if (event.key === 'Escape') {
            closeAllViews();
            return;
        }

        if (event.altKey && event.key) {
            shortcutkeys(event);
            opensite(event);
        }
    });
}

function shortcutkeys(event: KeyboardEvent) {

    if (event.altKey) {
        switch (event.key.toLowerCase()) {
            case 'a': showHide('addsiteview');
                break;
            case 'c': showHide('editview');
                break;
            case 's': showHide('settingsview');
                break;
            case 'p': showHide('profileview');
                break;
            case 'h': showHide('aboutview');
                break;
            case 'm': showHide('actionview');
                break;
            default: break;
        }
    }
}

function opensite(event: KeyboardEvent) { // if press a number and alt key, open the site    
    if (event.altKey && !isNaN(Number(event.key))) {
        let index = Number(event.key) - 1;
        sitelists.subscribe(values => {
            if (index < values.length) {
                window.open(values[index].url, '_blank');
            }
        });
    }
}
