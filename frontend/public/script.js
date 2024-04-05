//para modal

function OpenModalCreate() {
  const modal_add = document.getElementById("modal-task-form-add");
  modal_add.classList.add("open");
  modal_add.addEventListener("click", (e) => {
    if (e.target.id == "exit" || e.target.id == "modal-task-form-add") {
      modal_add.classList.remove("open");
    }
  });
}

// show do crud para linha especifica recebendo
function OpenModalShow(row_selected) {
  const modal_show = document.getElementById("modal-task-form-show");

  const input_name = document.getElementById("showTaskInput");
  const input_description = document.getElementById("description_show");

  modal_show.classList.add("open");

  /* */
  const name = row_selected.querySelector("td:nth-child(3)").textContent;
  input_name.value = name;

  const description = row_selected.querySelector("td:nth-child(4)").textContent;
  input_description.value = description;

  modal_show.addEventListener("click", (e) => {
    if (e.target.id == "exit" || e.target.id == "modal-task-form-show") {
      modal_show.classList.remove("open");
    }
  });
}

//edit do crud para linha especifica
function OpenModalEdit(row_selected) {
  const modal_edit = document.getElementById("modal-task-form-edit");

  const to_input_name_ = document.getElementById("editTaskInput");
  const to_input_description_ = document.getElementById("description_edit");

  /* Chegada dos dados */
  const name = row_selected.querySelector("td:nth-child(3)").textContent;
  to_input_name_.value = name;

  const description = row_selected.querySelector("td:nth-child(4)").textContent;
  to_input_description_.value = description;

  modal_edit.classList.add("open");

  modal_edit.addEventListener("click", (e) => {
    if (e.target.id == "edit-task") {
      const new_name = document.getElementById("editTaskInput").value;
      const new_description = document.getElementById("description_edit").value;

      // Atualização dos valores antigos com os novos valores
      row_selected.querySelector("td:nth-child(3)").textContent = new_name;
      row_selected.querySelector("td:nth-child(4)").textContent =
        new_description;

      // Salvar no armazenamento local
      saveTasksToLocalStorage();

      // Fechar o modal
      modal_edit.classList.remove("open");
    }
  });
  modal_edit.addEventListener("click", (e) => {
    if (e.target.id == "exit" || e.target.id == "modal-task-form-edit") {
      modal_edit.classList.remove("open");
    }
  });
}

//Função que add os eventos aos btns do R-U-D usando o metodo closest para encontrar a row pai deles
function addEventsToBtn(row) {
  const btnShow = row.querySelector(".btn-show");
  const btnEdit = row.querySelector(".btn-edit");
  const btnDelete = row.querySelector(".btn-delete");

  btnShow.addEventListener("click", () => {
    // const btn_selected = btnShow.closest("tr");
    OpenModalShow(row);
  });

  btnEdit.addEventListener("click", () => {
    OpenModalEdit(row);
  });

  btnDelete.addEventListener("click", () => {
    const row_selected = btnDelete.closest("tr");
    row_selected.remove();
    updateIds();
    saveTasksToLocalStorage();
  });
}

// Chamar a função para carregar tarefas do localStorage quando o documento estiver completamente carregado
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

//evento de criar a tarefa
let btn_create = document.getElementById("create-task");
btn_create.addEventListener("click", () => {
  addTask();
});

//Contador com uma função geradora onde sempre dará um valor para o id
function* contador_plus() {
  let count = 0;
  while (true) {
    yield ++count;
  }
}
const id_contador = contador_plus();

//Toda vez que eu apago uma linha eu venho atualizar os ids acrescentando mais 1 ao seu index garantindo que sempre tenha o range correto antes de salvar no storage
function updateIds() {
  const rows = document.querySelectorAll(".taskList tr");
  rows.forEach((row, index) => {
    const id_task = row.querySelector("td:nth-child(2)");
    if (id_task) {
      id_task.textContent = index + 1;
    }
  });
}

//Função para salvar minhas tasks no local storage, criando um objeto task que sera convertido em uma string json para alocação, na criação eu identifico meus elementos na tabela pelos seletores de atributo ordenados pela posicão na familia e seus descendentes
function saveTasksToLocalStorage() {
  const tasks = [];
  const rows = document.querySelectorAll(".taskList tr");
  rows.forEach((row) => {
    const checkbox = row.querySelector("td:nth-child(7) input");
    const task = {
      selected: row.querySelector("td:first-child").textContent,
      id: row.querySelector("td:nth-child(2)").textContent,
      name: row.querySelector("td:nth-child(3)").textContent,
      notes: row.querySelector("td:nth-child(4)").textContent,
      createDate: row.querySelector("td:nth-child(5)").textContent,
      updateDate: row.querySelector("td:nth-child(6)").textContent,
      isChecked: checkbox ? checkbox.checked : false,
      btns: `<td>
                <button class="btn-show">Show</button>
                <button class="btn-edit">Edit</button>
                <button class="btn-delete">Delete</button>
            </td>`,
    };
    tasks.push(task);
  });
  //set para adicionar ou modificar oque lá já está
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Função que me permite carregar strings_json do local storage , tansformar em um objeto que será minha row, add os eventos para checkboxes e buttons aqui construidos
function loadTasksFromLocalStorage() {
  //get é para pegar
  const tasksString = localStorage.getItem("tasks");
  if (tasksString) {
    const tasks = JSON.parse(tasksString);
    tasks.forEach((task) => {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td><input class="check-row" type="checkbox"></td>
            <td>${task.id}</td>
            <td class="name-task">${task.name}</td>
            <td>${task.notes}</td>
            <td>${task.createDate}</td>
            <td>${task.updateDate}</td>
            <td><input class="check-did" type="checkbox" ${
              task.isChecked ? "Checked" : ""
            }></td>
            <td>
                <button class="btn-show btn"><i class="far fa-eye"></i></button>
                <button class="btn-edit btn"><i class="fas fa-pen-square"></i></button>
                <button class="btn-delete btn"><i class="far fa-trash-alt"></i></button>
            </td>
            `;
      document.querySelector(".taskList").appendChild(row);

      addEventsToBtn(row);
      addEventsToCheckboxes();
    });
  }
}

//Função que vai add a todos os checkboxes seus respectivos eventos, tenho dois tipos que separo por classes e eventos diferentes
function addEventsToCheckboxes() {
  const checkboxs_did = document.querySelectorAll(".check-did");
  checkboxs_did.forEach((check_did) => {
    check_did.addEventListener("click", saveTasksToLocalStorage);
  });
  const checkboxes = document.querySelectorAll(".check-row");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const row_selected = checkbox.closest("tr");
      if (checkbox.checked) {
        row_selected.classList.add("table-active");
      } else {
        row_selected.classList.remove("table-active");
      }
    });
  });
}

// Função para adicionar uma tarefa à lista
function createTaskRow(id, name, notes, createDate) {
  let row = document.createElement("tr");
  let check_select = document.createElement("td");
  let id_task = document.createElement("td");
  let name_task = document.createElement("td");
  let to_notes = document.createElement("td");
  let create_date_task = document.createElement("td");
  let update_date_task = document.createElement("td");
  let check_did_task = document.createElement("td");
  let buttons_rud = document.createElement("td");

  let checkboxRow = document.createElement("input");
  checkboxRow.type = "checkbox";
  checkboxRow.classList.add("check-row");
  let checkboxDidRow = document.createElement("input");
  checkboxDidRow.type = "checkbox";
  checkboxDidRow.classList.add("check-did");

  check_select.appendChild(checkboxRow);
  id_task.textContent = id;
  name_task.textContent = name;
  to_notes.textContent = notes;
  create_date_task.textContent = createDate;
  update_date_task.textContent = "--/--/--";
  check_did_task.appendChild(checkboxDidRow);
  buttons_rud.innerHTML = `
    <button class="btn-show btn"><i class="far fa-eye"></i></button>
    <button class="btn-edit btn"><i class="fas fa-pen-square"></i></button>
    <button class="btn-delete btn"><i class="far fa-trash-alt"></i></button>
  `;

  row.appendChild(check_select);
  row.appendChild(id_task);
  row.appendChild(name_task);
  row.appendChild(to_notes);
  row.appendChild(create_date_task);
  row.appendChild(update_date_task);
  row.appendChild(check_did_task);
  row.appendChild(buttons_rud);

  return row;
}

function addTask() {
  let notes = document.querySelector("#description_add").value;
  let taskInput = document.getElementById("taskInput");

  if (taskInput.value !== "") {
    let taskList = document.querySelector(".taskList");

    let id = id_contador.next().value;
    let name = taskInput.value;
    let createDate = new Date().toLocaleDateString();

    let row = createTaskRow(id, name, notes, createDate);

    taskList.appendChild(row);

    notes = "";
    taskInput.value = "";

    updateIds();
    saveTasksToLocalStorage();

    addEventsToBtn(row);
    addEventsToCheckboxes();
  }
}
