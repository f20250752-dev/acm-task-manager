// --------- SECTION REFERENCES ---------

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

googleLoginBtn.addEventListener("click", function () {

  // Log Google login action
  console.log("Google login successful (simulated)");

  // Hide Google login button
  googleLoginBtn.style.display = "none";

  // Show role selection section
  roleSection.style.display = "block";
});


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

