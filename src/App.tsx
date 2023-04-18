import "./index.css";
import { Routes, Route } from "react-router-dom";
import PokeTypes from "./Pages/PokeTypes";
import Home from "./Pages/Home";
import PokemonData from "./Pages/PokemonData";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import Pokedex from "./Pages/Pokedex";
import PokeLocations from "./Pages/PokeLocations";
import PokeItems from "./Pages/PokeItems";

const theme = extendTheme({});

function App() {
  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon" element={<PokemonData />} />
          <Route path="/types" element={<PokeTypes />} />
          <Route path="/locations" element={<PokeLocations />} />
          <Route path="/items" element={<PokeItems />} />
          <Route path="/pokedex" element={<Pokedex />} />
        </Routes>
      </ChakraProvider>
    </div>
  );
}

export default App;
