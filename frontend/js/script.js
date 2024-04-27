import { UserManager } from "./UserManager.js";

const userManager = new UserManager();

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  // Adiciona o evento de submissão ao formulário de login
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
});

function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (userManager.validateLogin(username, password)) {
    userManager.login(username); // Efetua login e cria o cookie
    redirectToHome(); // Redireciona para a página principal
  } else {
    showMessage("Falha no login: nome de usuário ou senha incorretos.", false);
  }
}

function showMessage(message, isSuccess) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.textContent = message;
  messageContainer.style.color = isSuccess ? "green" : "red"; // Cores para sucesso e erro
}

function redirectToHome() {
  window.location.href = "/master/main.html"; // Redireciona para a página principal
}
