import axios from "axios";

const pad = (number: number, length: number) =>
  String(number).padStart(length, "0");

export const getPokemonGifUrl = (id: number) =>
  `https://raw.githubusercontent.com/wellrccity/pokedex-html-js/master/assets/img/pokemons/poke_${pad(
    id,
    1
  )}.gif`;

export const getPokemonImageUrl = (id: number) =>
  `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${pad(
    id,
    3
  )}.png`;

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export default api;
