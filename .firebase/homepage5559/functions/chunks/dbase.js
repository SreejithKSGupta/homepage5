import { GoogleAuthProvider, getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, set, ref, get } from "firebase/database";
import { w as writable } from "./index.js";
import { initializeApp } from "firebase/app";
const logo = "/_app/immutable/assets/defuser.b13bda04.webp";
const wallpaper = "/_app/immutable/assets/wallw.0d7d0518.webp";
const siteslists = typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem("sitelists") || "[]") : [];
let sitelists = writable(siteslists);
let wallpaperurl = writable(wallpaper);
let tooltipviews = writable({
  actionview: false,
  addsiteview: false,
  editview: false,
  settingsview: false,
  profileview: false,
  aboutview: false
});
let userdata = writable({
  name: "User",
  buttonname: "sign in",
  photo: logo
});
let settingsoptions = writable([
  {
    name: "new_tab",
    text: "Open in new tab",
    value: false,
    tyfe: "checkbox"
  },
  {
    name: "show_favsites",
    text: "Show favorite sites",
    value: true,
    tyfe: "checkbox"
  },
  {
    name: "show_wallpaper",
    text: "Show wallpaper",
    value: true,
    tyfe: "checkbox"
  }
]);
let animation_duration = writable(500);
let fontfam = writable("sans-serif");
let fontopt = writable([
  "Arial",
  "Verdana",
  "Helvetica",
  "Tahoma",
  "Times New Roman",
  "Georgia",
  "Garamond",
  "Courier New",
  "Brush Script MT",
  "Lucida Sans",
  "sans-serif",
  "serif",
  "monospace",
  "cursive"
]);
let cssvars = writable([
  { name: "--bgcol", value: "#16041f", unit: "color", tag: "Background Color", min: 0, max: 0, steps: 0 },
  { name: "--primary", value: "#17dfc4", unit: "color", tag: "Primary Color", min: 0, max: 0, steps: 0 },
  { name: "--secondary", value: "#473a02", unit: "color", tag: "Secondary Color", min: 0, max: 0, steps: 0 },
  { name: "--textcolor", value: "#ffffff", unit: "color", tag: "Text Color", min: 0, max: 0, steps: 0 },
  { name: "--iptcolor", value: "#ffffff", unit: "color", tag: "Input Color", min: 0, max: 0, steps: 0 },
  { name: "--ipttextcolor", value: "#000000", unit: "color", tag: "Input Text Color", min: 0, max: 0, steps: 0 },
  { name: "--tooltipbgcol", value: "#052529", unit: "color", tag: "Tooltip Background Color", min: 0, max: 0, steps: 0 },
  { name: "--font-size", value: "1", unit: "vw", tag: "Font Size", min: 0.8, max: 2, steps: 0.2 },
  { name: "--margin", value: "10", unit: "px", tag: "Margin", min: 0, max: 20, steps: 1 },
  { name: "--padding", value: "10", unit: "px", tag: "Padding", min: 5, max: 20, steps: 1 },
  { name: "--border-radius", value: "20", unit: "px", tag: "Border Radius", min: 0, max: 60, steps: 1 },
  { name: "--sitelistwidth", value: "75", unit: "vw", tag: "Site List Width", min: 10, max: 90, steps: 1 },
  { name: "--sitewidth", value: "6", unit: "vw", tag: "Site Width", min: 3, max: 12, steps: 1 },
  { name: "--sitebr", value: "50", unit: "%", tag: "Site Border Radius", min: 0, max: 50, steps: 1 },
  { name: "--blurr", value: "10", unit: "px", tag: "wallpaper Blur", min: 0, max: 20, steps: 1 }
]);
const firebaseConfig = {
  apiKey: "AIzaSyBbeg0_7gXdkE-2SJfetxwNQvax5ysJYg0",
  authDomain: "homepage5559.firebaseapp.com",
  databaseURL: "https://homepage5559-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "homepage5559",
  storageBucket: "homepage5559.appspot.com",
  messagingSenderId: "586621814860",
  appId: "1:586621814860:web:ec5e829fcad262d4414ce9",
  measurementId: "G-CHN4RJY7C9"
};
const app = initializeApp(firebaseConfig);
new GoogleAuthProvider();
const auth = getAuth(app);
const db = getDatabase(app);
cssvars.subscribe((newcssvars) => {
  if (typeof window !== "undefined") {
    newcssvars.forEach((element) => {
      if (document.documentElement != void 0) {
        if (element.unit == "color")
          document.documentElement.style.setProperty(element.name, element.value);
        else
          document.documentElement.style.setProperty(element.name, element.value + element.unit);
      }
    });
  }
});
sitelists.subscribe((newsiteslist) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("sitelists", JSON.stringify(newsiteslist));
  }
  if (auth.currentUser) {
    set(ref(db, `users/${auth.currentUser.uid}/sites/`), newsiteslist);
  }
});
fontfam.subscribe((newfontfam) => {
  if (typeof window !== "undefined") {
    document.documentElement.style.setProperty("--font", newfontfam);
  }
});
animation_duration.subscribe((newanimation_duration) => {
  if (typeof window !== "undefined") {
    document.documentElement.style.setProperty("--animdur_dur", newanimation_duration + "ms");
  }
});
onAuthStateChanged(auth, (user) => {
  if (user) {
    const { displayName, photoURL, uid } = user;
    userdata.set({
      name: displayName,
      photo: logo,
      buttonname: "sign out"
    });
    const refSites = ref(db, `users/${uid}/sites/`);
    get(refSites).then((snapshot) => {
      const siteList = snapshot.val();
      if (siteList) {
        sitelists.set(siteList);
      }
    });
  } else {
    console.log("Signed out");
    userdata.set({
      name: "User",
      buttonname: "sign in",
      photo: logo
    });
  }
});
export {
  animation_duration as a,
  sitelists as b,
  fontopt as c,
  cssvars as d,
  fontfam as f,
  settingsoptions as s,
  tooltipviews as t,
  userdata as u,
  wallpaperurl as w
};
