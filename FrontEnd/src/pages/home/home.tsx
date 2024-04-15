import logo from "../../assets/logo.png";
import PokemonList from "../../shared/components/PokemonList/PokemonList";
import { HomeStyle } from "./style";

function Home() {
  return (
    <HomeStyle.Container>
      <div className="title">
        <img src={logo} alt="logo" />
      </div>
      <PokemonList />
    </HomeStyle.Container>
  );
}

export default Home;
