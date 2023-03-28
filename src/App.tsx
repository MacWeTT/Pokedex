import "./index.css";
import { Routes, Route } from "react-router-dom";
import PokeTypes from "./Pages/PokeTypes";
import Home from "./Pages/Home";
import PokemonData from "./Pages/PokemonData";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<PokemonData />} />
        <Route path="/types" element={<PokeTypes />} />
      </Routes>
    </div>
  );
}

export default App;
