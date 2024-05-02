import { TaskList } from "./tasklist.js";
import { TaskModal } from "./taskmodal.js";

// Instanciando a lista de tarefas
const taskList = new TaskList();
function loadTaskListFromLocalStorage() {
  const savedTasks = JSON.parse(localStorage.getItem("taskList"));
  if (savedTasks) {
    savedTasks.forEach((taskData) => {
      const task = new Task(taskData.name, taskData.notes);
      taskList.addTask(task);
    });
  }
}

// Chamar a função para carregar os dados da LocalStorage
loadTaskListFromLocalStorage();
// Função para abrir o modal de criação de tarefa
function openCreateTaskModal() {
  const taskModal = new TaskModal();
  taskModal.openAddModal();
}

// Função para abrir o modal de edição de tarefa
function openEditTaskModal(taskId) {
  const task = taskList.findTaskById(taskId);
  if (task) {
    const taskModal = new TaskModal();
    taskModal.openEditModal(task);

    taskModal.onSave((name, notes) => {
      task.update(name, notes);
      taskModal.closeModal();
      updateTaskTable();
    });
  }
}

// Função para atualizar a tabela de tarefas
function updateTaskTable() {
  const taskTableBody = document.querySelector(".taskList");
  taskTableBody.innerHTML = "";

  taskList.tasks.forEach((task) => {
    const taskRow = document.createElement("tr");
    taskRow.innerHTML = `
      <td>${task.id}</td>
      <td>${task.name}</td>
      <td>${task.notes}</td>
      <td>${task.createDate}</td>
      <td>${task.updateDate ? task.updateDate : "--/--/--"}</td>
      <td>${task.isChecked ? '<i class="fas fa-check"></i>' : ""}</td>
      <td>
        <button class="btn-edit" onclick="openEditTaskModal(${
          task.id
        })">Edit</button>
        <button class="btn-delete" onclick="deleteTask(${
          task.id
        })">Delete</button>
      </td>
    `;
    taskTableBody.appendChild(taskRow);
  });
}
// Função para excluir uma tarefa
function deleteTask(taskId) {
  taskList.removeTask(taskId);
  updateTaskTable();
}

// Event listener para abrir o modal de criação de tarefa
document
  .getElementById("btn-add")
  .addEventListener("click", openCreateTaskModal);

// Adicionar eventos aos elementos quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  updateTaskTable();

  // Adicionar eventos às checkboxes e aos botões de edição e exclusão
  const taskTableBody = document.querySelector(".taskList");
  taskTableBody.addEventListener("click", (event) => {
    const target = event.target;
    const taskId = parseInt(target.closest("tr").children[1].textContent);
    if (target.classList.contains("btn-edit")) {
      openEditTaskModal(taskId);
    } else if (target.classList.contains("btn-delete")) {
      deleteTask(taskId);
    }
  });
});
