import { useState } from "react";
import logo from "../../assets/logo.png";

import MenuTeam from "../../shared/components/MenuTeam";
import PokemonList from "../../shared/components/PokemonList";
import { HomeStyle } from "./style";

function Home() {
  const [teamUpdate, setTeamUpdate] = useState(0);

  const updatePokemonTeam = () => {
    setTeamUpdate((prev) => prev + 1);
  };
  return (
    <HomeStyle.Container>
      <div className="title">
        <img src={logo} alt="logo" />
      </div>
      <PokemonList updatePokemonTeam={updatePokemonTeam} />
      <MenuTeam teamUpdate={teamUpdate} />
    </HomeStyle.Container>
  );
}

export default Home;
