import {initializeApp } from 'firebase/app';
import {getAuth 
    , signInWithRedirect 
    , signInWithPopup
    ,GoogleAuthProvider
}from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDXWrTWnAluuwA7LzmI9fq-JAquvZLIJuM",
    // firebase key is not secrete
    authDomain: "crwn-clothing-db-e7c71.firebaseapp.com",
    projectId: "crwn-clothing-db-e7c71",
    storageBucket: "crwn-clothing-db-e7c71.appspot.com",
    messagingSenderId: "750871425334",
    appId: "1:750871425334:web:d3e2e82133e075f21c4397"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp (firebaseConfig);

  const provider =new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt:"select_account"
  })

  export const auth =getAuth();
  //only one authorized if you're authorized it's enogh
  export const signInWithGooglePopup=()=>signInWithPopup(auth,provider)
  //different providers