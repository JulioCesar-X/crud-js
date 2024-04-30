export class Pokemon {
  static #nextId = 0;

  constructor(id, name, image, description) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
  }

  static create(name, image, description) {
    const id = ++Pokemon.#nextId;
    return new Pokemon(id, name, image, description);
  }

  static async getPokemonFromApi(pokemonId) {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        const id = data.id;
        const name = data.name;
        const imageUrl = data.sprites.front_default;
        const description = await Pokemon.getPokemonDescriptionFromApi(name); // Adicione esta linha para obter a descrição
        return new Pokemon(id, name, imageUrl, description);
      } else {
        throw new Error("Erro ao obter dados do Pokémon");
      }
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  }

  static async getPokemonDescriptionFromApi(pokemonName) {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        // A descrição pode estar disponível em diferentes idiomas, escolha o idioma desejado
        const description = data.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        ).flavor_text;
        return description;
      } else {
        throw new Error("Erro ao obter a descrição do Pokémon");
      }
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  }
}
