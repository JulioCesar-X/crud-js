import { getCookie, deleteCookie, createCookie } from "./auth.js";
import { User } from "./User.js";

export class UserManager {
  constructor() {
    this.username = getCookie("username") || "";
  }
  getUsernameFromCookie() {
    const name = "username=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  isUserLoggedIn() {
    // Verifique se o cookie "username" existe e tem um valor
    const isLogged = this.username !== "";
    console.log("Usuário está logado?", isLogged);
    return isLogged;
  }

  login(username) {
    this.username = username;
    createCookie("username", username, 8); // Defina a duração do cookie conforme necessário
    console.log(
      "Login efetuado com sucesso, redirecionando para a página principal..."
    );
    window.location.href = "/master/main.html";
  }

  logout() {
    deleteCookie("username");
    this.username = "";
    // Agora você pode redirecionar para a página de login ou fazer outras ações necessárias
    window.location.href = "/src/index.html";
  }
  validateLogin(username, password) {
    const users = [
      new User("Julio", "123"),
      new User("atec", "123"),
      new User("atec2", "123"),
      new User("Julio2", "123"),
    ];
    users.map((conta) => {
      
      if
      
    })
    return username === validUsername && password === validPassword;
  }

  // ... outras funções necessárias para sua classe UserManager ...
}
