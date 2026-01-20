import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } 
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCO2J7qVDRShUH0uidtcQhpznSMtJ6zllk",
  authDomain: "acm-task-manager.firebaseapp.com",
  projectId: "acm-task-manager",
  storageBucket: "acm-task-manager.firebasestorage.app",
  messagingSenderId: "236947389550",
  appId: "1:236947389550:web:98e731d23edb107a0b7a7f"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

window.googleLogin = function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Logged in:", user.email);
      alert(`Welcome ${user.displayName}`);
    })
    .catch((error) => {
      console.error(error);
    });
};
