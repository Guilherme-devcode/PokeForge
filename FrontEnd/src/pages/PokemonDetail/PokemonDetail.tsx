import "./style.css";

import Pokemon from "../../shared/components/Pokemon/Pokemon";

function PokemonDetail() {
  return (
    <div className="header-container">
      <div id="container-fluid h-100">
        <Pokemon />
      </div>
    </div>
  );
}

export default PokemonDetail;
