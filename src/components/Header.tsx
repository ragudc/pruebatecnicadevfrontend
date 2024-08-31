import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { FiSearch } from "react-icons/fi";
import logo from "../assets/logo.png";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [input, setInput] = useState("");

  // Crear una versión "debounced" de la función de búsqueda para la búsqueda en tiempo real
  const debouncedSearch = useCallback(
    debounce((query) => {
      onSearch(query);
    }, 300),
    [onSearch]
  ); // 300 ms de espera

  useEffect(() => {
    // Llamar a la búsqueda debounced cada vez que 'input' cambia
    if (input.trim() !== "") {
      debouncedSearch(input);
    }
    return () => debouncedSearch.cancel();
  }, [input, debouncedSearch]);

  // Función para manejar el clic en el botón de búsqueda
  const handleSearch = () => {
    onSearch(input);
  };

  return (
    <header className="flex justify-between p-4 bg-gray-800 text-white relative">
      <div>
        <img src={logo} alt="Logo" className="h-12 w-full" />
      </div>
      <div className="flex items-center relative ml-4">
        <FiSearch
          className="absolute left-2 z-10 mt-0 text-gray-500"
          size={20}
          onClick={() => onSearch(input)}
        />
        <input
          type="text"
          placeholder="You're looking for something?"
          className="pl-10 text-black pr-2 py-1 rounded-full w-72"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          style={{ paddingLeft: "2.5rem" }}
        />
      </div>
    </header>
  );
};

export default Header;
