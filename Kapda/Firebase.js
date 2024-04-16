// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCqNmX5QtktCBQbzSG6om36Re3uipyHXDs",
    authDomain: "kapdabank-5b383.firebaseapp.com",
    projectId: "kapdabank-5b383",
    storageBucket: "kapdabank-5b383.appspot.com",
    messagingSenderId: "394702408006",
    appId: "1:394702408006:web:b0584bc64d842de3b53d47",
    measurementId: "G-2QVHC5TQDL"
};

// Initialize Firebase
export const firebaseapp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseapp);