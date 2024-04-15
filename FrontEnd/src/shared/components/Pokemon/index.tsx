/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api, { getPokemonImageUrl } from "../../services/PokeApi/api";

import { PokeballLoader } from "../spinner";
import { Badge } from "./style";
import "./style.css";

const Pokemon = () => {
  const [pokemon, setPokemom] = useState<any>();
  const [setPokemonSpecies] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [imagePokemon, setImagePokemon] = useState("");

  const params = useParams();

  useEffect(() => {
    const loadPokemonData = async () => {
      await api.get(`pokemon/${params.pokemonIndex}`).then((response) => {
        const { name, types, id, weight, height, sprites, stats, abilities } =
          response.data;
        setPokemom({
          name: name.replace(/-/g, " "),
          types: types.map(
            (typeInfo: any) =>
              typeInfo.type.name[0].toUpperCase() + typeInfo.type.name.slice(1)
          ),
          abilities: abilities,
          id: id,
          weight: weight / 10,
          height: height / 10,
          spriteImageUrl: sprites.front_default,
          shinySpriteImageUrl: sprites.front_shiny,
          baseStats: [
            stats[0].base_stat,
            stats[1].base_stat,
            stats[2].base_stat,
            stats[3].base_stat,
            stats[4].base_stat,
            stats[5].base_stat,
          ],

          evs: stats
            .filter((stat: any) => {
              if (stat.effort > 0) {
                return true;
              }
              return false;
            })
            .map((stat: any) => {
              return `${stat.effort} ${stat.stat.name
                .toLowerCase()
                .split("-")
                .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ")}`;
            })
            .join(", "),
        });
      });
      setImagePokemon(getPokemonImageUrl(Number(params?.pokemonIndex)));

      setIsLoading(false);
    };

    loadPokemonData();
  }, [params.pokemonIndex, setPokemonSpecies]);

  const baseStatsName = [
    "HP",
    "Attack",
    "Defense",
    "Sp. Attack",
    "Sp. Defense",
    "Speed",
  ];

  return isLoading ? (
    <div
      style={{ height: "100vh" }}
      className="w-100 d-flex justify-content-center align-items-center"
    >
      <PokeballLoader />
    </div>
  ) : (
    <div className="col-12 fadeIn">
      <h1 className="text-center text-uppercase Section-Heading">
        {pokemon.name}
      </h1>

      <div
        className="row justify-content-center"
        style={{ position: "relative", paddingBottom: "1rem" }}
      >
        <div className="col-lg-3 col-md-2 bioDiv d-flex flex-wrap justify-content-center">
          <div className="inner">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td className="text-right font-weight-bold">ID</td>
                  <td># {pokemon?.id}</td>
                </tr>
                <tr>
                  <td className="text-right font-weight-bold">Height</td>
                  <td style={{ whiteSpace: "nowrap" }}>{pokemon.height} Mt</td>
                </tr>
                <tr>
                  <td className="text-right font-weight-bold">Weight</td>
                  <td style={{ whiteSpace: "nowrap" }}>{pokemon.weight} Kg</td>
                </tr>
                <tr>
                  <td className="text-right font-weight-bold">Abilities</td>
                  <td>
                    <span className="abilities">
                      {pokemon.abilities.map((ability: any, index: any) => (
                        <Badge
                          key={index}
                          className={`ability ${pokemon.types[0]} text-uppercase`}
                          role="button"
                          style={{
                            whiteSpace: "nowrap",
                            display: "inline-block",
                            boxShadow: "none",
                          }}
                        >
                          {ability.ability.name}
                        </Badge>
                      ))}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td
                    className="text-right font-weight-bold"
                    style={{ verticalAlign: "middle" }}
                  >
                    Type
                  </td>
                  <td>
                    <div className="row" style={{ flexWrap: "nowrap" }}>
                      {pokemon.types.map((type: any, index: any) => (
                        <Badge
                          key={index}
                          className={`icon ${type} text-capitalize`}
                        >
                          <span className="text-white font-weight-bold">
                            {type}
                          </span>
                        </Badge>
                      ))}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-lg-5 d-flex flex-wrap align-items-center">
          <div className="image-container">
            <img
              alt=""
              className="Image img-fluid mx-auto my-auto d-block fadeInOut"
              src={imagePokemon}
              style={{
                zIndex: "100 !important",
                maxWidth: "85%",
                height: "auto",
                paddingTop: "10px",
              }}
            />
          </div>
        </div>

        <div className="col-lg-3 col-md-2 statDiv my-auto mx-auto d-flex flex-wrap justify-content-center">
          <div className="inner">
            <table className="table table-borderless">
              <tbody>
                {pokemon.baseStats.map((stat: any, index: any) => (
                  <tr key={index}>
                    <td
                      className="text-right font-weight-bold"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {baseStatsName[index]}
                    </td>
                    <td colSpan={3} style={{ width: "100%" }}>
                      <div className="progress">
                        <Badge
                          className={`progress-bar progress-bar-striped progress-bar-animated rounded-sm ${pokemon.types[0]}`}
                          role="progressbar"
                          style={{
                            width: `${stat}%`,
                          }}
                        >
                          <span>{stat}</span>
                        </Badge>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
