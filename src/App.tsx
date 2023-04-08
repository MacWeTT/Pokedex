import "./index.css";
import { Routes, Route } from "react-router-dom";
import PokeTypes from "./Pages/PokeTypes";
import Home from "./Pages/Home";
import PokemonData from "./Pages/PokemonData";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon" element={<PokemonData />} />
          <Route path="/types" element={<PokeTypes />} />
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
