import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDSr52mwtEAYRnUIWfy2mESjDtR9qtUD1Y",
    authDomain: "stem-e-tutor-app.firebaseapp.com",
    projectId: "stem-e-tutor-app",
    storageBucket: "stem-e-tutor-app.firebasestorage.app",
    messagingSenderId: "246673595340",
    appId: "1:246673595340:web:735d731a5f34af866b1b69"
};

// eslint-disable-next-line no-unused-vars
export const firebaseApp = initializeApp(firebaseConfig);
