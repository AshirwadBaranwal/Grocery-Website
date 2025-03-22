"use client";
import React from "react";
import { useGrocery } from "@/context/GroceryContext";
import ProductItem from "@/components/ProductItem.jsx";
import SearchBar from "@/components/SearchBar.jsx";
import Navbar from "@/components/Navbar.jsx";
const page = () => {
  const { groceryProducts } = useGrocery();
  return (
    <>
      <Navbar />
      <div className="mt-16  md:mt-20 md:m-10 m-5">
        <SearchBar className="top-3" />
        <h2 className="my-3 text-2xl font-concertOne text-primary  md:font-bold">
          All Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5 ">
          {groceryProducts?.map((items, index) => {
            return <ProductItem key={index} productItem={items} />;
          })}
        </div>
      </div>
    </>
  );
};

export default page;
