//// ===============================
// DOM REFERENCES
// ===============================
const loginDiv = document.getElementById("login");
const dashboardDiv = document.getElementById("dashboard");
const tasksDiv = document.getElementById("tasks");

const roleSection = document.getElementById("roleSection");
const roleSelect = document.getElementById("roleSelect");
const continueBtn = document.getElementById("continueBtn");

const assignTaskBtn = document.getElementById("assignTaskBtn");
const logoutBtn = document.getElementById("logoutBtn");
const resetBtn = document.getElementById("resetBtn");

const tasksContainer = document.getElementById("tasksContainer");

// ===============================
// TASK STORAGE HELPERS
// ===============================
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===============================
// RENDER TASKS
// ===============================
function renderTasks(role) {
  const tasks = getTasks();
  tasksContainer.innerHTML = "";

  if (tasks.length === 0) {
    tasksContainer.innerHTML = "<p>No tasks assigned.</p>";
    return;
  }

  tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";

    const title = document.createElement("p");
    title.textContent = task.title;

    if (task.status === "done") {
      title.classList.add("completed");
    }

    taskDiv.appendChild(title);

    // Developer: mark as done
    if (role === "Developer" && task.status !== "done") {
      const doneBtn = document.createElement("button");
      doneBtn.textContent = "Mark as Done";

      doneBtn.onclick = function () {
        task.status = "done";
        saveTasks(tasks);
        renderTasks("Developer");
      };

      taskDiv.appendChild(doneBtn);
    }

    // Lead: delete task
    if (role === "Lead") {
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";

      deleteBtn.onclick = function () {
        const updatedTasks = tasks.filter((t) => t.id !== task.id);
        saveTasks(updatedTasks);
        renderTasks("Lead");
      };

      taskDiv.appendChild(deleteBtn);
    }

    tasksContainer.appendChild(taskDiv);
  });
}

// ===============================
// ROLE SELECTION
// ===============================
continueBtn.addEventListener("click", function () {
  const role = roleSelect.value;
  console.log("User role selected:", role);

  loginDiv.style.display = "none";
  roleSection.style.display = "none";
  dashboardDiv.style.display = "block";
  tasksDiv.style.display = "block";

  if (assignTaskBtn) {
    assignTaskBtn.style.display =
      role === "Developer" ? "none" : "block";
  }

  renderTasks(role);
});

// ===============================
// ASSIGN TASK (LEAD ONLY)
// ===============================
if (assignTaskBtn) {
  assignTaskBtn.addEventListener("click", function () {
    const taskTitle = prompt("Enter task name:");
    if (!taskTitle) return;

    const tasks = getTasks();
    tasks.push({
      id: Date.now(),
      title: taskTitle,
      status: "pending",
    });

    saveTasks(tasks);
    renderTasks("Lead");
  });
}

// ===============================
// LOGOUT
// ===============================
logoutBtn.addEventListener("click", function () {
  if (window.firebaseLogout) {
    window.firebaseLogout();
  }

  dashboardDiv.style.display = "none";
  tasksDiv.style.display = "none";
  loginDiv.style.display = "block";
});

// ===============================
// RESET (TESTING MODE)
// ===============================
if (resetBtn) {
  resetBtn.addEventListener("click", function () {
    if (confirm("Reset all tasks?")) {
      localStorage.removeItem("tasks");
      location.reload();
    }
  });
}

