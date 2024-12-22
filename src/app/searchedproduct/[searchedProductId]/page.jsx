"use client";
import React from "react";
import { useGrocery } from "@/context/GroceryContext";
import ProductItem from "@/components/ProductItem.jsx";
import BackBar from "@/components/BackBar.jsx";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams(); // Access dynamic route parameters

  const { groceryProducts } = useGrocery();
  const renderableArray = groceryProducts
    ? groceryProducts.filter(
        (product) => String(product.id) === String(params.searchedProductId)
      ) // Adjust type if needed
    : [];
  return (
    <>
      <BackBar path="/" />
      <div className="p-10">
        <div className="mt-16">
          {renderableArray?.map((items, index) => {
            return <ProductItem key={index} productItem={items} />;
          })}
        </div>
      </div>
    </>
  );
};

export default page;
