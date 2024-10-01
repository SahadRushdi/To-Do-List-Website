// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDMP4fkmPOyBo7wXYrT2ARWvij1XvijjC8",
    authDomain: "to-do-list-37b31.firebaseapp.com",
    databaseURL: "https://to-do-list-37b31-default-rtdb.firebaseio.com",
    projectId: "to-do-list-37b31",
    storageBucket: "to-do-list-37b31.appspot.com",
    messagingSenderId: "1065038444077",
    appId: "1:1065038444077:web:9cb150bfc38e8bd4d4aaa4",
    measurementId: "G-EWJJW4L44D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get references to UI elements
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');

// Event listener for sign-up
signupBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("User signed up successfully!");
            window.location.href = "index.html"; // Redirect to main page
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Event listener for log-in
loginBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = "index.html"; // Redirect to main page
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Redirect to the main page if already logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "index.html"; // Redirect to main page
    }
});
