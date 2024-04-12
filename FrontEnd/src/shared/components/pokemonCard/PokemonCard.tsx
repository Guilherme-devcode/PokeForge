/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useRef, useState } from "react";

import VanillaTilt from "vanilla-tilt";
import { getPokemonGifUrl } from "../../services/api";
import { PokeballLoader } from "../spinner/Spinner";
import {
  Card,
  CardDetails,
  CardId,
  CardImg,
  CardName,
  StyledLink,
} from "./style";

export interface Pokemon {
  url: string;
  name: string;
}
const PokemonCard = (pokemon: any) => {
  const [imagePokemon, setImagePokemon] = useState("");
  const [pokemonId, setPokemonId] = useState(0);
  const [pokemonTypes, setPokemonTypes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const tilt = useRef<any>(null);

  useEffect(() => {
    const loadIdPokemon = async () => {
      await axios.get(pokemon.pokemon.url).then((response) => {
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
  }, [pokemon.pokemon.url, pokemonId]);

  const nameCapitalized = pokemon?.pokemon?.name?.split("-")[0];

  const pokemonType = pokemonTypes.map(
    (type) => type.type.name[0].toUpperCase() + type.type.name.slice(1)
  );

  if (isLoading) {
    return <PokeballLoader />;
  } else if (pokemonId > 807) {
    return <div></div>;
  } else {
    return (
      <StyledLink to={`pokemon/${pokemonId}`}>
        <Card ref={tilt} className={pokemonType[0]}>
          <CardId className={pokemonType[0]}># {pokemonId}</CardId>
          {imageLoading ? <PokeballLoader /> : null}
          <CardImg
            onLoad={() => {
              setImageLoading(false);
            }}
            src={imagePokemon}
            alt={nameCapitalized}
            style={imageLoading ? {} : { display: "block" }}
          />
          <CardName>{nameCapitalized}</CardName>
          <CardDetails>{pokemonType.join(" / ")}</CardDetails>
        </Card>
      </StyledLink>
    );
  }
};

export default PokemonCard;
