// Import Firebase core
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

// Import Firebase Authentication
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCO2J7qVDRShUH0uidtcQhpznSMtJ6zllk",
  authDomain: "acm-task-manager.firebaseapp.com",
  projectId: "acm-task-manager",
  storageBucket: "acm-task-manager.appspot.com",
  messagingSenderId: "236947389550",
  appId: "1:236947389550:web:98e731d23edb107a0b7a7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Expose Google Login function globally
window.googleLogin = function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      console.log("Logged in user:", user.email);
      alert(`Welcome ${user.displayName}`);

      // Hide Google login button
      document.querySelector(".google-btn").style.display = "none";

      // Show role selection
      document.getElementById("roleSection").style.display = "block";
    })
    .catch((error) => {
      console.error("Firebase login error:", error);
      alert("Google login failed. Please try again.");
    });
};
