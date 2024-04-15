import { requestService } from "../../../core/services/requestService";
import { IPokemon } from "../../interfaces/pokemon";
import INSERT_POKEMON from "./mutations/insertPokemon.mutation";
import REMOVE_POKEMON from "./mutations/removePokemon.mutation";
import GET_POKE_TEAM from "./queries/pokeTeam.query";

class PokemonService {
  async insertPokemon(id: number, name: string, url: string): Promise<void> {
    await requestService.mutate(INSERT_POKEMON, {
      id,
      name,
      url,
    });
  }
  async removePokemon(id: number): Promise<void> {
    await requestService.mutate(REMOVE_POKEMON, {
      id,
    });
  }
  async getPokeTeam(): Promise<IPokemon[] | null> {
    try {
      const result = await requestService.getAll(GET_POKE_TEAM);
      return result.data.pokemon_team;
    } catch (error) {
      return null;
    }
  }
}

export default PokemonService;
