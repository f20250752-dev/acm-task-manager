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
const taskCounters = document.getElementById("taskCounters");


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

  // ---- Counters ----
  const total = tasks.length;
  const doneCount = tasks.filter(t => t.status === "done").length;
  const pendingCount = total - doneCount;

  // Hide pending counter for Developer if 0
  if (taskCounters) {
    if (role === "Developer" && pendingCount === 0) {
      taskCounters.innerHTML = `<span>Done: ${doneCount}</span>`;
    } else {
      taskCounters.innerHTML = `
        <span>Pending: ${pendingCount}</span>
        |
        <span>Done: ${doneCount}</span>
      `;
    }
  }

  // ---- Progress Bar ----
  const progress = total === 0 ? 0 : Math.round((doneCount / total) * 100);
  const bar = document.getElementById("progressBar");
  if (bar) {
    bar.style.width = `${progress}%`;
  }

  // ---- No tasks ----
  if (tasks.length === 0) {
    tasksContainer.innerHTML = "<p>No tasks assigned.</p>";
    if (taskCounters) taskCounters.textContent = "No tasks yet";
    return;
  }

  // ---- Render each task ----
  tasks.forEach(task => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";

    const title = document.createElement("p");
    title.textContent = task.title;

    const badge = document.createElement("span");
    badge.classList.add("status-badge");

    if (task.status === "done") {
      title.classList.add("completed");
      badge.textContent = "Done";
      badge.classList.add("done");   // 🟢 GREEN
    } else {
      badge.textContent = "Pending";
      badge.classList.add("pending"); // 🟡 YELLOW
    }

    const titleWrapper = document.createElement("div");
    titleWrapper.style.display = "flex";
    titleWrapper.style.alignItems = "center";
    titleWrapper.style.gap = "10px";

    titleWrapper.appendChild(title);
    titleWrapper.appendChild(badge);
    taskDiv.appendChild(titleWrapper);

    // Developer action
    if (role === "Developer" && task.status !== "done") {
      const doneBtn = document.createElement("button");
      doneBtn.textContent = "Mark as Done";
      doneBtn.onclick = () => {
        task.status = "done";
        saveTasks(tasks);
        renderTasks("Developer");
      };
      taskDiv.appendChild(doneBtn);
    }

    // Lead action
    if (role === "Lead") {
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => {
        saveTasks(tasks.filter(t => t.id !== task.id));
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
continueBtn.addEventListener("click", () => {
  const role = roleSelect.value;

  loginDiv.style.display = "none";
  roleSection.style.display = "none";
  dashboardDiv.style.display = "block";
  tasksDiv.style.display = "block";

  if (assignTaskBtn) {
    assignTaskBtn.style.display = role === "Developer" ? "none" : "block";
  }

  renderTasks(role);
});


// ===============================
// ASSIGN TASK (LEAD)
// ===============================
if (assignTaskBtn) {
  assignTaskBtn.addEventListener("click", () => {
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
logoutBtn.addEventListener("click", () => {
  if (window.firebaseLogout) window.firebaseLogout();

  dashboardDiv.style.display = "none";
  tasksDiv.style.display = "none";
  loginDiv.style.display = "block";
  roleSection.style.display = "none";

  const googleBtn = document.querySelector(".google-btn");
  if (googleBtn) {
    googleBtn.style.display = "flex";
    googleBtn.disabled = false;
  }

  const badge = document.getElementById("userBadge");
  if (badge) badge.textContent = "";
});


// ===============================
// RESET (TEST MODE)
// ===============================
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    if (confirm("Reset all tasks?")) {
      localStorage.removeItem("tasks");
      location.reload();
    }
  });
}
