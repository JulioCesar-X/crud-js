import { Task } from "./task.js";
import { TaskList } from "./tasklist.js";

export class TaskModal {
  constructor() {
    this.modalAdd = document.getElementById("modal-task-form-add");
    this.modalEdit = document.getElementById("modal-task-form-edit");
    this.modalShow = document.getElementById("modal-task-form-show");

    // Adicionar eventos para fechar os modais ao clicar no botão de sair ou fora do modal
    this.modalAdd.addEventListener("click", this.closeModal.bind(this));
    this.modalEdit.addEventListener("click", this.closeModal.bind(this));
    this.modalShow.addEventListener("click", this.closeModal.bind(this));

    // Adicionar evento para salvar tarefa ao clicar no botão "Save Task" no modal de adição
    this.modalAdd
      .querySelector("#save-task")
      .addEventListener("click", this.handleSaveTask.bind(this));
  }

  openAddModal() {
    this.modalAdd.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Task</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="add-task-form">
            <div class="mb-3">
              <label for="task-name" class="form-label">Task Name</label>
              <input type="text" class="form-control" id="task-name" required>
            </div>
            <div class="mb-3">
              <label for="task-notes" class="form-label">Notes</label>
              <textarea class="form-control" id="task-notes" rows="3"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" id="save-task">Save Task</button>
        </div>
      </div>
    `;
    // Limpar os campos do formulário antes de abrir o modal
    document.getElementById("task-name").value = "";
    document.getElementById("task-notes").value = "";
    this.modalAdd.classList.add("open");
  }

  handleSaveTask() {
    const name = document.getElementById("task-name").value;
    const notes = document.getElementById("task-notes").value;

    // Emitir um evento personalizado com os dados da tarefa para ser manipulado externamente
    const saveEvent = new CustomEvent("taskModalSave", {
      detail: { name, notes },
    });
    document.dispatchEvent(saveEvent);

    // Fechar o modal após salvar a tarefa
    this.closeModal();
  }

  openEditModal(task) {
    // Lógica para preencher o modal de edição com os dados da tarefa
    this.modalEdit.classList.add("open");
  }

  openShowModal(task) {
    // Lógica para preencher o modal de visualização com os dados da tarefa
    this.modalShow.classList.add("open");
  }

  closeModal() {
    this.modalAdd.classList.remove("open");
    this.modalEdit.classList.remove("open");
    this.modalShow.classList.remove("open");
  }
}