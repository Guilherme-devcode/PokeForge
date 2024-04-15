import { useEffect, useState } from "react";
import { Pagination, PaginationItemProps } from "semantic-ui-react";
import api from "../../services/PokeApi/api";

import { IPokemon } from "../../interfaces/pokemon";
import PokemonCard from "../PokemonCard/index";
import Search from "../Search/index";
import { PokeballLoader } from "../spinner/index";
import { App, PaginationContainer } from "./style";

const PokemonList = ({ updatePokemonTeam }: { updatePokemonTeam: () => void }) => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPokemon] = useState(807);
  const [pokemonPerPage] = useState(54);
  const [currentPage, setCurrentPage] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      await api
        .get(`/pokemon?limit=${pokemonPerPage}&offset=${currentPage}`)
        .then((response) => {
          setPokemons(response.data.results);
        });
      setIsLoading(false);
    };
    fetchPokemons();
  }, [currentPage, pokemonPerPage]);

  const onPaginationClick = (_e: unknown, pageInfo: PaginationItemProps) => {
    setCurrentPage(pageInfo.activePage * pokemonPerPage - pokemonPerPage);
  };

  const totalPage = Math.ceil(totalPokemon / pokemonPerPage);

  const renderPokemonsList = () => {
    const filteredPokemons = pokemons.filter((pokemon: IPokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );

    return filteredPokemons.map((pokemon: IPokemon) => (
      <PokemonCard
        hasAddButton={true}
        key={pokemon.name}
        updatePokemonTeam={updatePokemonTeam}
        pokemon={pokemon}
        hasRemoveButton={false}
      />
    ));
  };

  return isLoading ? (
    <PokeballLoader />
  ) : (
    <>
      <Search getQuery={(q: string) => setQuery(q)} />
      <PaginationContainer>
        <Pagination
          defaultActivePage={1}
          totalPages={totalPage}
          onPageChange={onPaginationClick}
        />
      </PaginationContainer>

      <App>{renderPokemonsList()}</App>
    </>
  );
};

export default PokemonList;
