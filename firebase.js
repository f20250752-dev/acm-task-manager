// Import Firebase core
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

// Import Firebase Authentication
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
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
  const loginBtn = document.querySelector(".google-btn");
  const loadingText = document.getElementById("loading");

  // Disable button + show loading
  loginBtn.disabled = true;
  loginBtn.style.opacity = "0.6";
  loadingText.style.display = "block";

  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      // Hide loading
      loadingText.style.display = "none";

      // User badge
      const badge = document.getElementById("userBadge");
      if (badge) {
        badge.textContent = `Signed in as ${user.displayName}`;
      }

      // User info
      const userInfo = document.getElementById("userInfo");
      if (userInfo) {
        userInfo.textContent = `Logged in as: ${user.displayName} (${user.email})`;
      }

      // Hide login button completely after success
      loginBtn.style.display = "none";

      // Show role selection
      document.getElementById("roleSection").style.display = "block";
    })
    .catch((error) => {
      console.error("Firebase login error:", error);

      // Re-enable button on failure
      loginBtn.disabled = false;
      loginBtn.style.opacity = "1";
      loadingText.style.display = "none";

      alert("Google login failed. Please try again.");
    });
};



// -------- FIREBASE LOGOUT --------
window.firebaseLogout = function () {
  signOut(auth)
    .then(() => {
      console.log("Firebase user signed out");
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });
};

