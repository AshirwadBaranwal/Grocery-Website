"use client";
import React, { useEffect, useState } from "react";
import ProductItem from "@/components/ProductItem.jsx";
import { useGrocery } from "@/context/GroceryContext";

const PopularProducts = () => {
  const { groceryProducts } = useGrocery();

  return (
    <div>
      <h2 className="my-3 text-2xl font-concertOne text-primary  md:font-bold">
        Popular Products
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 ">
        {groceryProducts?.map((items, index) => {
          return <ProductItem key={index} productItem={items} />;
        })}
      </div>
    </div>
  );
};

export default PopularProducts;
