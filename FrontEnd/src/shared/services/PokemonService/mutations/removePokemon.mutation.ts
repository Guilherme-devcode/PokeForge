import { gql } from "@apollo/client";

const REMOVE_POKEMON = gql`
  mutation RemovePokemon($id: Int!) {
    delete_pokemon_team_by_pk(id: $id) {
      id
    }
  }
`;

export default REMOVE_POKEMON;