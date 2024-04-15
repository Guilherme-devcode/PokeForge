/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useRef, useState } from "react";

import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import { IoRemoveCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import VanillaTilt from "vanilla-tilt";
import { IPokemon } from "../../interfaces/pokemon";
import { MessageServices } from "../../services/alerts/alerts.service";
import { getPokemonGifUrl } from "../../services/PokeApi/api";
import PokemonService from "../../services/PokemonService/pokemon.service";
import { PokeballLoader } from "../spinner";
import { Card, CardDetails, CardId, CardImg, CardName } from "./style";

const PokemonCard = ({
  pokemon,
  hasAddButton,
  hasRemoveButton,
  updatePokemonTeam,
}: {
  pokemon: IPokemon;
  hasAddButton: boolean;
  hasRemoveButton: boolean;
  updatePokemonTeam?: () => void;
}) => {
  const [imagePokemon, setImagePokemon] = useState("");
  const [pokemonId, setPokemonId] = useState(0);
  const [pokemonTypes, setPokemonTypes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const tilt = useRef<any>(null);
  const navigate = useNavigate();
  const messageService = new MessageServices();

  useEffect(() => {
    const loadIdPokemon = async () => {
      await axios.get(pokemon.url).then((response) => {
        setPokemonId(response.data.id);
        setPokemonTypes(response.data.types);
      });
      if (tilt?.current) {
        VanillaTilt.init(tilt.current, { scale: 1.1, speed: 1000, max: 30 });
      }
      setImagePokemon(getPokemonGifUrl(pokemonId));
    };

    loadIdPokemon();

    setIsLoading(false);
  }, [pokemon.url, pokemonId]);

  const nameCapitalized = pokemon?.name?.split("-")[0];

  const pokemonType = pokemonTypes.map(
    (type) => type.type.name[0].toUpperCase() + type.type.name.slice(1)
  );

  const handleAddToPokedex = async () => {
    const pokemonService = new PokemonService();
    const team = await pokemonService.getPokeTeam();
    if (team && team.length < 5) {
      await pokemonService.insertPokemon(
        pokemonId,
        nameCapitalized,
        pokemon.url
      );
      messageService.success("Sucesso!", "Pokémon adicionado na sua equipe!");
    } else {
      messageService.error("Erro", "Você já tem 5 Pokémon na sua equipe!");
    }
    updatePokemonTeam && updatePokemonTeam();
  };

  const handleRemoveToPokedex = async () => {
    const pokemonService = new PokemonService();
    await pokemonService.removePokemon(pokemonId);
    messageService.success("Sucesso!", "Pokémon Removido na sua equipe!");
    updatePokemonTeam && updatePokemonTeam();
  };

  const handleClickRedirect = () => {
    navigate(`/pokemon/${pokemonId}`);
  };

  if (isLoading) {
    return <PokeballLoader />;
  } else {
    return (
      <Card ref={tilt} className={pokemonType[0]}>
        {hasAddButton && (
          <div className="add-to-pokedex" onClick={handleAddToPokedex}>
            <IoMdAddCircle size={50} color="white" />
          </div>
        )}
        {hasRemoveButton && (
          <div className="add-to-pokedex" onClick={handleRemoveToPokedex}>
            <IoRemoveCircle size={50} color="white" />
          </div>
        )}
        <CardId onClick={handleClickRedirect} className={pokemonType[0]}>
          # {pokemonId}
        </CardId>
        {imageLoading ? <PokeballLoader /> : null}
        <CardImg
          onClick={handleClickRedirect}
          onLoad={() => {
            setImageLoading(false);
          }}
          src={imagePokemon}
          alt={nameCapitalized}
          style={imageLoading ? {} : { display: "block" }}
        />
        <CardName onClick={handleClickRedirect}>{nameCapitalized}</CardName>
        <CardDetails onClick={handleClickRedirect}>
          {pokemonType.join(" / ")}
        </CardDetails>
      </Card>
    );
  }
};

export default PokemonCard;
