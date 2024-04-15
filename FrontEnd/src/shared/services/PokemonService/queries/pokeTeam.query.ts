import { gql } from "@apollo/client";

const GET_POKE_TEAM = gql`
  query PokeTeam {
    pokemon_team {
      id
      name
      url
    }
  }
`;

export default GET_POKE_TEAM;
