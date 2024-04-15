import { gql } from "@apollo/client";

const INSERT_POKEMON = gql`
  mutation InsertPokemon($id: Int!, $name: String!) {
    insert_pokemon_team(objects: { id: $id, name: $name }) {
      returning {
        id
        name
      }
    }
  }
`;

export default INSERT_POKEMON;
