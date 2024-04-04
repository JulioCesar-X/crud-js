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
      createDate: row.querySelector("td:nth-child(4)").textContent,
      updateDate: row.querySelector("td:nth-child(5)").textContent,
      btns: `<td>
                <button class="btn-show">Show</button>
                <button class="btn-edit">Edit</button>
                <button class="btn-delete">Delete</button>
            </td>`,
      isChecked: checkbox ? checkbox.checked : false,
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
            <td>${task.createDate}</td>
            <td>${task.updateDate}</td>
            <td>
                <button class="btn-show btn">Show</button>
                <button class="btn-edit btn">Edit</button>
                <button class="btn-delete btn">Delete</button>
            </td>
            <td><input class="check-did" type="checkbox" ${
              task.isChecked ? "Checked" : ""
            }></td>
        `;
      document.querySelector(".taskList").appendChild(row);

      addEventsToBtn(row);
      addEventsToCheckboxes();
    });
  }
}

//Função que add os eventos aos btns do R-U-D usando o metodo closest para encontrar a row pai deles
function addEventsToBtn(row) {
  const btnShow = row.querySelector(".btn-show");
  const btnEdit = row.querySelector(".btn-edit");
  const btnDelete = row.querySelector(".btn-delete");

  btnShow.addEventListener("click", () => {
    //
  });

  btnEdit.addEventListener("click", () => {
    //
  });

  btnDelete.addEventListener("click", () => {
    const row_selected = btnDelete.closest("tr");
    row_selected.remove();
    updateIds();
    saveTasksToLocalStorage();
  });
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


// Função para adicionar uma tarefa à lista porem com muito aclopamento preciso refatorar 
function createTaskRow(id, name, createDate) {
  let row = document.createElement("tr");
  let check_select = document.createElement("td");
  let id_task = document.createElement("td");
  let name_task = document.createElement("td");
  let create_date_task = document.createElement("td");
  let update_date_task = document.createElement("td");
  let buttons_rud = document.createElement("td");
  let check_did_task = document.createElement("td");


  let checkboxRow = document.createElement("input");
  checkboxRow.type = "checkbox";
  checkboxRow.classList.add("check-row");
  let checkboxDidRow = document.createElement("input");
  checkboxDidRow.type = "checkbox";
  checkboxDidRow.classList.add("check-did");

  check_select.appendChild(checkboxRow);
  id_task.textContent = id;
  name_task.textContent = name;
  create_date_task.textContent = createDate;
  update_date_task.textContent = "--/--/--";
  buttons_rud.innerHTML = `
    <button class="btn-show btn">Show</button>
    <button class="btn-edit btn">Edit</button>
    <button class="btn-delete btn">Delete</button>
  `;
  check_did_task.appendChild(checkboxDidRow);

  row.appendChild(check_select);
  row.appendChild(id_task);
  row.appendChild(name_task);
  row.appendChild(create_date_task);
  row.appendChild(update_date_task);
  row.appendChild(buttons_rud);
  row.appendChild(check_did_task);

  return row;
}

function addTask() {
  let taskInput = document.getElementById("taskInput");
  if (taskInput.value !== "") {
    let taskList = document.querySelector(".taskList")

    let id = id_contador.next().value;
    let name = taskInput.value;
    let createDate = new Date().toLocaleDateString();

    let row = createTaskRow(id, name, createDate);

    taskList.appendChild(row);
    taskInput.value = "";

    updateIds();
    saveTasksToLocalStorage();

    addEventsToBtn(row);
    addEventsToCheckboxes();
  }
}