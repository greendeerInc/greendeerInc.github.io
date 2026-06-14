import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA2UdQehzKMVCTw1U4H0KQG5GZkX__H7dg",
    authDomain: "dukeapp-eb636.firebaseapp.com",
    projectId: "dukeapp-eb636",
    storageBucket: "dukeapp-eb636.firebasestorage.app",
    messagingSenderId: "647395504306",
    appId: "1:647395504306:web:ae75eb588ae1350fa859ab",
    measurementId: "G-ZHD9LMF75D"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);