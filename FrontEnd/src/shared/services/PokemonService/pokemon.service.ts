import { requestService } from "../../../core/services/requestService";
import INSERT_POKEMON from "./mutations/insertPokemon.mutation";

class PokemonService {
  async insertPokemon(id: number, name: string): Promise<void> {
    await requestService.mutate(INSERT_POKEMON, {
      id,
      name,
    });
  }
}

export default PokemonService;
