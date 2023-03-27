import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokeTypes from "./Pages/PokeTypes";
import Home from "./Pages/Home";
import "./index.css";
import Pokemon from "./Pages/Pokemon";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon" element={<Pokemon />} />
          <Route path="/types" element={<PokeTypes />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
