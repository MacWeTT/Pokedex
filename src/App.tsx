import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import PokemonData from "./Pages/Pokemon";
import { Types } from "./Pages/Types";
import Layout from "./Components/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon" element={<PokemonData />} />
          <Route path="/types" element={<Types />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
