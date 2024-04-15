import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import "./App.css";
import Home from "./pages/home";
import PokemonDetail from "./pages/PokemonDetail";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:pokemonIndex" element={<PokemonDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
