const input = document.querySelector(".input");
const addButton = document.querySelector(".add");
const container = document.querySelector(".tasks");

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  renderTasks(tasks);
}

addButton.addEventListener("click", () => {
  if (input.value) {
    addTask(input.value);
  }
});
document.onkeyup = (e) => {
  if (input.value != "" && e.key === "Enter") {
    addTask(input.value);
  }
};

function addTask(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  tasks.push(task);
  updateLocalStorage(tasks);
  renderTasks(tasks);
}

function renderTasks(tasksArray) {
  container.innerHTML = "";
  tasksArray.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    if (task.completed) {
      taskDiv.classList.add("done");
    }
    taskDiv.setAttribute("data-id", task.id);
    taskDiv.textContent = task.title;
    const deleteSpan = document.createElement("span");
    deleteSpan.classList.add("del");
    deleteSpan.textContent = "Delete";
    taskDiv.appendChild(deleteSpan);
    container.appendChild(taskDiv);

    deleteSpan.addEventListener("click", (event) => {
      removeTask(task.id);
      event.target.parentElement.remove();
    });
  });
  input.value = "";
}

container.addEventListener("click", (event) => {
  if (event.target.classList.contains("task")) {
    event.target.classList.toggle("done");
    toggleTaskCompletion(event.target.getAttribute("data-id"));
  }
});

function toggleTaskCompletion(taskId) {
  tasks = tasks.map((task) => {
    if (task.id === Number(taskId)) {
      task.completed = !task.completed;
    }
    return task;
  });
  updateLocalStorage(tasks);
}

function removeTask(taskId) {
  tasks = tasks.filter((task) => task.id !== Number(taskId));
  updateLocalStorage(tasks);
}

function updateLocalStorage(tasksArray) {
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}
