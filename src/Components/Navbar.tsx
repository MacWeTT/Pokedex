import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between">
      <h2 className="text-black text-3xl">
        <Link
          to="/"
          className="hover:text-gray-800 transition-all duration-300"
        >
          Pokedex
        </Link>
      </h2>
      <span className="nav-links hidden md:flex">
        <div className="mx-4 p-1.5">
          <Link to="/types" className="nav-link">
            Types
          </Link>
        </div>
        <div className="mx-4 p-1.5">
          <Link to="/locations" className="nav-link">
            Locations
          </Link>
        </div>
        <div className="mx-4 p-1.5">
          <Link to="/items" className="nav-link">
            Items
          </Link>
        </div>
        <div className="mx-4 p-1.5">
          <Link to="/pokedex" className="nav-link">
            Pokedex
          </Link>
        </div>
      </span>
    </nav>
  );
};

export default Navbar;
