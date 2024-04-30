import { Pokemon } from "./pokemon.js";

export class PokemonGallery {
  constructor() {
    this.pokemons = [];
    this.renderPokemonCardsHandler = this.renderPokemonCards.bind(this);
  }

  async addPokemonByName(name) {
    try {
      const pokemon = await Pokemon.getPokemonFromApi(name);
      this.pokemons.push(pokemon);
    } catch (error) {
      console.error("Erro ao adicionar Pokémon:", error);
    }
  }

  async updatePokemon(id, name, image, description) {
    try {
      const pokemon = this.pokemons.find((pokemon) => pokemon.id === id);
      if (pokemon) {
        // Atualiza o nome e a descrição do Pokémon, mas a imagem permanece a mesma
        pokemon.name = name;
        pokemon.description = description;
      } else {
        throw new Error("Pokémon não encontrado na galeria");
      }
    } catch (error) {
      console.error("Erro ao atualizar Pokémon:", error);
    }
  }

  listPokemons() {
    return this.pokemons;
  }

  deletePokemon(id) {
    this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
  }

  renderPokemonCards(pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pokemons = this.listPokemons().slice(startIndex, endIndex);

    const pokemonGallery = document.getElementById("pokemon-gallery");
    if (!pokemonGallery) {
      console.error("Elemento 'pokemon-gallery' não encontrado.");
      return;
    }

    pokemonGallery.innerHTML = "";

    pokemons.forEach((pokemon) => {
      const card = `
        <div class="col">
          <div class="card h-100">
            <img src="${pokemon.image}" class="card-img-top" alt="${pokemon.name}">
            <div class="card-body">
              <h5 class="card-title">${pokemon.name}</h5>
              <p class="card-text">${pokemon.description}</p>
            </div>
          </div>
        </div>
      `;
      pokemonGallery.insertAdjacentHTML("beforeend", card);
    });
  }

  renderPagination(totalPages) {
    const pagination = document.getElementById("pagination");
    if (!pagination) {
      console.error("Elemento 'pagination' não encontrado.");
      return;
    }

    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.classList.add("page-item");
      const a = document.createElement("a");
      a.classList.add("page-link");
      a.href = "#";
      a.textContent = i;
      a.addEventListener("click", () => {
        this.renderPokemonCardsHandler(i, 3);
      });
      li.appendChild(a);
      pagination.appendChild(li);
    }
  }
}
