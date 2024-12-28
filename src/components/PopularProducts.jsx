"use client";
import React, { useEffect, useState } from "react";
import ProductItem from "@/components/ProductItem.jsx";
import Productloadingmodel from "@/components/Productloadingmodel.jsx";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useGrocery } from "@/context/GroceryContext";

const PopularProducts = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const { groceryProducts } = useGrocery();

  const getPopularProducts = () => {
    const popular = groceryProducts.filter(
      (product) => product.isPopularProduct === true
    );
    setPopularProducts(popular);
  };

  useEffect(() => {
    getPopularProducts();
  }, [groceryProducts]);
  if (popularProducts.length <= 0) {
    return <Productloadingmodel />;
  }

  return (
    <div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 ">
        {popularProducts?.map((items, index) => {
          return index < 7 && <ProductItem key={index} productItem={items} />;
        })}
        <Link
          href="/allproducts"
          className="p-2 cursor-pointer md:p-6 flex flex-col items-center justify-center  border rounded-lg shadow-sm font-popppins"
        >
          <span className="p-5  bg-slate-200 border rounded-full ">
            <ArrowRight />
          </span>
          <p className="text-sm m-2 font-bold font-poppins">
            View All Products
          </p>
        </Link>
      </div>
    </div>
  );
};

export default PopularProducts;
