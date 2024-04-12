/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Pagination } from "semantic-ui-react";
import api from "../../services/api";

import PokemonCard from "../pokemonCard/PokemonCard";
import Search from "../Search/Search";
import { PokeballLoader } from "../spinner/Spinner";
import { App, PaginationContainer } from "./style";

const PokemonList = () => {
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

  const onPaginationClick = (_e: any, pageInfo: any) => {
    setCurrentPage(pageInfo.activePage * pokemonPerPage - pokemonPerPage);
  };

  const totalPage = Math.ceil(totalPokemon / pokemonPerPage);

  const renderPokemonsList = () => {
    const pokemonsList: JSX.Element[] = [];

    pokemons.forEach((pokemon: any) => {
      if (!pokemon.name.includes(query)) {
        return;
      }      
      pokemonsList.push(<PokemonCard key={pokemon.name} pokemon={pokemon} />);
    });

    return pokemonsList;
  };

  return isLoading ? (
    <PokeballLoader />
  ) : (
    <>
      <Search getQuery={(q: any) => setQuery(q)} />

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
