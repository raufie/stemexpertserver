// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.firebaseapikey,
    authDomain: "stemexpert-aeb78.firebaseapp.com",
    projectId: "stemexpert-aeb78",
    storageBucket: "stemexpert-aeb78.appspot.com",
    messagingSenderId: "659146612559",
    appId: "1:659146612559:web:2375d379a07c99c4d82f3a",
    measurementId: "G-NNFF4VVYZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
export default storage