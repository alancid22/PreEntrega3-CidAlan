document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTaskButton");
  const taskList = document.getElementById("taskList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function updateTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.textContent = task.task;
      li.classList.add("task-item");

      const completeButton = document.createElement("button");
      completeButton.textContent = task.completed ? "Desmarcar" : "Completar";
      completeButton.classList.add("complete-button");

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.classList.add("delete-button");

      li.appendChild(completeButton);
      li.appendChild(deleteButton);
      taskList.appendChild(li);

      li.addEventListener("click", () => {
        li.classList.toggle("completed");
        task.completed = !task.completed;
        completeButton.textContent = task.completed ? "Desmarcar" : "Completar";
        saveTasksToLocalStorage();
      });

      completeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        li.classList.toggle("completed");
        task.completed = !task.completed;
        completeButton.textContent = task.completed ? "Desmarcar" : "Completar";
        saveTasksToLocalStorage();
      });

      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        tasks.splice(index, 1);
        updateTasks();
        saveTasksToLocalStorage();
      });

      if (task.completed) {
        li.classList.add("completed");
      }
    });
  }

  function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  addTaskButton.addEventListener("click", () => {
    const newTask = taskInput.value;
    if (newTask.trim() !== "") {
      tasks.push({ task: newTask, completed: false });
      taskInput.value = "";
      updateTasks();
      saveTasksToLocalStorage();
    }
  });

  updateTasks();
});
