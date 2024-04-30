import { UserManager } from "./UserManager.js";
import { loadPageContent } from "./pageLoader.js";
import { PokemonGallery } from "./pokemonGallery.js";

document.addEventListener("DOMContentLoaded", async () => {
  const userManager = new UserManager();

  // Verifica se o usuário está logado e redireciona para a página de login se não estiver
  if (
    !userManager.isUserLoggedIn() &&
    window.location.pathname !== "/src/index.html"
  ) {
    window.location.href = "/src/index.html";
    return; // Encerra a execução adicional para evitar qualquer outra ação
  }

  // Carrega o conteúdo da página 'exemplo1' por padrão
  await loadPageContent("exemplo1");

  // Exibe uma mensagem de boas-vindas com o nome do usuário logado
  const greeting = document.getElementById("NomeEntrada");
  greeting.innerHTML = "Welcome, " + userManager.getUsernameFromCookie() + "!";

  // Adiciona um evento de clique para o botão de logout
  const logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", () => {
    userManager.logout();
    window.location.href = "/src/index.html"; // Redireciona para a página de login após o logout
  });

  // Adiciona eventos de clique para cada link de página
  const exemplo1Link = document.getElementById("exemplo1Link");
  exemplo1Link.addEventListener("click", async () => {
    await loadPageContent("exemplo1");
    renderPokemonGallery();
  });

  const exemplo2Link = document.getElementById("exemplo2Link");
  exemplo2Link.addEventListener("click", async () => {
    await loadPageContent("exemplo2");
    renderPokemonGallery();
  });

  const exemplo3Link = document.getElementById("exemplo3Link");
  exemplo3Link.addEventListener("click", async () => {
    await loadPageContent("exemplo3");
    renderPokemonGallery();
  });

  const exemplo4Link = document.getElementById("exemplo4Link");
  exemplo4Link.addEventListener("click", async () => {
    await loadPageContent("exemplo4");
    renderPokemonGallery();
  });

  // Função para renderizar a galeria de Pokémon após o carregamento da página
  const renderPokemonGallery = () => {
    const gallery = new PokemonGallery();

    // Verifica se o elemento 'pokemon-gallery' existe no DOM
    const pokemonGalleryElement = document.getElementById("pokemon-gallery");
    if (!pokemonGalleryElement) {
      console.error("Elemento 'pokemon-gallery' não encontrado.");
      return;
    }

    // Verifica se o elemento 'pagination' existe no DOM
    const paginationElement = document.getElementById("pagination");
    if (!paginationElement) {
      console.error("Elemento 'pagination' não encontrado.");
      return;
    }

    // Adiciona Pokémon à galeria (exemplo estático, você pode modificar isso conforme necessário)
    gallery.addPokemonByName("pikachu");
    gallery.addPokemonByName("charmander");
    gallery.addPokemonByName("squirtle");
    gallery.addPokemonByName("bulbasaur");

    // Renderiza os cards e a paginação
    gallery.renderPokemonCards(1, 3);
    const totalPages = Math.ceil(gallery.listPokemons().length / 3);
    gallery.renderPagination(totalPages);
    
  }
});