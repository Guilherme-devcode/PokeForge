import { useEffect, useState } from "react";
import { IPokemon } from "../../interfaces/pokemon";
import PokemonService from "../../services/PokemonService/pokemon.service";
import PokemonCard from "../PokemonCard";
import { MenuTeamStyle } from "./style";

const pokemonService = new PokemonService();

const MenuTeam = ({ teamUpdate }: { teamUpdate: number }) => {
  const [isActive, setIsActive] = useState(false);
  const [pokemonTeam, setPokemonTeam] = useState<IPokemon[]>([]);

  const toggleMenu = async () => {
    setIsActive(!isActive);
    if (!isActive) {
      await updateTeam();
    } else {
      setPokemonTeam([]);
    }
  };

  const updateTeam = async () => {
    const team = await pokemonService.getPokeTeam();
    if (team) {
      setPokemonTeam(team);
    }
  };

  useEffect(() => {
    updateTeam();
  }, [teamUpdate]);

  return (
    <MenuTeamStyle.Container className={isActive ? "active-up" : "active-down"}>
      <div className="menu-poke-ball" onClick={toggleMenu}></div>
      {isActive && (
        <div className="pokemon-list d-flex align-items-center w-100 justify-content-center">
          {pokemonTeam.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              hasAddButton={false}
              hasRemoveButton={true}
              updatePokemonTeam={updateTeam}
            />
          ))}
        </div>
      )}
    </MenuTeamStyle.Container>
  );
};

export default MenuTeam;
