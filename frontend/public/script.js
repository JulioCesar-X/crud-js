function* contador_plus() {
    let count = 0;
    while (true) {
        yield ++count;
    }
}
function updateIds() {
    const rows = document.querySelectorAll(".taskList tr");
    rows.forEach((row, index) => {
    const idCell = row.querySelector("td:first-child");
    if (idCell) {
        idCell.textContent = index + 1;
    }
    });
}

function saveTasksToLocalStorage() {
    const tasks = [];
    const rows = document.querySelectorAll(".taskList tr");
    rows.forEach((row) => {
    const task = {
        id: row.querySelector("td:first-child").textContent,
        name: row.querySelector("td:nth-child(2)").textContent,
        createDate: row.querySelector("td:nth-child(3)").textContent,
        updateDate: row.querySelector("td:nth-child(4)").textContent,
        isChecked: row.querySelector("td:nth-child(6) input").checked,
    };
    tasks.push(task);
    });
  //transformar o objeto task em uma string json e colocar no meu local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  // Recuperar os dados do localStorage
    const tasksString = localStorage.getItem("tasks");

  // Verificar se há dados salvos
    if (tasksString) {
    // Converter os dados de string JSON para um array de objetos JavaScript
    const tasks = JSON.parse(tasksString);

    // Iterar sobre cada tarefa
        tasks.forEach((task) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${task.id}</td>
            <td>${task.name}</td>
            <td>${task.createDate}</td>
            <td>${task.updateDate}</td>
            <td>${task.isChecked ? "Checked" : "Unchecked"}</td>
        `;

        document.querySelector(".taskList").appendChild(row);
    });
    }
}

// Chamar a função para carregar tarefas do localStorage quando o documento estiver completamente carregado
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);
let btn_create = document.getElementById("create-task");
btn_create.addEventListener("click", () => {
    addTask();
});

const id_contador = contador_plus();
// Função para adicionar uma tarefa à lista
function addTask() {
    let taskInput = document.getElementById("taskInput");

    if (taskInput.value !== "") {
        let taskList = document.querySelector(".taskList");
        let row = document.createElement("tr");

        // ID
        let id = document.createElement("td");
        id.textContent = id_contador.next().value;
        row.appendChild(id);

        // Nome
        let name = document.createElement("td");
        name.textContent = taskInput.value;
        row.appendChild(name);

        // Data de Criação
        let create_date = document.createElement("td");
        create_date.textContent = new Date().toLocaleDateString();
        row.appendChild(create_date);

        // Data de Atualização nula
        let update_date = document.createElement("td");
        update_date.textContent = "--/--/--";
        row.appendChild(update_date);

        // Ações
        let actions = document.createElement("td");

        //show
        let btn_show = document.createElement("button");
        btn_show.innerHTML = "Show";
        actions.appendChild(btn_show);

        //edit
        let btn_edit = document.createElement("button");
        btn_edit.innerHTML = "Edit";
        actions.appendChild(btn_edit);

        //delete
        let btn_delete = document.createElement("button");
        btn_delete.innerHTML = "Delete";
        actions.appendChild(btn_delete);
        btn_delete.addEventListener("click", () => {
            const row_selected = btn_delete.closest("tr");
            row_selected.remove();
            updateIds();
            saveTasksToLocalStorage();
        });

    row.appendChild(actions);
    //checkbox
    let checkbox = document.createElement("td");
    let checkbox_did = document.createElement("input");
    checkbox_did.type = "checkbox";
    checkbox.appendChild(checkbox_did);
    row.appendChild(checkbox);
    taskList.appendChild(row);

    taskInput.value = "";
    //roubadinha para atualizar depois da adição também
    updateIds();
    saveTasksToLocalStorage();
    }
}




