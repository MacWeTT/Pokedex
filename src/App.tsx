import "./index.css";
import { Routes, Route } from "react-router-dom";
import PokeTypes from "./Pages/PokeTypes";
import Home from "./Pages/Home";
import PokemonData from "./Pages/PokemonData";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {},
});

function App() {
  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon" element={<PokemonData />} />
          <Route path="/types" element={<PokeTypes />} />
        </Routes>
      </ChakraProvider>
    </div>
  );
}

export default App;
