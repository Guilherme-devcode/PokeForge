import { gql } from "@apollo/client";

const INSERT_POKEMON = gql`
  mutation InsertPokemon($id: Int!, $name: String!, $url: String!) {
    insert_pokemon_team(objects: { id: $id, name: $name, url: $url }) {
      returning {
        id
        name
        url
      }
    }
  }
`;

export default INSERT_POKEMON;
