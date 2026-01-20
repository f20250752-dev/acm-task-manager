// --------- SECTION REFERENCES ---------
const loginDiv = document.getElementById("login");
const dashboardDiv = document.getElementById("dashboard");
const tasksDiv = document.getElementById("tasks");

// Role selection
const roleSelect = document.getElementById("roleSelect");
const roleSection = document.getElementById("roleSection");
const continueBtn = document.getElementById("continueBtn");

// Buttons
const assignTaskBtn = document.getElementById("assignTaskBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Task buttons
const doneButtons = document.querySelectorAll(".doneBtn");

// --------- ROLE SELECTION ---------
continueBtn.addEventListener("click", function () {
  const role = roleSelect.value;
  console.log("User role selected:", role);

  loginDiv.style.display = "none";
  roleSection.style.display = "none";
  dashboardDiv.style.display = "block";
  tasksDiv.style.display = "block";

  // RBAC
  if (assignTaskBtn) {
    assignTaskBtn.style.display =
      role === "Developer" ? "none" : "block";
  }
});

// --------- LOGOUT ---------
logoutBtn.addEventListener("click", function () {
  dashboardDiv.style.display = "none";
  tasksDiv.style.display = "none";
  loginDiv.style.display = "block";

  // Reset tasks
  doneButtons.forEach((btn) => {
    const taskText = btn.previousElementSibling;
    taskText.classList.remove("completed");
    btn.textContent = "Mark as Done";
    btn.disabled = false;
  });
});

// --------- TASK COMPLETION ---------
doneButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const taskText = btn.previousElementSibling;
    taskText.classList.add("completed");
    btn.textContent = "Completed";
    btn.disabled = true;

    alert("Notification: Task marked as completed");
  });
});

