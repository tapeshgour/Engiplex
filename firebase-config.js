// firebase-config.js (Engiplex Web App Configuration)
// ----------------------------------------------------
// This file connects your Engiplex website to Firebase Realtime Database
// using Firebase SDK v12.5.0 (CDN version).

// Import the Firebase SDK modules you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

// ✅ Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjQ0sYW7w8sXJJsRxag8t1bIzxQytwEjc",
    authDomain: "engiplex-web.firebaseapp.com",
    databaseURL: "https://engiplex-web-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "engiplex-web",
    storageBucket: "engiplex-web.firebasestorage.app",
    messagingSenderId: "426410116767",
    appId: "1:426410116767:web:e452d955613eee2bbbc4aa",
    measurementId: "G-X72WK6C1ED"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ✅ Make Firebase globally accessible (so career.js & Enquiry.js can use it)
window.db = db;
window.ref = ref;
window.push = push;
window.set = set;

console.log("✅ Firebase Initialized Successfully");
