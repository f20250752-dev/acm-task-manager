// --------- SECTION REFERENCES ---------
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCO2J7qVDRShUH0uidtcQhpznSMtJ6zllk",
  authDomain: "acm-task-manager.firebaseapp.com",
  projectId: "acm-task-manager",
  storageBucket: "acm-task-manager.firebasestorage.app",
  messagingSenderId: "236947389550",
  appId: "1:236947389550:web:98e731d23edb107a0b7a7f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase Auth reference
const auth = firebase.auth();

// Main page sections
const loginDiv = document.getElementById("login");
const dashboardDiv = document.getElementById("dashboard");
const tasksDiv = document.getElementById("tasks");

// Buttons
const googleLoginBtn = document.getElementById("googleLoginBtn");
const continueBtn = document.getElementById("continueBtn");

// Role selection
const roleSelect = document.getElementById("roleSelect");
const roleSection = document.getElementById("roleSection");

// Assign Task button (RBAC)
const assignTaskBtn = document.getElementById("assignTaskBtn");


// --------- PHASE 1: SIMULATED GOOGLE LOGIN ---------

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;

      console.log("Logged in user:", user.email);

      alert(`Welcome ${user.displayName}`);

      // Show role selection page
      document.getElementById("login").style.display = "none";
      document.getElementById("roleSelection").style.display = "block";
    })
    .catch((error) => {
      console.error("Login error:", error);
    });
}



// --------- PHASE 2: ROLE SELECTION & CONTINUE ---------

continueBtn.addEventListener("click", function () {

  // Read selected role
  const role = roleSelect.value;

  // Log selected role
  console.log("User role selected:", role);

  // Hide login screen
  loginDiv.style.display = "none";

  // Show dashboard and tasks
  dashboardDiv.style.display = "block";
  tasksDiv.style.display = "block";

  // --------- ROLE BASED ACCESS CONTROL ---------
  if (role === "Developer") {
    // Developers cannot assign tasks
    assignTaskBtn.style.display = "none";
  } else {
    // Admins and Leads can assign tasks
    assignTaskBtn.style.display = "block";
  }
});

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function () {

  console.log("User logged out");

  // Hide app sections
  dashboardDiv.style.display = "none";
  tasksDiv.style.display = "none";
  loginDiv.style.display = "block";

  // Reset login UI
  googleLoginBtn.style.display = "block";
  roleSection.style.display = "none";

  // -------- RESET TASK STATE --------
  doneButtons.forEach(function (btn) {
    const taskText = btn.previousElementSibling;

    taskText.classList.remove("completed");
    btn.textContent = "Mark as Done";
    btn.disabled = false;
  });
});


// --------- TASK COMPLETION LOGIC (PUT THIS LAST) ---------
const doneButtons = document.querySelectorAll(".doneBtn");

doneButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {

    const taskText = btn.previousElementSibling;

    taskText.classList.add("completed");
    btn.textContent = "Completed";
    btn.disabled = true;

    // Logging
    console.log("Task marked as completed");

    // Simulated notification
    alert("Notification: Task marked as completed");
    console.log("Notification event triggered");
  });
});

