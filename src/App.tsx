import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokeTypes from "./Pages/PokeTypes";
import Home from "./Pages/Home";
import PokemonData from "./Pages/PokemonData";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon" element={<PokemonData />} />
          <Route path="/types" element={<PokeTypes />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
