// --------- SECTION REFERENCES ---------
const loginDiv = document.getElementById("login");
const dashboardDiv = document.getElementById("dashboard");
const tasksDiv = document.getElementById("tasks");

const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", function () {
  if (confirm("Reset all tasks?")) {
    localStorage.removeItem("tasks");
    location.reload();
  }
});

// --------- TASK STORAGE (FAKE BACKEND) ---------

// --------- HELPER FUNCTIONS ---------

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(role) {
  const tasks = getTasks();
  const taskContainer = document.getElementById("tasksList");
  taskContainer.innerHTML = "";

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task";

    div.innerHTML = `
      <p class="${task.status === "done" ? "completed" : ""}">
        ${task.title}
      </p>
      ${
        role === "Developer" && task.status !== "done"
          ? `<button onclick="completeTask(${task.id})">Mark as Done</button>`
          : ""
      }
    `;

    taskContainer.appendChild(div);
  });
}

// --------- ASSIGN TASK (LEAD) ---------
assignTaskBtn.addEventListener("click", function () {
  const taskTitle = prompt("Enter task name:");
  if (!taskTitle) return;

  const tasks = getTasks();

  tasks.push({
    id: Date.now(),
    title: taskTitle,
    status: "pending"
  });

  saveTasks(tasks);
  renderTasks("Lead");
});

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

  dashboardDiv.classList.add("fade-in");
tasksDiv.classList.add("fade-in");

  // RBAC
  if (assignTaskBtn) {
    assignTaskBtn.style.display =
      role === "Developer" ? "none" : "block";
  }
  renderTasks(role);

});

// --------- LOGOUT ---------
logoutBtn.addEventListener("click", function () {

  // Sign out from Firebase
  window.firebaseLogout();

  console.log("User logged out");

  // Reset UI
  dashboardDiv.style.display = "none";
  tasksDiv.style.display = "none";
  loginDiv.style.display = "block";

  // Show Google login button again
  document.querySelector(".google-btn").style.display = "flex";

  // Hide role selection
  roleSection.style.display = "none";

  // Reset tasks (local UI only)
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
