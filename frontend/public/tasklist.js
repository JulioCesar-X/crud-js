import { Task } from "./task.js";

export class TaskList {
  constructor() {
    if (TaskList.instance) {
      return TaskList.instance;
    }
    TaskList.instance = this;
    this.tasks = []; // Array para armazenar as tarefas
  }

  static getInstance() {
    return this.instance || new TaskList();
  }

  // Método para adicionar uma nova tarefa à lista
  addTask(task) {
    this.tasks.push(task);
  }

  // Método para remover uma tarefa da lista
  removeTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  // Método para buscar uma tarefa pelo ID
  findTaskById(taskId) {
    return this.tasks.find((task) => task.id === taskId);
  }

  // Método para atualizar uma tarefa na lista
  updateTask(taskId, newData) {
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...newData };
    }
  }

  // Método para renderizar todas as tarefas na tabela HTML
  renderTasks() {
    const taskListContainer = document.querySelector(".taskList");
    taskListContainer.innerHTML = ""; // Limpa o conteúdo atual da lista

    this.tasks.forEach((task) => {
      const row = task.renderRow();
      taskListContainer.appendChild(row);
    });
  }
}
