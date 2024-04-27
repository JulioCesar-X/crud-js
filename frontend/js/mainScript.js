import { UserManager } from "./UserManager.js";
import { loadPageContent } from "./pageLoader.js";

document.addEventListener("DOMContentLoaded", () => {
  const userManager = new UserManager();
  if (
    !userManager.isUserLoggedIn() &&
    window.location.pathname !== "/src/index.html"
  ) {
    window.location.href = "/src/index.html";
    return; // Encerrar a execução adicional para evitar qualquer outra ação
  }
  loadPageContent("exemplo1"); //<-- entrada

  //nome do usuario na entrada,
  const greeting = document.getElementById("NomeEntrada");
  greeting.innerHTML = "Welcome, "+userManager.getUsernameFromCookie()+"!";


  const logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", () => {
    userManager.logout();
    window.location.href = "/src/index.html"; // Redirecione para a página de index após o logout
  });

  //Para cada botão deve ter esse evento de carregar o conteudo!
  const exemplo1Link = document.getElementById("exemplo1Link");
  exemplo1Link.addEventListener("click", () => {
    loadPageContent("exemplo1");
  });
  const exemplo2Link = document.getElementById("exemplo2Link");
  exemplo2Link.addEventListener("click", () => {
    loadPageContent("exemplo2");
  });
  const exemplo3Link = document.getElementById("exemplo3Link");
  exemplo3Link.addEventListener("click", () => {
    loadPageContent("exemplo3");
  });
  const exemplo4Link = document.getElementById("exemplo4Link");
  exemplo4Link.addEventListener("click", () => {
    loadPageContent("exemplo4");
  });
  /* caso precise de mais navegação ...*/
});



