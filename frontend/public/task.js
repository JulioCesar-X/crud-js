export class Task {
  constructor(id, name, notes, createDate) {
    this.id = id;
    this.name = name;
    this.notes = notes;
    this.createDate = createDate;
    this.updateDate = null; // A data de atualização será definida quando a tarefa for editada
    this.isChecked = false; // Define se a tarefa está marcada como concluída
  }

  // Método para renderizar uma linha de tarefa na tabela HTML
  renderRow() {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input class="check-row" type="checkbox"></td>
      <td>${this.id}</td>
      <td class="name-task">${this.name}</td>
      <td>${this.notes}</td>
      <td>${this.createDate}</td>
      <td>${this.updateDate ? this.updateDate : "--/--/--"}</td>
      <td><input class="check-did" type="checkbox" ${
        this.isChecked ? "checked" : ""
      }></td>
      <td>
          <button class="btn-show btn"><i class="far fa-eye"></i></button>
          <button class="btn-edit btn"><i class="fas fa-pen-square"></i></button>
          <button class="btn-delete btn"><i class="far fa-trash-alt"></i></button>
      </td>
    `;
    return row;
  }
}
