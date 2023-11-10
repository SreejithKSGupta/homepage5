import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getDatabase, ref, get, set, } from "firebase/database";
import { initializeApp } from "firebase/app";
import { userdata,sitelists, wallpaperurl } from "./dbase";
import logo from '$lib/res/defuser.svg';

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
  export let provider = new GoogleAuthProvider();
  export let auth = getAuth(app);
  export let db = getDatabase(app);

  export function signinout() {
    if (auth.currentUser) {
      signOut(auth).then(() => {
      }).catch(e => {
        console.log(e)
      })
    } else {
      signInWithPopup(auth, provider).then(res => {
      }).catch(e => {
        console.log(e)
        console.log(e.message)
      })
    }
  }
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { displayName, photoURL, uid } = user;
      userdata.set({
        name: displayName!,
        photo: photoURL!,
        buttonname: 'sign out',
      });
      const refSites = ref(db, `users/${uid}/sites/`);
      get(refSites).then((snapshot) => {
        const siteList = snapshot.val();
        if (siteList) {
          sitelists.set(siteList);
        }
      });
      const wallpaperRef = ref(db, `users/${uid}/wallpaper/`);
      get(wallpaperRef).then((snapshot) => {
        const wallpaper = snapshot.val();
        if (wallpaper) {
          wallpaperurl.set(wallpaper);
        }
      })

    } else {
      console.log("Signed out");
      userdata.set({
        name: 'User',
        buttonname: 'sign in',
        photo: logo,
      });
    }
  });