"use client";
import { Search } from "lucide-react";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGrocery } from "@/context/GroceryContext";

const SearchBar = ({ className }) => {
  const { groceryProducts } = useGrocery();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const router = useRouter();

  // Debouncing the query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [query]);

  // Updating suggestions based on debounced query
  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = groceryProducts.filter((product) =>
      product.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  }, [debouncedQuery]);

  // Handle search input change
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle suggestion click
  const handleSuggestionClick = (product) => {
    router.push(`/searchedproduct/${product.id}`); // Navigate to product details page
  };

  return (
    <div
      className={` ${className} relative flex items-center gap-2   rounded-sm shadow-md cursor-pointer `}
    >
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for products..."
        className="w-full border border-gray-300 rounded-md p-2"
      />
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 text-sm w-full font-poppins bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-40 ">
          {suggestions.map((product) => (
            <li
              key={product.id}
              onClick={() => handleSuggestionClick(product)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
