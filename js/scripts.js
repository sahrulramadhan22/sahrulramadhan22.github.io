const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filters button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

const saveTasks = () =>
  localStorage.setItem("tasks", JSON.stringify(tasks));

const renderTasks = () => {
  list.innerHTML = "";

  tasks
    .filter(task => {
      if (currentFilter === "done") return task.done;
      if (currentFilter === "pending") return !task.done;
      return true;
    })
    .forEach(task => {
      const li = document.createElement("li");
      li.textContent = task.text;
      if (task.done) li.classList.add("done");

      li.addEventListener("click", () => toggleTask(task.id));

      const del = document.createElement("button");
      del.textContent = "X";
      del.onclick = e => {
        e.stopPropagation();
        deleteTask(task.id);
      };

      li.appendChild(del);
      list.appendChild(li);
    });
};

const addTask = () => {
  if (!input.value.trim()) return;

  tasks.push({
    id: Date.now(),
    text: input.value,
    done: false
  });

  input.value = "";
  saveTasks();
  renderTasks();
};

const toggleTask = id => {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, done: !task.done } : task
  );
  saveTasks();
  renderTasks();
};

const deleteTask = id => {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
};

// EVENTS
addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

filterButtons.forEach(btn =>
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    renderTasks();
  })
);

// INIT
renderTasks();
